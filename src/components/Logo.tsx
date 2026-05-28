import logo from "@/assets/doclinks-logo.png";

export function Logo({ className = "h-7" }: { className?: string }) {
  return <img src={logo} alt="DocLinks" className={`${className} w-auto object-contain`} />;
}
