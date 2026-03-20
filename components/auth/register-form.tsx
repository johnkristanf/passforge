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

import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { registerWithEmail } from "@/lib/actions/auth";

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate, isPending, error } = useMutation({
        mutationFn: registerWithEmail,
        onSuccess: () => {
            // Supabase sends a confirmation email by default
            setSuccessMsg("Check your email to confirm your account!");
        },
    });

    const onSubmit = (values: RegisterFormValues) => mutate(values);

    return (
        <div className="flex flex-col h-full justify-center px-10 py-12">
            {/* Logo + brand */}
            <div className="flex items-center gap-2.5 mb-8">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3B5BDB] shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                    PassForge
                </span>
            </div>

            {/* Heading */}
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Create your account
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Start protecting your passwords today.
                </p>
            </div>

            {/* Success banner */}
            {successMsg && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
                    {successMsg}
                </div>
            )}

            {/* Error banner */}
            {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                    {error.message}
                </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="grid gap-1.5">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        disabled={isPending}
                        className="h-10 text-sm border-gray-200 focus-visible:ring-[#3B5BDB]/30 focus-visible:border-[#3B5BDB]"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

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
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="grid gap-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
                            autoComplete="new-password"
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
                            onClick={() => setShowPassword((p) => !p)}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-1.5">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            disabled={isPending}
                            className="h-10 pr-10 text-sm border-gray-200 focus-visible:ring-[#3B5BDB]/30 focus-visible:border-[#3B5BDB]"
                            {...register("confirmPassword")}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                            onClick={() => setShowConfirm((p) => !p)}
                        >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                    )}
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
                            Creating account…
                        </span>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>

            {/* Login link */}
            <p className="text-center text-xs text-gray-500 mt-7">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="text-[#3B5BDB] font-semibold hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
