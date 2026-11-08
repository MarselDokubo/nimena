import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ServiceIntro, MetricStrip } from "@/components/institutional-ui";
import { RenewalWorkspace } from "@/app/renewals/renewal-workspace";

export const metadata: Metadata = { title: "Membership renewals" };

export default function RenewalsPage() {
  return (
    <PortalFrame eyebrow="Membership services" title="Renewals & payments">
      <div className="page-stack">
        <ServiceIntro
          eyebrow="Annual membership cycle"
          title="Keep your professional standing active."
          description="Review subscription fees, resolve arrears, pay securely and retain an auditable receipt for every membership cycle."
        />
        <MetricStrip items={[
          { label: "Standing", value: "Active", note: "Graduate Member", icon: "shield" },
          { label: "Next renewal", value: "31 Mar 2027", note: "Renewal window open", icon: "calendar" },
          { label: "Outstanding", value: "₦0", note: "No current arrears", icon: "wallet" },
          { label: "Receipts", value: "2", note: "Available to download", icon: "file" },
        ]} />
        <RenewalWorkspace />
      </div>
    </PortalFrame>
  );
}
