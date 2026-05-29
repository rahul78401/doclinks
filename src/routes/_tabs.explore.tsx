import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { TabPlaceholder } from "@/components/TabPlaceholder";

export const Route = createFileRoute("/_tabs/explore")({
  component: () => (
    <TabPlaceholder
      icon={User}
      title="Account"
      description="Manage your saved doctors, contact history, and DocLinks preferences."
    />
  ),
});
