"use client";

import { DataTable } from "@/components/passwords/data-table";
import { passwordColumns } from "@/components/passwords/columns";
import { AddPasswordModal } from "@/components/passwords/add-password-modal";
import { usePasswords } from "@/hooks/use-passwords";
import { LoaderCircle } from "lucide-react";

export default function PasswordsPage() {
    const { data: passwords, isLoading, error } = usePasswords();

    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">All Passwords</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your saved passwords.
                    </p>
                </div>
                <AddPasswordModal />
            </div>

            {isLoading ? (
                <div className="flex flex-1 items-center justify-center py-20">
                    <LoaderCircle className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : error ? (
                <p className="text-sm text-red-500">
                    Failed to load passwords: {error.message}
                </p>
            ) : (
                <DataTable columns={passwordColumns} data={passwords ?? []} />
            )}
        </div>
    );
}
