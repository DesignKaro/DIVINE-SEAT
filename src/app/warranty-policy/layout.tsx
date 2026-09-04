import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty & Damaged Products Policy  - Divine Lotus",
  description:
    "Review our Warranty & Damaged Products Policy covering manufacturing defects, transit damage, natural materials, and claim resolutions.",
  alternates: {
    canonical: "/warranty-policy",
  },
  openGraph: {
    title: "Warranty & Damaged Products Policy | Divine Lotus",
    description:
      "Review our Warranty & Damaged Products Policy covering manufacturing defects, transit damage, natural materials, and claim resolutions.",
    url: "/warranty-policy",
  },
};

export default function WarrantyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
