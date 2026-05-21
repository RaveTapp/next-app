import { getMemberByUserId } from "@/app/actions/memberActions";
import { Card, Separator } from "@heroui/react";
import { notFound } from "next/navigation";

export default async function MemberChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();
  return (
    <>
      <Card.Header className="text-2xl font-semibold text-secondary">
        Chat
      </Card.Header>
      <Separator />
      <Card.Content>Chat goes here</Card.Content>
    </>
  );
}
