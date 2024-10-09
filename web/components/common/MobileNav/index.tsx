"use client" 
import {MenuIcon} from "lucide-react";
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {menuItems} from "../Sider/index"


const MobileNav = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="lg:hidden">
                        <MenuIcon className="h-5 w-5"/>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-4 p-4 text-sm font-medium">
                        {
                        menuItems.map((item) => (
                            <Link key={
                                    item.name
                                }
                                href={
                                    item.path
                                }
                                className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                                prefetch={true}>
                                <item.icon className="h-5 w-5"/> {
                                item.name
                            } </Link>
                        ))
                    } </nav>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default MobileNav;
