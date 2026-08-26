import type { Metadata } from "next";
import AssessmentPage from "./AssessmentPage";

export const metadata: Metadata = {
  title: "ESG Maturity Assessment",
  description:
    "Discover your organization's ESG maturity in minutes. Get a personalized score, benchmark against your industry, and receive AI-powered recommendations.",
};

export default function Page() {
  return <AssessmentPage />;
}
