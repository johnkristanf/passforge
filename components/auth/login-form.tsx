"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Shield, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { loginWithEmail } from "@/lib/actions/auth";

export function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate, isPending, error } = useMutation({
        mutationFn: loginWithEmail,
        onSuccess: () => router.push("/dashboard"),
    });

    const onSubmit = (values: LoginFormValues) => mutate(values);

    return (
        <div className="flex flex-col h-full justify-center px-10 py-12">
            {/* Logo + brand */}
            <div className="flex items-center gap-2.5 mb-10">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3B5BDB] shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                    PassForge
                </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Sign in to access your vault.
                </p>
            </div>

            {/* Server error banner */}
            {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                    {error.message}
                </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="grid gap-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isPending}
                        className="h-10 text-sm border-gray-200 focus-visible:ring-[#3B5BDB]/30 focus-visible:border-[#3B5BDB]"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </Label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs text-[#3B5BDB] hover:underline font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            disabled={isPending}
                            className="h-10 pr-10 text-sm border-gray-200 focus-visible:ring-[#3B5BDB]/30 focus-visible:border-[#3B5BDB]"
                            {...register("password")}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2.5">
                    <Checkbox
                        id="remember"
                        disabled={isPending}
                        className="border-gray-300 data-[state=checked]:bg-[#3B5BDB] data-[state=checked]:border-[#3B5BDB]"
                    />
                    <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer select-none"
                    >
                        Remember me
                    </Label>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-10 w-full bg-[#3B5BDB] hover:bg-[#3451C7] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors mt-1"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Signing in…
                        </span>
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>

            {/* Sign up link */}
            <p className="text-center text-xs text-gray-500 mt-8">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/register"
                    className="text-[#3B5BDB] font-semibold hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
