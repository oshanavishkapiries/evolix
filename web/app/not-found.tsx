import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen space-y-5 flex flex-col justify-center items-center">
      {/* Image for Not Found */}
      <Image
        src="/img/icon.png"
        alt="Evolix Logo"
        className="w-28 h-28 border-4 border-primary rounded-2xl"
        width={200}
        height={200}
      />

      {/* 404 Message */}
      <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
      <p className="text-gray-500">
        The page you are looking for doesn’t exist.
      </p>

      {/* Go to Home Button */}
      <Link href="/" passHref>
        <button className="px-4 py-2 bg-primary text-background font-semibold rounded-md hover:bg-primary-dark transition-colors">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
