import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/_tabs")({
  component: TabsLayout,
});

function TabsLayout() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader />
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
