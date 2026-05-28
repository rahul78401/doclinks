import { createFileRoute } from "@tanstack/react-router";
import { TestTube2 } from "lucide-react";
import { TabPlaceholder } from "@/components/TabPlaceholder";

export const Route = createFileRoute("/_tabs/lab-tests")({
  component: () => (
    <TabPlaceholder
      icon={TestTube2}
      title="Lab Tests"
      description="Compare popular lab tests and reach out to NABL-accredited labs around you."
    />
  ),
});
