"use client";

import { usePathname } from "next/navigation";
import { Link } from "@heroui/react";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;
  return (
    <li>
      <Link href={href} className={isActive ? "text-yellow-400 font-bold" : ""}>
        {label}
      </Link>
    </li>
  );
}
