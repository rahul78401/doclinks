import { createFileRoute } from "@tanstack/react-router";
import { Hospital } from "lucide-react";
import { TabPlaceholder } from "@/components/TabPlaceholder";

export const Route = createFileRoute("/_tabs/hospitals")({
  component: () => (
    <TabPlaceholder
      icon={Hospital}
      title="Hospitals"
      description="Browse verified multi-specialty hospitals near you, with transparent contact details."
    />
  ),
});
