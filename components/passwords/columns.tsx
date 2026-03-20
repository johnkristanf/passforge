"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Eye, EyeOff, ExternalLink, Pencil, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Password } from "@/types/password";
import { EditPasswordModal } from "@/components/passwords/edit-password-modal";
import { DeletePasswordDialog } from "@/components/passwords/delete-password-dialog";

function MaskedPassword({ value }: { value: string }) {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="font-mono text-sm">
                {visible ? value : "•".repeat(Math.min(value.length, 12))}
            </span>
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={() => setVisible((v) => !v)}
                >
                    {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                {visible && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                )}
            </div>
        </div>
    );
}

function RowActions({ row }: { row: Password }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-[#3B5BDB]"
                    onClick={() => setEditOpen(true)}
                >
                    <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-red-600"
                    onClick={() => setDeleteOpen(true)}
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </Button>
            </div>

            <EditPasswordModal
                password={editOpen ? row : null}
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <DeletePasswordDialog
                password={deleteOpen ? row : null}
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            />
        </>
    );
}

export const passwordColumns: ColumnDef<Password>[] = [
    {
        accessorKey: "platform",
        header: "Platform",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("platform")}</span>
        ),
    },
    {
        accessorKey: "link",
        header: "Link",
        cell: ({ row }) => {
            const url = row.getValue<string>("link");
            return url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#3B5BDB] hover:underline text-sm truncate max-w-[200px]"
                >
                    {url}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
            ) : (
                <span className="text-muted-foreground text-sm">—</span>
            );
        },
    },
    {
        accessorKey: "user_email",
        header: "User / Email",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("user_email") || "—"}</span>
        ),
    },
    {
        accessorKey: "password",
        header: "Password",
        cell: ({ row }) => <MaskedPassword value={row.getValue("password")} />,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <RowActions row={row.original} />,
    },
];
