"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Check, AlertCircle, ShieldCheck, ArrowRight, LockKeyhole } from "lucide-react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const BENEFITS = [
  "Free ESG Maturity Assessment",
  "Multi-framework compliance tracking",
  "AI-powered recommendations",
  "Assigned ESG advisor",
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
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

function IntelligenceField() {
  const reduceMotion = useReducedMotion();

  const paths = [
    "M-30 560 C100 430 155 475 270 365 C360 280 430 315 620 170",
    "M-40 650 C100 530 190 560 305 450 C400 358 475 390 650 255",
    "M40 280 C150 350 220 315 315 220 C400 132 475 160 650 65",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Premium architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(225,239,231,.11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,239,231,.11) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at 50% 45%, black 0%, rgba(0,0,0,.9) 42%, transparent 82%)",
        }}
      />

      <svg
        viewBox="0 0 700 850"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="signupGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A35C" stopOpacity="0" />
            <stop offset="48%" stopColor="#E2C98D" stopOpacity=".72" />
            <stop offset="100%" stopColor="#C9A35C" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="signupGlow">
            <stop offset="0%" stopColor="#C9A35C" stopOpacity=".14" />
            <stop offset="100%" stopColor="#C9A35C" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx="360"
          cy="430"
          rx="285"
          ry="245"
          fill="url(#signupGlow)"
        />

        <g
          fill="none"
          stroke="#D0DDD5"
          strokeOpacity=".085"
          strokeWidth="1"
        >
          <ellipse cx="355" cy="420" rx="260" ry="215" />
          <ellipse cx="355" cy="420" rx="205" ry="168" />
          <ellipse cx="355" cy="420" rx="145" ry="120" />
          <circle cx="355" cy="420" r="300" />
        </g>

        <g fill="none" stroke="url(#signupGold)" strokeWidth="1.2">
          {paths.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              strokeDasharray="900"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 0.6 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{ pathLength: 1, opacity: 0.62 }}
              transition={{
                duration: reduceMotion ? 0 : 1.8,
                delay: reduceMotion ? 0 : index * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {[
          [126, 476],
          [290, 345],
          [475, 306],
          [365, 535],
          [520, 182],
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="3.5" fill="#C9A35C" opacity=".75" />
            <circle
              cx={cx}
              cy={cy}
              r="11"
              fill="none"
              stroke="#C9A35C"
              strokeOpacity=".17"
            />
            <circle
              cx={cx}
              cy={cy}
              r="18"
              fill="none"
              stroke="#D0DDD5"
              strokeOpacity=".06"
            />
            <text
              x={cx + 15}
              y={cy + 3}
              fill="#D0DDD5"
              fillOpacity=".35"
              fontSize="8"
              letterSpacing="1.6"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              0{index + 1}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute left-[8%] top-[10%] h-[80%] w-px bg-white/[0.06]" />
      <div className="absolute right-[9%] top-[14%] h-[67%] w-px bg-[#C9A35C]/[0.08]" />
    </div>
  );
}

function ESGOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto mt-14 h-[210px] w-[210px]">
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-[#C9A35C]/30"
      >
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#E2C98D] shadow-[0_0_18px_rgba(226,201,141,.45)]" />
      </motion.div>

      <div className="absolute inset-[22px] rounded-full border border-white/[0.09] bg-[#0E3328]/75 shadow-[inset_0_0_45px_rgba(0,0,0,.12)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C9A35C]">
          KSynapse
        </div>
        <div className="mt-3 font-serif text-[42px] leading-none tracking-[-0.05em] text-[#F7F4EA]">
          ESG
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#B4C8BD]">
          Intelligence
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const reduceMotion = useReducedMotion();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const valid = useMemo(
    () =>
      firstName.trim().length > 1 &&
      lastName.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(email) &&
      organisation.trim().length > 1 &&
      password.length >= 8,
    [firstName, lastName, email, organisation, password],
  );

  const handleGoogleSignup = async () => {
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
      setError("Unable to continue with Google. Please try again.");
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valid) {
      setError(
        "Please complete all fields and use a password with at least 8 characters.",
      );
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      
      // Save user details to firebase
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
        organisation: organisation,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
      }, { merge: true });

      window.location.href = "/coming-soon";
    } catch {
      setStatus("idle");
      setError("We could not create your account. Please try again.");
    }
  };

  const transition = reduceMotion
    ? undefined
    : {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EA] text-[#173F32]">
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

        /*
          HARD CONTRAST RULE:
          Dark green surfaces may NEVER inherit black typography.
        */
        .ks-green,
        .ks-green * {
          color: #f7f4ea !important;
        }

        .ks-green .ks-muted {
          color: #d0ddd5 !important;
        }

        .ks-green .ks-soft {
          color: #b4c8bd !important;
        }

        .ks-green .ks-gold {
          color: #e2c98d !important;
        }

        input::placeholder {
          color: #899990;
          opacity: 1;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #173f32;
          box-shadow: 0 0 0 1000px #fbf9f2 inset;
        }

        .ks-field {
          transition:
            border-color 250ms ease,
            box-shadow 250ms ease,
            background-color 250ms ease,
            transform 250ms ease;
        }

        .ks-field:focus-within {
          border-color: rgba(201, 163, 92, 0.68) !important;
          background: #fffdf8;
          box-shadow:
            inset 3px 0 0 #c9a35c,
            0 12px 34px rgba(18, 59, 46, 0.055);
        }

        @media (max-width: 1024px) {
          .signup-visual {
            min-height: 560px;
          }
        }
      `}</style>

      <div className="grid min-h-screen lg:grid-cols-[1.04fr_0.96fr]">
        {/* RIGHT: ACCOUNT CREATION */}
        <section className="relative flex min-h-screen items-center bg-[#F7F4EA] px-7 py-14 sm:px-12 lg:px-20 xl:px-28">
          <div
            aria-hidden="true"
            className="absolute right-0 top-[12%] hidden h-[76%] w-px bg-gradient-to-b from-transparent via-[#C9A35C]/35 to-transparent lg:block"
          />

          <div className="mx-auto w-full max-w-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.23em] text-[#7A7D72]">
                <span className="h-2 w-2 rounded-full bg-[#C9A35C]" />
                Create workspace
                <span className="h-px w-12 bg-[#C9A35C]/40" />
                KSynapse
              </div>

              <h2 className="font-serif text-[clamp(3.6rem,5.2vw,6rem)] font-normal leading-[0.88] tracking-[-0.06em] text-[#173F32]">
                Create your
                <br />
                <span className="text-[#668273]">account.</span>
              </h2>

              <p className="mt-7 text-[18px] leading-8 text-[#5D7067]">
                Get started with KSynapse in minutes.
              </p>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={status === "loading"}
                className="mt-11 flex h-[64px] w-full items-center justify-center gap-3 border border-[#173F32]/14 bg-[#FBF9F2] text-[16px] font-semibold text-[#24483B] shadow-[0_7px_25px_rgba(18,59,46,.035)] transition-all duration-300 hover:border-[#C9A35C]/60 hover:bg-white hover:shadow-[0_14px_35px_rgba(18,59,46,.07)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleMark />
                {status === "loading" ? "Creating…" : "Sign up with Google"}
              </button>

              <div className="my-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-[#173F32]/10" />
                <span className="font-serif text-[14px] italic text-[#8B9088]">
                  or
                </span>
                <span className="h-px flex-1 bg-[#173F32]/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="First Name"
                    placeholder="First name"
                    value={firstName}
                    onChange={setFirstName}
                    autoComplete="given-name"
                  />

                  <Field
                    label="Last Name"
                    placeholder="Last name"
                    value={lastName}
                    onChange={setLastName}
                    autoComplete="family-name"
                  />
                </div>

                <Field
                  label="Work Email"
                  placeholder="your@company.com"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  type="email"
                />

                <Field
                  label="Organisation Name"
                  placeholder="Company name"
                  value={organisation}
                  onChange={setOrganisation}
                  autoComplete="organization"
                />

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.17em] text-[#68776F]"
                  >
                    Password
                  </label>

                  <div className="ks-field flex border-b border-[#173F32]/18 bg-[#FBF9F2]">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                        setStatus("idle");
                      }}
                      placeholder="Min 8 characters"
                      autoComplete="new-password"
                      className="h-[60px] min-w-0 flex-1 bg-transparent px-5 text-[17px] text-[#173F32] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="flex h-[60px] w-[58px] items-center justify-center text-[#809087] transition-colors hover:text-[#8D6C39]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} strokeWidth={1.4} />
                      ) : (
                        <Eye size={19} strokeWidth={1.4} />
                      )}
                    </button>
                  </div>
                </div>

                <p className="pt-1 text-[11px] leading-5 text-[#718078]">
                  By signing up, you agree to our{" "}
                  <a
                    href="/terms"
                    className="text-[#7E6335] underline decoration-[#C9A35C]/40 underline-offset-4"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-[#7E6335] underline decoration-[#C9A35C]/40 underline-offset-4"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                {error && (
                  <div className="border-l-2 border-[#A96E52] bg-[#F2E9DF] px-4 py-3 text-[13px] leading-5 text-[#755847]">
                    {error}
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-3 border-l-2 border-[#66816F] bg-[#E7EEE8] px-4 py-3 text-[13px] text-[#486556]">
                    <ShieldCheck size={17} />
                    Account creation successful.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex h-[64px] w-full items-center justify-center gap-3 overflow-hidden bg-[#123B2E] text-[16px] font-semibold !text-[#F7F4EA] shadow-[0_12px_32px_rgba(18,59,46,.13)] transition-all duration-300 hover:bg-[#184B3B] hover:shadow-[0_17px_40px_rgba(18,59,46,.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 !text-[#F7F4EA]">
                    {status === "loading" ? "Creating account…" : "Create Account"}
                  </span>

                  {status !== "loading" ? (
                    <ArrowRight
                      size={18}
                      strokeWidth={1.7}
                      className="relative z-10 !text-[#F7F4EA] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  ) : (
                    <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-[#F7F4EA]/30 border-t-[#F7F4EA]" />
                  )}
                </button>
              </form>

              <div className="mt-9 text-center text-[15px] text-[#68776F]">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#7E6335] underline decoration-[#C9A35C]/40 underline-offset-4 transition-colors hover:text-[#A37A38]"
                >
                  Sign in
                </a>
              </div>

              <div className="mt-14 flex items-center justify-between border-t border-[#173F32]/10 pt-5 font-mono text-[8px] uppercase tracking-[0.17em] text-[#9A9B91]">
                <span>KSYNAPSE / REGISTRATION</span>
                <span className="flex items-center gap-2">
                  <LockKeyhole size={12} strokeWidth={1.25} />
                  Protected workspace
                </span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* LEFT: BRAND / VALUE ENVIRONMENT */}
        <section className="ks-green signup-visual relative flex min-h-[590px] overflow-hidden bg-[#123B2E]">
          <IntelligenceField />

          <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col px-4 py-10 sm:px-12 lg:px-16 lg:py-14 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="flex items-center gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[13px] border border-white/15 bg-white/[0.055] p-2 shadow-[0_14px_35px_rgba(0,0,0,.12)]">
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

            <div className="flex flex-1 flex-col justify-center pb-6 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...(transition || {}),
                  delay: reduceMotion ? 0 : 0.15,
                }}
              >
                <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.23em] text-[#E2C98D]">
                  <span className="h-2 w-2 rounded-full bg-[#C9A35C]" />
                  Built for Indian enterprises
                </div>

                <h1 className="max-w-[590px] font-serif text-[clamp(2.25rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-[-0.04em] text-[#F7F4EA]">
                  Start Your ESG
                  <br />
                  Intelligence
                  <br />
                  <span className="text-[#E2C98D]">Journey.</span>
                </h1>

                <p className="ks-muted mt-8 max-w-[560px] text-[17px] leading-8">
                  Join hundreds of Indian MSMEs building credible, automated
                  ESG foundations — with one intelligent platform for
                  measurement, compliance, reporting and action.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...(transition || {}),
                  delay: reduceMotion ? 0 : 0.3,
                }}
                className="mt-9 grid gap-4 sm:grid-cols-2"
              >
                {BENEFITS.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 backdrop-blur-[2px]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C9A35C]/15">
                      <Check
                        size={14}
                        strokeWidth={2}
                        className="!text-[#E2C98D]"
                      />
                    </span>
                    <span className="ks-muted text-[13px] leading-5">
                      {benefit}
                    </span>
                  </div>
                ))}
              </motion.div>

              <div className="hidden lg:block">
                <ESGOrbit />
              </div>
            </div>

            <div className="border-t border-white/[0.1] pt-5">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.18em] text-[#B4C8BD]">
                <span>Measure / Monitor / Analyze / Report</span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={13} className="!text-[#E2C98D]" />
                  Secure enterprise workspace
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.17em] text-[#68776F]">
        {label}
      </label>

      <div className="ks-field border-b border-[#173F32]/18 bg-[#FBF9F2]">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-[60px] w-full bg-transparent px-5 text-[17px] text-[#173F32] outline-none"
        />
      </div>
    </div>
  );
}