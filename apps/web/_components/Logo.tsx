import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="logo"
        src="/logo.png"
        width={25}
        height={12.5}
        priority
        fetchPriority="high"
        unoptimized
      />
    </Link>
  );
}
