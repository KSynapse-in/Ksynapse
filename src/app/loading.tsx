export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Animated brand emblem skeleton */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-forest/5 border border-forest/15 animate-ping opacity-75 duration-1000" />
          <div className="relative w-20 h-20 bg-transparent flex items-center justify-center">
            <img src="/images/logo.png" alt="KSynapse" className="w-full h-full object-contain animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-display text-base font-semibold text-charcoal tracking-tight">
            KSynapse
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-forest animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
