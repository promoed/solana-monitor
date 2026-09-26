import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NAV_ITEMS = [
  { label: "Features", dropdown: true },
  { label: "Solutions" },
  { label: "Plans" },
  { label: "Learning", dropdown: true },
];

export function Navbar() {
  return (
    <header className="relative z-10">
      <nav className="flex w-full items-center justify-between px-8 py-5">
        <a href="/" aria-label="Home">
          <img src={logo} alt="Power AI" style={{ height: 32 }} />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button className="flex items-center gap-1 text-sm text-foreground/90 transition-colors hover:text-foreground">
                {item.label}
                {item.dropdown && <ChevronDown className="h-4 w-4 opacity-70" />}
              </button>
            </li>
          ))}
        </ul>

        <Button variant="heroSecondary" size="none" className="rounded-full px-4 py-2">
          Sign Up
        </Button>
      </nav>
      <div className="mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </header>
  );
}
