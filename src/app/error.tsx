"use client";
import { Button, Card } from "@heroui/react";
import { BiSolidError } from "react-icons/bi";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto">
        <Card.Header className="flex flex-col items-center justify-center">
          <div className="flex flex-row gap-2 items-center text-secondary">
            <BiSolidError size={30} />
            <h1 className="text-3xl font-semibold">Error</h1>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center text-danger">{error.message}</div>
        </Card.Content>
        <Card.Footer className="flex justify-center">
          <Button onClick={() => unstable_retry()}>Try Again</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
