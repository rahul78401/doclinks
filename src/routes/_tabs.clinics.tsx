import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { TabPlaceholder } from "@/components/TabPlaceholder";

export const Route = createFileRoute("/_tabs/clinics")({
  component: () => (
    <TabPlaceholder
      icon={Building2}
      title="Clinics"
      description="Discover trusted neighborhood clinics, verified by DocLinks."
    />
  ),
});
