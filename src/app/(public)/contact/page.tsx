"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/*
  KSynapse — Premium Contact Us
  --------------------------------
  IMPORTANT:
  - No Header
  - No Footer
  - No hero CTA
  - Absolutely NO black/dark text inside green panels.
  - All dark-green panel descendants are forced to warm white/light text
    through both explicit classes and the `.ks-dark-panel *` safeguard below.
*/

const journey = [
  {
    number: "01",
    title: "Understand",
    text: "Understand the organization's ESG priorities.",
  },
  {
    number: "02",
    title: "Align",
    text: "Identify the right platform and approach.",
  },
  {
    number: "03",
    title: "Act",
    text: "Move toward measurable ESG action.",
  },
];

const trustItems = [
  "ESG frameworks",
  "Reporting",
  "Compliance",
  "Data governance",
  "Enterprise readiness",
  "Sustainability intelligence",
];

const directContacts = [
  {
    label: "EMAIL",
    value: "hello@ksynapse.com",
    href: "mailto:hello@ksynapse.com",
  },
  {
    label: "PHONE",
    value: "+91 80 4567 8900",
    href: "tel:+918045678900",
  },
];

function SectionMarker({
  number,
  label,
  dark = false,
}: {
  number: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]",
        dark ? "text-[#fffdf5]" : "text-[#7e6b4c]",
      ].join(" ")}
    >
      <span className={dark ? "text-[#fffdf5]" : "text-[#b58a49]"}>
        {number}
      </span>

      <span
        className={[
          "h-px w-8",
          dark ? "bg-white/35" : "bg-[#b58a49]/40",
        ].join(" ")}
      />

      <span>{label}</span>
    </div>
  );
}

function HeroSignalField() {
  const reduceMotion = useReducedMotion();

  const paths = [
    "M10 170 C90 115 140 74 225 92 C305 109 344 141 470 104",
    "M15 246 C104 215 145 164 229 164 C313 164 357 198 472 171",
    "M70 330 C142 288 181 246 242 242 C322 237 373 272 458 257",
    "M94 68 C151 98 186 130 239 137 C304 145 355 108 425 76",
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-7vw] top-1/2 hidden h-[560px] w-[60vw] max-w-[850px] -translate-y-1/2 lg:block"
    >
      <svg viewBox="0 0 490 390" className="h-full w-full">
        <defs>
          <linearGradient id="ksynapse-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c4b3b" stopOpacity=".03" />
            <stop offset="50%" stopColor="#b58a49" stopOpacity=".52" />
            <stop offset="100%" stopColor="#1c4b3b" stopOpacity=".06" />
          </linearGradient>

          <radialGradient id="ksynapse-core">
            <stop offset="0%" stopColor="#b58a49" stopOpacity=".20" />
            <stop offset="100%" stopColor="#b58a49" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g
          fill="none"
          stroke="#173d31"
          strokeOpacity=".075"
          strokeWidth="1"
        >
          <circle cx="245" cy="170" r="154" />
          <circle cx="245" cy="170" r="116" />
          <circle cx="245" cy="170" r="78" />
          <ellipse cx="245" cy="170" rx="210" ry="88" />
        </g>

        <g fill="none" stroke="url(#ksynapse-line)" strokeWidth="1">
          {paths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              strokeDasharray="520"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 0.55 }
                  : { pathLength: 0, opacity: 0 }
              }
              whileInView={{ pathLength: 1, opacity: 0.68 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.2,
                delay: index * 0.13,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        <circle cx="245" cy="170" r="62" fill="url(#ksynapse-core)" />
        <circle
          cx="245"
          cy="170"
          r="25"
          fill="none"
          stroke="#b58a49"
          strokeOpacity=".18"
        />
        <circle
          cx="245"
          cy="170"
          r="11"
          fill="none"
          stroke="#b58a49"
          strokeOpacity=".38"
        />

        <motion.circle
          cx="245"
          cy="170"
          r="4.5"
          fill="#b58a49"
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={
            reduceMotion
              ? { scale: 1, opacity: 1 }
              : {
                scale: [0.8, 1.15, 0.8],
                opacity: [0.55, 1, 0.55],
              }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }
          }
        />

        <g
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="7"
          letterSpacing="1.2"
          fill="#173d31"
          fillOpacity=".52"
        >
          <text x="26" y="84">ESG / SIGNAL</text>
          <text x="344" y="101">REPORTING</text>
          <text x="70" y="300">COMPLIANCE</text>
          <text x="352" y="286">ENTERPRISE</text>
          <text x="218" y="150">CONVERGENCE</text>
        </g>
      </svg>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  required = true,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[14px] uppercase tracking-[0.16em] text-[#6f786f]">
        {label}
        {required && <span className="ml-1 text-[#b58a49]">*</span>}
      </span>

      <span className="ks-field block border-b border-[#173d31]/20 bg-[#f8f4eb]">
        <input
          required={required}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent px-1 py-4 text-[15px] leading-6 text-[#17342a] outline-none placeholder:text-[#9ba59f]"
        />
      </span>
    </label>
  );
}

export default function ContactUsPage() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      form.organisation.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(form.email) &&
      form.message.trim().length > 5
    );
  }, [form]);

  const reveal = reduceMotion
    ? {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
    }
    : {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    };

  const update =
    (field: keyof typeof form) =>
      (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setForm((current) => ({
          ...current,
          [field]: event.target.value,
        }));
      };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || sending) return;

    setSending(true);
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ea] text-[#17342a]">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        .ks-field {
          transition:
            border-color 350ms ease,
            background-color 350ms ease,
            box-shadow 350ms ease;
        }

        .ks-field:focus-within {
          border-color: rgba(181, 138, 73, 0.78);
          background: #fffdf8;
          box-shadow: inset 3px 0 0 #b58a49;
        }

        /*
          ABSOLUTE DARK-GREEN CONTRAST SAFETY NET
          -----------------------------------------
          Nothing inside a green panel can inherit black/dark text.
        */
        .ks-dark-panel,
        .ks-dark-panel * {
          color: #fffdf5 !important;
        }

        .ks-dark-panel .ks-gold {
          color: #f0d59a !important;
        }

        .ks-dark-panel .ks-muted {
          color: #dbe6df !important;
        }

        .ks-dark-panel .ks-border {
          border-color: rgba(255, 253, 245, 0.18) !important;
        }

        .ks-dark-panel a:hover {
          color: #fffdf5 !important;
        }
      `}</style>

      {/* =========================================================
          01 — HERO
          NO CTA / NO HEADER
      ========================================================= */}
      <section className="relative min-h-[760px] border-b border-[#173d31]/10 px-6 pb-24 pt-20 sm:px-10 lg:px-16 lg:pt-24">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]" 
            style={{ backgroundImage: "url('/images/esgassessment.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7F4EA] opacity-80" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(23,61,49,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(23,61,49,.045) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute left-[5%] top-[18%] h-44 w-44 rounded-full border border-[#173d31]/10"
        />

        <div
          aria-hidden="true"
          className="absolute left-[8%] top-[22%] h-32 w-32 rounded-full border border-[#b58a49]/15"
        />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid min-h-[610px] items-center lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div {...reveal} className="relative z-10 max-w-[620px]">
              <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7e6b4c]">
                <span className="h-2 w-2 rounded-full bg-[#b58a49]" />
                Contact / 01
                <span className="h-px w-14 bg-[#b58a49]/35" />
                Enterprise communication
              </div>

              <h1 className="font-serif text-[clamp(4.2rem,7vw,6.9rem)] font-normal leading-[0.86] tracking-[-0.06em] text-[#132f26]">
                Let&apos;s Talk
                <br />
                <span className="italic text-[#54745f]">ESG.</span>
              </h1>

              <p className="mt-9 max-w-[500px] text-[17px] leading-8 text-[#566a61]">
                Whether you&apos;re ready to get started or just exploring,
                we&apos;re here to help.
              </p>

              <div className="mt-12 flex max-w-[510px] items-center gap-4 border-t border-[#173d31]/12 pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7e6b4c]">
                  A considered conversation
                </span>

                <span className="h-px flex-1 bg-[#173d31]/10" />

                <ArrowDownRight
                  size={15}
                  strokeWidth={1.2}
                  className="text-[#b58a49]"
                />
              </div>
            </motion.div>

            <HeroSignalField />

            <motion.div
              {...reveal}
              className="relative z-10 ml-auto hidden w-[380px] lg:block"
              transition={{
                ...(reveal.transition || {}),
                delay: 0.18,
              }}
            >
              <div className="border-l border-[#173d31]/15 pl-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7e6b4c]">
                  Communication intelligence
                </div>

                <p className="mt-3 font-serif text-[26px] leading-[1.05] tracking-[-0.025em] text-[#173d31]">
                  Multiple ESG signals,
                  <br />
                  one meaningful conversation.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#78877f]">
                  <span>ESG intelligence</span>
                  <span>Compliance</span>
                  <span>Sustainability</span>
                  <span>Decision-making</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02 — MESSAGE WORKSPACE
      ========================================================= */}
      <section id="demo" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.02fr] lg:gap-24">
            <motion.div {...reveal}>
              <SectionMarker number="02" label="Your message" />

              <h2 className="max-w-[590px] font-serif text-[clamp(2.9rem,4.8vw,5rem)] leading-[0.93] tracking-[-0.055em]">
                Tell us what
                <br />
                you&apos;re working on.
              </h2>

              <p className="mt-7 max-w-[480px] text-[15px] leading-7 text-[#687770]">
                Share the context behind your enquiry. We&apos;ll use it to make
                the first conversation more useful.
              </p>

              <div className="mt-14 hidden lg:block">
                <div className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#8c7958]">
                  Message / private enquiry
                </div>
                <div className="mt-3 h-px w-56 bg-[#b58a49]/45" />
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{
                ...(reveal.transition || {}),
                delay: 0.1,
              }}
            >
              <div className="border border-[#173d31]/12 bg-[#fbf8f0] p-7 shadow-[0_22px_70px_rgba(23,61,49,.07)] sm:p-9 lg:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[500px] flex-col justify-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b58a49]/40 bg-[#f0e6d0] text-[#8a6936]">
                        <Check size={20} strokeWidth={1.5} />
                      </div>

                      <div className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8c7958]">
                        Submission / complete
                      </div>

                      <h3 className="mt-4 font-serif text-[44px] leading-none tracking-[-0.045em]">
                        Message received.
                      </h3>

                      <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-[#687770]">
                        Thank you for reaching out to KSynapse. Your enquiry has
                        been recorded for the next conversation.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            organisation: "",
                            email: "",
                            message: "",
                          });
                        }}
                        className="mt-9 inline-flex w-fit items-center gap-2 border-b border-[#173d31]/35 pb-1 text-sm font-medium"
                      >
                        Send another message
                        <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={submit}
                      className="space-y-7"
                    >
                      <Field
                        label="Name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={update("name")}
                      />

                      <Field
                        label="Organisation"
                        placeholder="Company name"
                        value={form.organisation}
                        onChange={update("organisation")}
                      />

                      <Field
                        label="Email"
                        placeholder="you@company.com"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                      />

                      <label className="block">
                        <span className="mb-2 block font-mono text-[14px] uppercase tracking-[0.16em] text-[#6f786f]">
                          Message <span className="text-[#b58a49]">*</span>
                        </span>

                        <span className="ks-field block border-b border-[#173d31]/20 bg-[#f8f4eb]">
                          <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={update("message")}
                            placeholder="How can we help you?"
                            className="w-full resize-none bg-transparent px-1 py-4 text-[15px] leading-7 text-[#17342a] outline-none placeholder:text-[#9ba59f]"
                          />
                        </span>
                      </label>

                      <div className="flex items-end justify-between gap-6 border-t border-[#173d31]/10 pt-6">
                        <p className="max-w-[230px] text-[11px] leading-5 text-[#7d8983]">
                          Include the context that would make your first
                          conversation useful.
                        </p>

                        <button
                          type="submit"
                          disabled={!canSubmit || sending}
                          className="group inline-flex shrink-0 items-center gap-3 bg-[#123b2e] px-6 py-4 text-sm font-semibold text-[#fffdf5] transition-all duration-300 hover:bg-[#1a4c3b] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {sending ? "Sending…" : "Send Message"}
                          <Send
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03 — DARK GREEN DEMO PANEL
          CRITICAL: .ks-dark-panel forces EVERY descendant to white/light.
      ========================================================= */}
      <section className="border-y border-[#173d31]/10 bg-[#edf0e7] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            {...reveal}
            className="ks-dark-panel relative overflow-hidden bg-[#123b2e] p-8 sm:p-10 lg:p-14"
          >
            <div
              aria-hidden="true"
              className="absolute right-[-90px] top-[-100px] h-[330px] w-[330px] rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="absolute right-[-45px] top-[-55px] h-[240px] w-[240px] rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-[-120px] left-[48%] h-[270px] w-[270px] rounded-full border border-white/[0.055]"
            />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_.75fr] lg:items-end">
              <div>
                <SectionMarker
                  number="03"
                  label="Platform demonstration"
                  dark
                />

                <h2 className="max-w-[650px] font-serif text-[clamp(3rem,5vw,5.7rem)] leading-[0.91] tracking-[-0.055em]">
                  See ESG intelligence
                  <br />
                  <span className="italic">in action.</span>
                </h2>

                <p className="ks-muted mt-7 max-w-[550px] text-[15px] leading-7">
                  Prefer a walkthrough? Schedule a focused conversation with an
                  ESG specialist and explore the platform in context.
                </p>

                <div className="mt-11 grid border-y border-white/15 sm:grid-cols-3">
                  <div className="py-6">
                    <div className="text-3xl font-serif">30</div>
                    <div className="ks-muted mt-2 font-mono text-[8px] uppercase tracking-[0.16em]">
                      Minutes
                    </div>
                  </div>

                  <div className="border-t border-white/15 py-6 sm:border-l sm:border-t-0 sm:pl-6">
                    <div className="text-3xl font-serif">01</div>
                    <div className="ks-muted mt-2 font-mono text-[8px] uppercase tracking-[0.16em]">
                      ESG specialist
                    </div>
                  </div>

                  <div className="border-t border-white/15 py-6 sm:border-l sm:border-t-0 sm:pl-6">
                    <div className="text-3xl font-serif">01</div>
                    <div className="ks-muted mt-2 font-mono text-[8px] uppercase tracking-[0.16em]">
                      Platform walkthrough
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:pl-10">
                <div className="border-l border-white/20 pl-6">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em]">
                    Meeting invitation
                  </div>

                  <div className="mt-5 space-y-5">
                    {[
                      "Understand your context",
                      "Walk through the platform",
                      "Discuss the right approach",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 border-b border-white/10 pb-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/25 font-mono text-[9px]">
                          0{index + 1}
                        </span>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#schedule-demo"
                    id="schedule-demo"
                    className="mt-9 group inline-flex items-center gap-3 border border-white/30 bg-[#b58a49] px-6 py-4 text-sm font-semibold !text-[#fffdf5] transition-all duration-300 hover:bg-[#c79c58]"
                  >
                    Schedule Demo
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1 !text-[#fffdf5]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          04 — CONTACT REGISTRY
      ========================================================= */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <motion.div {...reveal}>
              <SectionMarker number="04" label="Direct contact" />

              <h2 className="font-serif text-[clamp(3rem,4.8vw,5rem)] leading-[0.92] tracking-[-0.055em]">
                Contact
                <br />
                <span className="italic text-[#54745f]">Registry.</span>
              </h2>

              <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#687770]">
                Direct lines for the next conversation, presented simply and
                clearly.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{
                ...(reveal.transition || {}),
                delay: 0.1,
              }}
            >
              <div className="border-y border-[#173d31]/12">
                {directContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-center justify-between gap-6 border-b border-[#173d31]/10 py-7 last:border-b-0"
                  >
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8c7958]">
                        {contact.label}
                      </div>

                      <div className="mt-3 text-[18px] text-[#17342a] transition-colors duration-300 group-hover:text-[#8b6935]">
                        {contact.value}
                      </div>
                    </div>

                    <ChevronRight
                      size={17}
                      strokeWidth={1.2}
                      className="text-[#b58a49] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                ))}
              </div>

              <div className="mt-8 border border-[#173d31]/10 bg-[#eef0e7] p-6">
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.17em] text-[#7e6b4c]">
                  <MapPin size={14} strokeWidth={1.3} />
                  India / Karnataka / Bengaluru
                </div>

                <div className="mt-6 flex items-end justify-between gap-6">
                  <div>
                    <div className="font-serif text-3xl tracking-[-0.03em]">
                      Bengaluru
                    </div>
                    <div className="mt-1 text-sm text-[#748079]">
                      Karnataka, India
                    </div>
                  </div>

                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#969a91]">
                    Office / India
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#b58a49]" />
                  <span className="h-px flex-1 bg-[#b58a49]/35" />
                  <span className="h-2 w-2 rounded-full border border-[#b58a49]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05 — WHAT HAPPENS NEXT
      ========================================================= */}
      <section className="border-y border-[#173d31]/10 bg-[#edf0e7] px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1180px]">
          <motion.div {...reveal} className="max-w-[680px]">
            <SectionMarker number="05" label="Next step" />

            <h2 className="font-serif text-[clamp(3.1rem,5.6vw,6rem)] leading-[0.88] tracking-[-0.06em]">
              What happens
              <br />
              <span className="italic text-[#54745f]">next?</span>
            </h2>
          </motion.div>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-[#173d31]/12 md:block" />

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 right-0 top-6 hidden h-px bg-[#b58a49] md:block"
            />

            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {journey.map((step, index) => (
                <motion.div
                  key={step.number}
                  {...reveal}
                  transition={{
                    ...(reveal.transition || {}),
                    delay: index * 0.12,
                  }}
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-[#b58a49]/45 bg-[#edf0e7] font-mono text-[10px] text-[#8c7958]">
                    {step.number}
                  </div>

                  <div className="mt-7 border-t border-[#173d31]/10 pt-6">
                    <h3 className="font-serif text-3xl tracking-[-0.035em]">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-[300px] text-[14px] leading-6 text-[#687770]">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          06 — TRUST / CONTEXT
      ========================================================= */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-24">
            <motion.div {...reveal}>
              <SectionMarker number="06" label="Institutional context" />

              <h2 className="font-serif text-[clamp(3rem,4.8vw,5rem)] leading-[0.91] tracking-[-0.055em]">
                Designed for
                <br />
                <span className="italic text-[#54745f]">serious work.</span>
              </h2>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{
                ...(reveal.transition || {}),
                delay: 0.1,
              }}
            >
              <p className="max-w-[690px] text-[15px] leading-7 text-[#62726b]">
                The conversation can span frameworks, reporting, compliance,
                data governance, enterprise readiness, and sustainability
                intelligence — the practical context behind the KSynapse
                experience.
              </p>

              <div className="mt-9 grid grid-cols-2 border-t border-[#173d31]/12 sm:grid-cols-3">
                {trustItems.map((item, index) => (
                  <div
                    key={item}
                    className="border-b border-[#173d31]/12 py-5 pr-5 sm:nth-[3n+2]:border-l sm:nth-[3n+2]:pl-5"
                  >
                    <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#9b8460]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-2 text-sm font-medium text-[#29483c]">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL INVITATION
          This is intentionally NOT a footer.
          It is the final page section.
          Again, every descendant is forced light.
      ========================================================= */}
      <section className="ks-dark-panel relative overflow-hidden bg-[#123b2e] px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
            `,
            backgroundSize: "82px 82px",
          }}
        />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            {...reveal}
            className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em]">
                KSynapse / Contact
              </div>

              <h2 className="mt-5 max-w-[800px] font-serif text-[clamp(3.4rem,6.2vw,7rem)] leading-[0.87] tracking-[-0.06em]">
                Start with a
                <br />
                <span className="italic">conversation.</span>
              </h2>

              <p className="ks-muted mt-7 max-w-[560px] text-[15px] leading-7">
                No noise. No unnecessary ceremony. Just a considered first
                conversation about what you&apos;re trying to accomplish.
              </p>
            </div>

            <a
              href="mailto:hello@ksynapse.com"
              className="group inline-flex w-fit items-center gap-3 border border-white/35 px-6 py-4 text-sm font-semibold !text-[#fffdf5] transition-all duration-300 hover:bg-white hover:!text-[#123b2e]"
            >
              hello@ksynapse.com
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 !text-inherit"
              />
            </a>
          </motion.div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 font-mono text-[8px] uppercase tracking-[0.16em]">
            <span>CONTACT / 01</span>
            <span>MESSAGE / 02</span>
            <span>DEMO / 03</span>
            <span>DIRECT CONTACT / 04</span>
            <span>NEXT STEP / 05</span>
          </div>
        </div>
      </section>
    </main>
  );
}
