"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";

const ItemSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    console.log(value);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full max-w-md relative">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pr-10 border-primary/25 h-8"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <LucideSearch className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-10 left-0 right-0 w-full bg-[#202629] rounded-md p-4 text-white shadow-lg z-50 flex items-center justify-center"
          >
            <Loader className="animate-spin -ml-1 mr-3 h-6 w-6 text-primary" />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ItemSearch;
