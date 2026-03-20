"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/lib/actions/auth";
import { getInitials } from "@/lib/utils/get-initials";

interface NavbarUserProps {
    email?: string;
    name?: string;
    avatarUrl?: string;
}


export function NavbarUser({ email, name, avatarUrl }: NavbarUserProps) {
    const router = useRouter();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => router.push("/auth/login"),
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} alt={name ?? email} />
                    <AvatarFallback className="bg-[#3B5BDB] text-white text-xs font-semibold">
                        {getInitials(name, email)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col gap-0.5">
                            {name && <p className="text-sm font-semibold truncate">{name}</p>}
                            {email && (
                                <p className="text-xs text-muted-foreground truncate">{email}</p>
                            )}
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        disabled={isPending}
                        onClick={() => logout()}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        {isPending ? "Signing out…" : "Sign out"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
