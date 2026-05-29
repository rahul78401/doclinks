import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { TabPlaceholder } from "@/components/TabPlaceholder";

export const Route = createFileRoute("/_tabs/explore")({
  component: () => (
    <TabPlaceholder
      icon={Compass}
      title="Explore"
      description="Discover trending specialists, curated health guides and new clinics added on DocLinks."
    />
  ),
});
