"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * KSynapse — Premium Enterprise Login
 *
 * Design direction:
 * - Indian enterprise / institutional
 * - Warm ivory + forest green + restrained champagne
 * - NO black text anywhere
 * - No generic SaaS / neon / glassmorphism treatment
 * - Responsive two-environment composition
 *
 * IMPORTANT:
 * Replace the `handleGoogleSignIn` and `handlePasswordSignIn`
 * bodies with your existing authentication functions if your project
 * already has Firebase/Supabase/Auth.js/etc. configured.
 */

const COLORS = {
  ivory: "#F7F4EA",
  ivorySoft: "#FBF9F2",
  forest: "#123B2E",
  forest2: "#173F32",
  forest3: "#0D3025",
  white: "#F7F4EA",
  sage: "#E6EEE8",
  sage2: "#D0DDD5",
  sage3: "#B4C8BD",
  gold: "#C9A35C",
  goldSoft: "#E2C98D",
  goldPale: "#F0DDAF",
  greenText: "#173F32",
  greenMuted: "#587168",
};

type Status = "idle" | "loading" | "success" | "error";

function ESGSignalArtwork() {
  const reduceMotion = useReducedMotion();

  const signalPaths = [
    "M35 392 C115 340 160 270 255 286 C343 301 388 346 520 305",
    "M18 470 C112 438 165 376 258 380 C348 383 414 426 548 391",
    "M92 558 C165 514 204 464 280 457 C362 449 429 493 522 472",
    "M112 230 C175 270 208 315 276 319 C351 323 412 273 504 228",
  ];

  const points = [
    { x: 90, y: 360, label: "ENVIRONMENTAL" },
    { x: 455, y: 340, label: "SOCIAL" },
    { x: 135, y: 520, label: "GOVERNANCE" },
    { x: 472, y: 510, label: "COMPLIANCE" },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* fine institutional grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(230,238,232,.11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,238,232,.11) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 46%, black 0%, rgba(0,0,0,.8) 42%, transparent 82%)",
        }}
      />

      {/* architectural contours */}
      <svg
        viewBox="0 0 560 720"
        className="absolute left-[-30px] top-[2%] h-[96%] w-[86%]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="signalGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A35C" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A35C" stopOpacity=".52" />
            <stop offset="100%" stopColor="#C9A35C" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g
          fill="none"
          stroke="#D0DDD5"
          strokeOpacity=".095"
          strokeWidth="1"
        >
          <ellipse cx="275" cy="370" rx="220" ry="116" />
          <ellipse cx="275" cy="370" rx="178" ry="92" />
          <ellipse cx="275" cy="370" rx="132" ry="68" />
          <circle cx="275" cy="370" r="230" />
        </g>

        <g fill="none" stroke="url(#signalGold)" strokeWidth="1">
          {signalPaths.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              strokeDasharray="620"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 0.7 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                delay: reduceMotion ? 0 : i * 0.16,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {points.map((point, i) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#C9A35C"
              fillOpacity=".72"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="none"
              stroke="#C9A35C"
              strokeOpacity=".18"
            />
            <text
              x={point.x + 12}
              y={point.y + 3}
              fill="#D0DDD5"
              fillOpacity=".38"
              fontSize="7"
              letterSpacing="1.7"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {point.label}
            </text>
          </g>
        ))}

        <text
          x="280"
          y="118"
          fill="#E6EEE8"
          fillOpacity=".38"
          fontSize="8"
          letterSpacing="2"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          ESG / INTELLIGENCE FIELD
        </text>

        <text
          x="280"
          y="625"
          fill="#B4C8BD"
          fillOpacity=".3"
          fontSize="7"
          letterSpacing="1.5"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          MEASURE / MONITOR / ANALYZE / REPORT
        </text>
      </svg>

      {/* subtle vertical architecture */}
      <div className="absolute left-[8%] top-[9%] h-[82%] w-px bg-white/[0.06]" />
      <div className="absolute left-[12%] top-[17%] h-[67%] w-px bg-[#C9A35C]/[0.08]" />
    </div>
  );
}

function ESGScore() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[174px] w-[174px]">
      <svg viewBox="0 0 174 174" className="h-full w-full -rotate-90">
        <circle
          cx="87"
          cy="87"
          r="66"
          fill="none"
          stroke="#E6EEE8"
          strokeOpacity=".12"
          strokeWidth="7"
        />

        <motion.circle
          cx="87"
          cy="87"
          r="66"
          fill="none"
          stroke="#C9A35C"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 66}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 66 }}
          animate={{
            strokeDashoffset:
              2 * Math.PI * 66 * (1 - 0.75),
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.8,
            delay: reduceMotion ? 0 : 0.35,
            ease: "easeOut",
          }}
        />

        <circle
          cx="87"
          cy="87"
          r="56"
          fill="#0E3328"
          stroke="#D0DDD5"
          strokeOpacity=".07"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-serif text-[52px] leading-none tracking-[-0.04em] text-[#F7F4EA]"
        >
          75
        </motion.div>

        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#B4C8BD]">
          ESG Score
        </div>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.19Z"
      />
      <path
        fill="#34A853"
        d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.74 9.74 0 0 0 12 21.6Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.72a5.86 5.86 0 0 1 0-3.45v-2.5H3.3a9.73 9.73 0 0 0 0 8.45l3.24-2.5Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.24c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.35 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.7 5.37l3.24 2.5C7.31 7.96 9.46 6.24 12 6.24Z"
      />
    </svg>
  );
}

// Place the supplied KSynapse logo at:
// C:\\Users\\licsa\\Downloads\\esg\\ksynapse\\public\\images\\logo.png
// In Next.js it is served as: /images/logo.png

export default function LoginPage() {
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setError("");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const valid = useMemo(
    () => /^\S+@\S+\.\S+$/.test(email) && password.length >= 6,
    [email, password],
  );

  /*
   * Replace this with your existing Google auth implementation.
   * The UI intentionally does not invent an authentication provider.
   */
  const handleGoogleSignIn = async () => {
    setError("");
    setStatus("loading");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save user details to firebase
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
      }, { merge: true });

      window.location.href = "/coming-soon";
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Unable to continue with Google. Please try again.");
    }
  };

  /*
   * Replace this with your existing email/password authentication.
   */
  const handlePasswordSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valid || status === "loading") {
      setError(
        "Please enter a valid email and a password with at least 6 characters.",
      );
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Save user details to firebase
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
      }, { merge: true });

      window.location.href = "/coming-soon";
    } catch {
      setStatus("error");
      setError("We could not sign you in. Please check your details.");
    }
  };

  const pageTransition = reduceMotion
    ? undefined
    : {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#F7F4EA] text-[#173F32]"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          min-height: 100%;
          background: #f7f4ea;
        }

        body {
          color: #173f32;
        }

        /*
         * GLOBAL CONTRAST SAFETY:
         * Never permit pure black / near-black typography.
         */
        input,
        button,
        a,
        p,
        span,
        label,
        div {
          text-rendering: optimizeLegibility;
        }

        input::placeholder {
          color: #8da198;
          opacity: 1;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #173f32;
          box-shadow: 0 0 0 1000px #f8f5ec inset;
          transition: background-color 9999s ease-out;
        }

        .ks-input {
          transition:
            border-color 280ms ease,
            background-color 280ms ease,
            box-shadow 280ms ease,
            transform 280ms ease;
        }

        .ks-input:focus-within {
          border-color: rgba(201, 163, 92, 0.72) !important;
          background: #fffdf7;
          box-shadow:
            inset 3px 0 0 #c9a35c,
            0 10px 32px rgba(18, 59, 46, 0.05);
        }

        .ks-input:focus-within label {
          color: #876c38 !important;
        }

        .ks-dark,
        .ks-dark * {
          color: #f7f4ea !important;
        }

        .ks-dark .ks-secondary {
          color: #d0ddd5 !important;
        }

        .ks-dark .ks-muted {
          color: #b4c8bd !important;
        }

        .ks-dark .ks-gold {
          color: #e2c98d !important;
        }

        @media (max-width: 900px) {
          .login-desktop-art {
            min-height: 390px;
          }
        }
      `}</style>

      <div className="grid min-h-screen lg:grid-cols-[1.06fr_0.94fr]">
        {/* =========================================================
            RIGHT — SECURE ACCESS WORKSPACE
        ========================================================= */}
        <section className="relative flex min-h-screen items-center bg-[#F7F4EA] px-7 py-16 sm:px-14 lg:px-20 xl:px-28">
          {/* visual continuity line */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-[15%] hidden h-[70%] w-px bg-gradient-to-b from-transparent via-[#C9A35C]/35 to-transparent lg:block"
          />

          <div className="mx-auto w-full max-w-[590px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={pageTransition}
            >
              {/* context */}
              <div className="mb-9 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7B735F]">
                <span className="h-2 w-2 rounded-full bg-[#C9A35C]" />
                Secure access
                <span className="h-px w-10 bg-[#C9A35C]/40" />
                KSynapse
              </div>

              <h1 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.04em] text-[#173F32]">
                Welcome back
              </h1>

              <p className="mt-7 text-[18px] leading-8 text-[#5F7068]">
                Sign in to your ESG dashboard
              </p>

              {/* authentication workspace */}
              <div className="mt-12">
                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={status === "loading"}
                  className="group flex h-[62px] w-full items-center justify-center gap-3 border border-[#173F32]/14 bg-[#FBF9F2] text-[16px] font-semibold text-[#24483B] shadow-[0_5px_20px_rgba(18,59,46,.035)] transition-all duration-300 hover:border-[#C9A35C]/55 hover:bg-white hover:shadow-[0_10px_28px_rgba(18,59,46,.07)] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <GoogleMark />
                  <span>{status === "loading" ? "Connecting…" : "Sign in with Google"}</span>
                </button>

                {/* divider */}
                <div className="my-7 flex items-center gap-4">
                  <span className="h-px flex-1 bg-[#173F32]/10" />
                  <span className="font-serif text-[13px] italic text-[#8B9088]">
                    or
                  </span>
                  <span className="h-px flex-1 bg-[#173F32]/10" />
                </div>

                <form onSubmit={handlePasswordSignIn} className="space-y-6">
                  {/* email */}
                  <div className="ks-input border-b border-[#173F32]/18 bg-[#F9F6EE]">
                    <label className="block px-4 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#718078]">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                        if (status !== "idle") setStatus("idle");
                      }}
                      placeholder="your@email.com"
                      className="h-[52px] w-full bg-transparent px-4 pb-3 pt-1 text-[18px] text-[#173F32] outline-none"
                      aria-label="Email"
                    />
                  </div>

                  {/* password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#718078]"
                      >
                        Password
                      </label>

                      <a
                        href="/forgot-password"
                        className="text-[14px] font-medium text-[#9A7740] transition-colors hover:text-[#6D572F] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="ks-input flex border-b border-[#173F32]/18 bg-[#F9F6EE]">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                          if (status !== "idle") setStatus("idle");
                        }}
                        placeholder="••••••••"
                        className="h-[64px] min-w-0 flex-1 bg-transparent px-4 text-[18px] tracking-[0.12em] text-[#173F32] outline-none"
                        aria-label="Password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="flex h-[64px] w-[56px] shrink-0 items-center justify-center text-[#809087] transition-colors hover:text-[#8D6C39]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={20} strokeWidth={1.4} />
                        ) : (
                          <Eye size={20} strokeWidth={1.4} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-l-2 border-[#A96E52] bg-[#F2E9DF] px-4 py-3 text-[12px] leading-5 text-[#755847]"
                      role="alert"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* success */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 border-l-2 border-[#66816F] bg-[#E7EEE8] px-4 py-3 text-[12px] leading-5 text-[#486556]"
                    >
                      <CheckCircle2 size={16} strokeWidth={1.4} />
                      Authentication successful.
                    </motion.div>
                  )}

                  {/* main action */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative flex h-[64px] w-full items-center justify-center gap-3 overflow-hidden bg-[#123B2E] text-[16px] font-semibold !text-[#F7F4EA] shadow-[0_10px_30px_rgba(18,59,46,.12)] transition-all duration-300 hover:bg-[#184B3B] hover:shadow-[0_14px_34px_rgba(18,59,46,.17)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="relative z-10 !text-[#F7F4EA]">
                      {status === "loading" ? "Signing in…" : "Sign In"}
                    </span>

                    {status !== "loading" && (
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className="relative z-10 !text-[#F7F4EA] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}

                    {status === "loading" && (
                      <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-[#F7F4EA]/30 border-t-[#F7F4EA]" />
                    )}
                  </button>
                </form>

                {/* security signal */}
                <div className="mt-9 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7A8981]">
                  <ShieldCheck size={13} strokeWidth={1.35} className="text-[#8E7547]" />
                  Secure authentication
                </div>

                {/* signup */}
                <div className="mt-10 text-center text-[15px] text-[#68776F]">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/signup"
                    className="font-semibold text-[#7E6335] underline decoration-[#C9A35C]/40 underline-offset-4 transition-colors hover:text-[#A37A38]"
                  >
                    Sign up
                  </a>
                </div>
              </div>

              {/* understated bottom metadata */}
              <div className="mt-16 flex items-center justify-between border-t border-[#173F32]/10 pt-5 font-mono text-[9px] uppercase tracking-[0.17em] text-[#9A9B91]">
                <span>KSYNAPSE / ACCESS</span>
                <span className="flex items-center gap-2">
                  <LockKeyhole size={11} strokeWidth={1.25} />
                  Protected workspace
                </span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* =========================================================
            LEFT — ESG INTELLIGENCE ENVIRONMENT
        ========================================================= */}
        <section className="ks-dark login-desktop-art relative flex min-h-[560px] overflow-hidden bg-[#123B2E] lg:min-h-screen">
          <ESGSignalArtwork />

          {/* subtle top/bottom architecture */}
          <div className="absolute left-0 right-0 top-0 h-px bg-white/[0.09]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.07]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[690px] flex-col px-4 sm:px-14 lg:px-16 py-10 lg:py-16 xl:px-24">
            {/* brand */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={pageTransition}
              className="flex items-center gap-4"
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.05] p-2 shadow-[0_12px_30px_rgba(0,0,0,.10)]">
                <img
                  src="/images/logo.png"
                  alt="KSynapse"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="font-serif text-[23px] leading-none text-[#F7F4EA]">
                  KSynapse
                </div>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#B4C8BD]">
                  ESG Intelligence
                </div>
              </div>
            </motion.div>

            {/* central score */}
            <div className="flex flex-1 flex-col items-center justify-center pb-4 pt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...(pageTransition || {}),
                  delay: reduceMotion ? 0 : 0.12,
                }}
                className="w-full"
              >
                <ESGScore />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...(pageTransition || {}),
                  delay: reduceMotion ? 0 : 0.3,
                }}
                className="mt-12 max-w-[510px] text-center"
              >
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2C98D]">
                  Intelligence environment
                </div>

                <h2 className="font-serif text-[clamp(3rem,4.8vw,5.1rem)] font-normal leading-[0.94] tracking-[-0.055em] text-[#F7F4EA]">
                  Your ESG Intelligence
                  <br />
                  Dashboard Awaits
                </h2>

                <p className="mx-auto mt-7 max-w-[590px] text-[17px] leading-8 text-[#D0DDD5]">
                  Track compliance, monitor emissions, and generate reports
                  across five global frameworks — all from one unified
                  platform.
                </p>
              </motion.div>
            </div>

            {/* signal legend */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...(pageTransition || {}),
                delay: reduceMotion ? 0 : 0.46,
              }}
              className="border-t border-white/[0.12] pt-5"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#B4C8BD]">
                <span className="flex items-center gap-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#C9A35C]" />
                  Environmental
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#B4C8BD]" />
                  Social
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#E2C98D]" />
                  Governance
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#D0DDD5]" />
                  Compliance
                </span>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}