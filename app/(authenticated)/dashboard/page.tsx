"use client";

import { usePasswords } from "@/hooks/use-passwords";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, KeySquare, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const platformChartConfig = {
  count: {
    label: "Passwords",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const timeChartConfig = {
  count: {
    label: "Added",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { data: passwords, isLoading } = usePasswords();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 mt-20">
        <LoaderCircle className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const pwList = passwords || [];

  // 1. Core Metrics
  const totalPasswords = pwList.length;
  const uniquePlatforms = new Set(pwList.map((p) => p.platform)).size;
  const uniqueEmails = new Set(pwList.map((p) => p.user_email).filter(Boolean)).size;

  // 2. Bar Chart Data (Top Platforms)
  const platformCounts = pwList.reduce((acc, p) => {
    acc[p.platform] = (acc[p.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const platformData = Object.entries(platformCounts)
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 3. Area Chart Data (Growth Over Time)
  const timeCounts = pwList.reduce((acc, p) => {
    const d = new Date(p.created_at);
    // Format: "YYYY-MM-DD" simplified or "MMM DD"
    const dateKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const timeData = Object.entries(timeCounts)
    .map(([date, count]) => ({ date, count }))
    // Reversing naively assuming the query returns desc order so earliest is last
    // Let's explicitly sort by date string (basic sort for demo)
    .reverse();

  // 4. Recent Passwords List
  const recentPasswords = pwList.slice(0, 5);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here's a summary of your secure vault.
        </p>
      </div>

      {/* Main Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
            <KeySquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPasswords}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Credentials stored safely
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Platforms</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniquePlatforms}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Distinct services secured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueEmails}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Addresses used across accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Platforms</CardTitle>
            <CardDescription>Where your passwords are stored</CardDescription>
          </CardHeader>
          <CardContent>
            {platformData.length > 0 ? (
              <ChartContainer config={platformChartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={platformData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="platform"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 10)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vault Activity</CardTitle>
            <CardDescription>When passwords were added</CardDescription>
          </CardHeader>
          <CardContent>
            {timeData.length > 0 ? (
              <ChartContainer config={timeChartConfig} className="min-h-[200px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={timeData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 6)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="count"
                    type="natural"
                    fill="var(--color-count)"
                    fillOpacity={0.4}
                    stroke="var(--color-count)"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Additions</CardTitle>
              <CardDescription>Your 5 most recently saved credentials.</CardDescription>
            </div>
            <Link href="/passwords" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-[#3B5BDB]" })}>
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPasswords.length > 0 ? (
                recentPasswords.map((pw) => (
                  <div key={pw.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{pw.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {pw.user_email || "No email"}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(pw.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-sm text-muted-foreground">
                  Your vault is currently empty.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
