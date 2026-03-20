"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeletePassword } from "@/hooks/use-passwords";
import { Password } from "@/types/password";

interface DeletePasswordDialogProps {
    password: Password | null;
    open: boolean;
    onClose: () => void;
}

export function DeletePasswordDialog({ password, open, onClose }: DeletePasswordDialogProps) {
    const { mutate, isPending } = useDeletePassword();

    function handleDelete() {
        if (!password) return;
        mutate(password.id, { onSuccess: onClose });
    }

    return (
        <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the password for{" "}
                        <span className="font-semibold">{password?.platform}</span>? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isPending ? "Deleting…" : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
