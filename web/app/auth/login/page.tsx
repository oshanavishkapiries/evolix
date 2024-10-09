"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/firebase/functions";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const userPromise = signInWithGoogle();
      toast.promise(userPromise, {
        loading: "Signing in...",
        success: "Signed in successfully!",
        error: "Failed to sign in. Please try again.",
      });
      const user = await userPromise;
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
        })
      );
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-evodark1 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/">
          <Image
            src="/img/icon.png"
            alt="Evolix Logo"
            className="w-28 h-28 border-4 border-primary rounded-2xl"
            width={200}
            height={200}
          />
        </Link>
      </div>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="max-w-sm px-5 py-3 space-y-3 rounded-md flex flex-col items-center justify-center bg-muted drop-shadow-lg overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <h2 className="max-lg:text-xs text-sm">
                Would you like to sign in to your evolix account?
              </h2>
            </motion.div>
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-primary text-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Signing in..." : "Login"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
