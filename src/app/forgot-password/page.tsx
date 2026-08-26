"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "password_resets"), {
        email,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting reset request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="12" cy="14" r="2" fill="white" />
              </svg>
            </div>
            <span className="font-display text-lg text-forest tracking-tight">KSynapse</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-divider/40 p-8 shadow-card">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-display mb-2">Reset your password</h1>
              <p className="text-sm text-stone mb-6">
                Enter the email associated with your account and we&apos;ll send a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-divider/60 bg-ivory text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full" iconRight={<ArrowRight className="w-4 h-4" />}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-sage" />
              </div>
              <h2 className="text-xl font-display mb-2">Check your email</h2>
              <p className="text-sm text-stone mb-6">
                If an account exists with that email, you&apos;ll receive a password reset link shortly.
              </p>
              <Button variant="secondary" size="md" onClick={() => setSubmitted(false)}>
                Try another email
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-stone hover:text-forest transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
