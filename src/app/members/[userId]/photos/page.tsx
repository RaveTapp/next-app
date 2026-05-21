import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { Card, Separator } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const photos = await getMemberPhotosByUserId(userId);

  if (!photos) return notFound();
  return (
    <>
      <Card.Header className="text-2xl font-semibold text-secondary">
        Photos
      </Card.Header>
      <Separator />
      <Card.Content>
        {" "}
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  width={300}
                  height={300}
                  sizes="300px"
                  unoptimized
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square rounded-2xl"
                />
              </div>
            ))}
        </div>
      </Card.Content>
    </>
  );
}
