"use client";

import { FormEvent, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Check,
  Globe2,
  Leaf,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function ComingSoonPage() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid work email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "launch_notifications"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ease = [0.22, 1, 0.36, 1] as const;

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

        /* Never allow dark/black typography on the green experience. */
        .ks-dark,
        .ks-dark * {
          color: #f7f4ea !important;
        }

        .ks-dark .muted {
          color: #cbd9d1 !important;
        }

        .ks-dark .gold {
          color: #e2c98d !important;
        }

        input::placeholder {
          color: #829188;
          opacity: 1;
        }

        .email-shell {
          transition:
            border-color 240ms ease,
            box-shadow 240ms ease,
            background 240ms ease;
        }

        .email-shell:focus-within {
          border-color: rgba(201, 163, 92, 0.75);
          background: #fffdf8;
          box-shadow:
            0 0 0 4px rgba(201, 163, 92, 0.08),
            0 18px 45px rgba(18, 59, 46, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Fine architectural background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(23,63,50,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(23,63,50,.045) 1px, transparent 1px)
            `,
            backgroundSize: "68px 68px",
            maskImage:
              "radial-gradient(circle at 50% 45%, black 0%, rgba(0,0,0,.9) 40%, transparent 82%)",
          }}
        />

        <div className="absolute -left-[250px] top-[12%] h-[650px] w-[650px] rounded-full border border-[#C9A35C]/10" />
        <div className="absolute -left-[190px] top-[18%] h-[530px] w-[530px] rounded-full border border-[#173F32]/[0.06]" />
        <div className="absolute -right-[280px] bottom-[5%] h-[720px] w-[720px] rounded-full border border-[#C9A35C]/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-6 py-6 sm:px-10 lg:px-16 xl:px-20">
        {/* NAV */}
        <header className="flex items-center justify-between border-b border-[#173F32]/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[11px] border border-[#173F32]/10 bg-white/55 p-2 shadow-[0_8px_25px_rgba(18,59,46,.04)]">
              <img
                src="/assets/logo.png"
                alt="KSynapse"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="font-serif text-[19px] leading-none text-[#173F32]">
                KSynapse
              </div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#7C8982]">
                ESG Intelligence
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#718078] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A35C]" />
            Preparing the next chapter
          </div>
        </header>

        {/* HERO */}
        <section className="relative flex flex-1 items-center justify-center py-16 sm:py-20 lg:py-24">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 xl:gap-20">
            {/* LEFT COPY */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              className="max-w-[760px]"
            >
              <div className="mb-7 inline-flex items-center gap-3 border border-[#C9A35C]/30 bg-[#FBF8EE] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#846B3C] shadow-[0_8px_25px_rgba(18,59,46,.035)]">
                <Sparkles size={13} />
                Something meaningful is coming
              </div>

              <h1 className="font-serif text-[clamp(4rem,7.1vw,7.7rem)] font-normal leading-[0.83] tracking-[-0.075em] text-[#173F32]">
                The future of
                <br />
                <span className="text-[#678374]">ESG intelligence</span>
                <br />
                <span className="text-[#B48643]">is almost here.</span>
              </h1>

              <p className="mt-9 max-w-[650px] text-[18px] leading-8 text-[#5D7067] sm:text-[20px] sm:leading-9">
                We are building a more intelligent way for organisations to
                measure, understand, report, and improve their ESG performance.
                KSynapse is getting ready for its next chapter.
              </p>

              {/* Notification form */}
              <div className="mt-11 max-w-[650px]">
                {!submitted ? (
                  <form onSubmit={submit}>
                    <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#78867F]">
                      Be the first to know
                    </label>

                    <div className="email-shell flex min-h-[70px] flex-col border border-[#173F32]/13 bg-[#FBF9F2] p-2 shadow-[0_15px_45px_rgba(18,59,46,.055)] sm:flex-row">
                      <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                        <Mail size={20} strokeWidth={1.35} className="shrink-0 text-[#8A7A57]" />
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          type="email"
                          placeholder="Enter your work email"
                          className="h-[52px] min-w-0 flex-1 bg-transparent text-[16px] text-[#173F32] outline-none sm:text-[17px]"
                          aria-label="Email address"
                        />
                      </div>

                      <button
                        type="submit"
                        className="group flex h-[56px] items-center justify-center gap-3 bg-[#123B2E] px-7 text-[14px] font-semibold !text-[#F7F4EA] shadow-[0_8px_20px_rgba(18,59,46,.14)] transition-all duration-300 hover:bg-[#184B3B] hover:px-8 sm:h-[54px]"
                      >
                        <span className="!text-[#F7F4EA]">Notify me</span>
                        <ArrowRight
                          size={17}
                          className="!text-[#E2C98D] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>

                    {error && (
                      <p className="mt-3 text-[12px] text-[#A2634B]">{error}</p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-[11px] text-[#89958F]">
                      <LockKeyhole size={13} />
                      <span>No spam. Only the launch announcement.</span>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#7A967F]/30 bg-[#E8EFE9] px-6 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123B2E]">
                        <Check size={17} className="!text-[#F7F4EA]" />
                      </span>
                      <div>
                        <div className="font-serif text-[20px] text-[#173F32]">
                          You’re on the list.
                        </div>
                        <div className="mt-1 text-[13px] text-[#60736A]">
                          We’ll let you know when KSynapse is ready.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[0.17em] text-[#8A928C]">
                <span className="flex items-center gap-2">
                  <Leaf size={13} className="text-[#8D7650]" />
                  Built for responsible growth
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 size={13} className="text-[#8D7650]" />
                  India-first ESG intelligence
                </span>
              </div>
            </motion.div>

            {/* RIGHT: UNIQUE LAUNCH VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="relative mx-auto w-full max-w-[620px]"
            >
              <div className="relative overflow-hidden rounded-xl border border-[#173F32]/10 bg-white p-2 shadow-[0_35px_90px_rgba(18,59,46,.15)]">
                <img
                  src="/images/dashboard.png"
                  alt="KSynapse Dashboard Preview"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* floating gold marker */}
              <div className="absolute -bottom-5 -left-5 hidden h-[72px] w-[72px] items-center justify-center border border-[#C9A35C]/30 bg-[#F7F4EA] shadow-[0_15px_40px_rgba(18,59,46,.12)] sm:flex">
                <BellRing size={24} className="text-[#9B783E]" strokeWidth={1.25} />
              </div>

              <div className="absolute -right-4 -top-4 hidden border border-[#173F32]/10 bg-[#FBF9F2] px-4 py-3 shadow-[0_15px_40px_rgba(18,59,46,.10)] sm:block">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8A8E87]">
                  Launch signal
                </div>
                <div className="mt-1 font-serif text-[17px] text-[#173F32]">
                  Almost ready.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <footer className="flex flex-col gap-3 border-t border-[#173F32]/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#9A9B91]">
            © KSynapse / ESG Intelligence
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#9A9B91]">
            Measure better. Understand deeper. Act smarter.
          </span>
        </footer>
      </div>
    </main>
  );
}
