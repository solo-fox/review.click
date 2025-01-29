import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="flex items-center justify-between px-2 py-2 w-full border-t bg-background">
      <div className="flex items-center gap-4 text-zinc-400">
        <Logo />
        <Link className="hover:text-foreground" href="/">
          Home
        </Link>
        <Link className="hover:text-foreground" href="/">
          Docs
        </Link>
        <Link className="hover:text-foreground" href="/">
          Help
        </Link>
        <Link className="hover:text-foreground" href="/">
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <div className="bg-green-500 rounded-full size-2"></div>
          <p className="text-green-500 font-semibold">
            All systems oprational.
          </p>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
