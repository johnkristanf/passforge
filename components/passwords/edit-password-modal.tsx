"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordSchema, type PasswordFormValues } from "@/lib/validations/password";
import { useUpdatePassword } from "@/hooks/use-passwords";
import { Password } from "@/types/password";

interface EditPasswordModalProps {
    password: Password | null;
    open: boolean;
    onClose: () => void;
}

export function EditPasswordModal({ password, open, onClose }: EditPasswordModalProps) {
    const { mutate, isPending, error } = useUpdatePassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    // Pre-fill form when password changes
    useEffect(() => {
        if (password) {
            reset({
                platform: password.platform,
                link: password.link,
                user_email: password.user_email,
                password: password.password,
            });
        }
    }, [password, reset]);

    function onSubmit(values: PasswordFormValues) {
        if (!password) return;
        mutate(
            { id: password.id, values },
            { onSuccess: onClose }
        );
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Password</DialogTitle>
                </DialogHeader>

                {error && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error.message}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
                    <div className="grid gap-1.5">
                        <Label htmlFor="edit-platform">Platform</Label>
                        <Input id="edit-platform" placeholder="Amazon Web Services" {...register("platform")} />
                        {errors.platform && <p className="text-xs text-red-500">{errors.platform.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="edit-link">Link</Label>
                        <Input id="edit-link" placeholder="https://example.com" {...register("link")} />
                        {errors.link && <p className="text-xs text-red-500">{errors.link.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="edit-email">User / Email</Label>
                        <Input id="edit-email" placeholder="user@example.com" {...register("user_email")} />
                        {errors.user_email && <p className="text-xs text-red-500">{errors.user_email.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="edit-password">Password</Label>
                        <Input id="edit-password" type="password" placeholder="••••••••" {...register("password")} />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="bg-[#3B5BDB] hover:bg-[#3451C7] text-white">
                            {isPending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
