"use client";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const Profile = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const initials = user ?. displayName ? user.displayName.slice(0, 2).toUpperCase() : "NN";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    {initials}
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="px-4 py-2">
                    {/* Display user name and email */}
                    <div className="font-semibold">
                        {
                        user ?. displayName || "User Name"
                    }</div>
                    <div className="text-sm text-muted-foreground">
                        {
                        user ?. email || "user@example.com"
                    }</div>
                </div>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
