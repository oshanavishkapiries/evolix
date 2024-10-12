"use client";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { menuItems } from "../Sider/index";

const MobileNav = () => {
  const pathname = usePathname(); // Get current pathname

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-muted shadow-lg lg:hidden">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : ""
              }`}
              prefetch={true}
            >
              <item.icon
                className={`h-5 w-5 ${
                  pathname === item.path ? "text-primary" : ""
                }`}
              />
            </Link>
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="sm:max-w-full">
              <nav className="grid gap-4 p-4 text-sm font-medium">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground ${
                      pathname === item.path ? "text-primary" : ""
                    }`}
                    prefetch={true}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        pathname === item.path ? "text-primary" : ""
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
