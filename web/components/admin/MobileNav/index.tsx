import { FilmIcon, HomeIcon, MenuIcon, TvIcon } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MobileNav = () => {
  return (
    <>
     <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-4 p-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <FilmIcon className="h-5 w-5" />
                Movies
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <TvIcon className="h-5 w-5" />
                TV Shows
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
    </>
  )
}

export default MobileNav