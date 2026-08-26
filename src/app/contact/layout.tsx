import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Concierge & Studio Support",
  description:
    "Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic posture consultations, or order care.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Concierge | Divine Lotus",
    description:
      "Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic posture consultations, or order care.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
