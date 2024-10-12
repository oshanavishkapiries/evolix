import Link from "next/link";
import Image from "next/image";
import MobileNav from "../../common/MobileNav";
import Profile from "../profile";
import Search from "../Search";

const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-16 lg:px-6">
        {/* mobile nav */}
        <MobileNav />
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          prefetch={true}
        >
          <Image
            src="/svg/evolix.svg"
            className="w-[100px]"
            alt="logo"
            width={200}
            height={40}
          />
        </Link>
        {/* Search */}
        <Search />
        {/* profile */}
        <Profile />
      </header>
    </>
  );
};

export default Navbar;
