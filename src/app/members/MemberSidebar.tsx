'use client'

import { Button, Card, Link, Separator } from "@heroui/react";
import { Member } from "../../../prisma/src/generated/prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  member: Member;
};

export default function MemberSidebar({ member }: Props) {
  const pathname = usePathname();
  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];
  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        width={200}
        height={200}
        sizes="200px"
        src={member.image || "/images/user.png"}
        unoptimized
        loading="eager"
        alt="User profile main image"
        className="rounded-full, mt-6, aspect-square object-cover"
      />
      <Card.Content className="w-full">
        <div className="flex flex-col items-center">
          <div className="text-2xl">{member.name}</div>
        </div>
        <div className="text-sm text-neutral-500 text-center">
          {member.city}, {member.country}
        </div>
        <Separator className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`block no-underline rounded ${pathname === link.href ? "text-secondary" : "hover:text-secondary/50"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </Card.Content>
      <Card.Footer>
        <Button>
          <Link href="/members" className="w-full via-surface-secondary no-underline">
            Go back
          </Link>
        </Button>
      </Card.Footer>
    </Card>
  );
}
