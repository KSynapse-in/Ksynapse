"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("KSynapse application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5F3EE]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-divider/40 p-8 text-center shadow-card">
        <div className="w-16 h-16 rounded-full bg-brick/10 flex items-center justify-center mx-auto mb-5">
          <AlertOctagon className="w-8 h-8 text-brick" />
        </div>
        
        <span className="text-xs font-mono text-brick uppercase tracking-widest block mb-2">
          500 · Server Fault
        </span>
        
        <h1 className="text-2xl font-display text-charcoal mb-3">
          An Unexpected Error Occurred
        </h1>
        
        <p className="text-sm text-stone leading-relaxed mb-8">
          Our ESG data processing engine encountered an interruption. Our site resiliency team has been notified automatically.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            variant="primary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              icon={<Home className="w-4 h-4" />}
              className="w-full"
            >
              Return Home
            </Button>
          </Link>
        </div>
        
        {error.digest && (
          <div className="mt-6 pt-4 border-t border-divider/20">
            <p className="text-[11px] font-mono text-stone">
              Error Digest: <span className="text-charcoal font-medium">{error.digest}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
