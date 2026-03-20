"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, LoaderCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordSchema, type PasswordFormValues } from "@/lib/validations/password";
import { useCreatePassword } from "@/hooks/use-passwords";

export function AddPasswordModal() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const { mutate, isPending, error } = useCreatePassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    function onSubmit(values: PasswordFormValues) {
        mutate(values, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    }

    if (!mounted) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-[#3B5BDB] hover:bg-[#3451C7] text-white gap-2" />}>
                <Plus className="w-4 h-4" />
                Add Password
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Password</DialogTitle>
                </DialogHeader>

                {error && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error.message}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
                    <div className="grid gap-1.5">
                        <Label htmlFor="add-platform">Platform</Label>
                        <Input id="add-platform" placeholder="Amazon Web Services" {...register("platform")} />
                        {errors.platform && <p className="text-xs text-red-500">{errors.platform.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="add-link">Link</Label>
                        <Input id="add-link" placeholder="https://example.com" {...register("link")} />
                        {errors.link && <p className="text-xs text-red-500">{errors.link.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="add-email">User / Email</Label>
                        <Input id="add-email" placeholder="user@example.com" {...register("user_email")} />
                        {errors.user_email && <p className="text-xs text-red-500">{errors.user_email.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="add-password">Password</Label>
                        <Input id="add-password" type="password" placeholder="••••••••" {...register("password")} />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="bg-[#3B5BDB] hover:bg-[#3451C7] text-white">
                            {isPending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
