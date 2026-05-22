"use client";

import LikeButton from "@/components/LikeButton";
import { Member } from "../../../prisma/src/generated/prisma/client";
import { Card, Link } from "@heroui/react";
import Image from "next/image";

type Props = {
  member: Member;
  likeIds: string[];
};

export default function MemberCard({ member, likeIds }: Props) {
  const imageSrc =
    member.image && member.image.trim() !== ""
      ? member.image
      : "/images/user.png";

  const hasLiked = likeIds.includes(member.userId);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card className="relative overflow-hidden p-0">
      <Link href={`/members/${member.userId}`} className="block w-full h-full">
        <div className="relative w-full aspect-square">
          <Image
            alt={member.name || "Member image"}
            sizes="300px"
            fill
            unoptimized
            src={imageSrc}
            className="object-cover hover:scale-110"
          />
        </div>
        <div onClick={preventLinkAction}>
          <div className="absolute top-3 right-3 z-50">
            <LikeButton targetId={member.userId} hasLiked={hasLiked} />
          </div>
        </div>
        <Card.Footer className="flex w-full justify-center bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
          <div className="flex flex-col text-white">
            <span className="font-semibold text-center">{member.name}</span>
            <span className="text-sm text-center">from {member.city}</span>
          </div>
        </Card.Footer>
      </Link>
    </Card>
  );
}
