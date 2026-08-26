"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Safely parse emails from .env
  const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory text-forest">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EA]">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-[0_22px_70px_rgba(23,61,49,.07)] border border-[#173d31]/12 text-center">
          <h1 className="text-3xl font-serif text-[#173d31] mb-2">KSynapse Admin</h1>
          <p className="text-[#687770] text-sm mb-8">
            Please sign in with your authorized Google account to access the dashboard.
          </p>
          <Button variant="primary" size="lg" className="w-full justify-center" onClick={handleLogin}>
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  // Check if logged-in user is in the allowed list
  if (user.email && !allowedEmails.includes(user.email.toLowerCase())) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EA]">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-[0_22px_70px_rgba(23,61,49,.07)] border border-[#173d31]/12 text-center">
          <h1 className="text-2xl font-serif text-red-600 mb-2">Access Denied</h1>
          <p className="text-[#687770] text-sm mb-8">
            The account <strong>{user.email}</strong> is not authorized to access this dashboard.
          </p>
          <Button variant="secondary" size="md" className="w-full justify-center" onClick={() => signOut(auth)}>
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EA]">
      <header className="bg-white border-b border-[#173d31]/12 sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl text-[#173d31]">Platform Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#687770]">{user.email}</span>
            <button onClick={() => signOut(auth)} className="text-sm font-medium text-red-600 hover:text-red-700">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
