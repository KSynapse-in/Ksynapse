import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <span className="font-mono text-[120px] font-semibold text-divider/40 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="opacity-20">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#16332A" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M12 8L7 11V17L12 20L17 17V11L12 8Z" fill="rgba(22,51,42,0.1)" stroke="#16332A" strokeWidth="1" strokeLinejoin="round" />
              <circle cx="12" cy="14" r="2" fill="#16332A" opacity="0.3" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-display mb-3">
          This page seems to have gone net-zero.
        </h1>
        <p className="text-stone mb-8">
          The page you&apos;re looking for doesn&apos;t exist — but your ESG journey doesn&apos;t have to stop here.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/assessment">
            <Button variant="secondary" size="lg">
              Take Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
