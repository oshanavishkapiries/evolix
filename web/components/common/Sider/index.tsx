"use client";
import { FilmIcon, HomeIcon, TvIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Movies",
    path: "/movies",
    icon: FilmIcon,
  },
  {
    name: "TV Shows",
    path: "/tv-shows",
    icon: TvIcon,
  },
];

const AdminSider = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-muted p-2 lg:flex">
        <nav className="flex flex-col gap-2 mt-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium 
              transition-colors hover:text-white
                ${
                  pathname === item.path
                    ? "border-l-4 border-primary  text-primary"
                    : ""
                }`}
              prefetch={true}
            >
              <item.icon className="h-5 w-5" /> {item.name}{" "}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSider;
