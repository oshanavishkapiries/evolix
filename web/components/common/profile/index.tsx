"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <p>{user?.displayName?.slice(0, 1) || "NN"}</p>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-4 py-2">
          {/* Display user name and email */}
          <div className="font-semibold">
            {user?.displayName || "User Name"}
          </div>
          <div className="text-sm text-muted-foreground">
            {user?.email || "user@example.com"}
          </div>
        </div>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
