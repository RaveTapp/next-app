"use client";

import { Tabs } from "@heroui/react";
import { Member } from "../../../prisma/src/generated/prisma/client";
import MemberCard from "../members/MemberCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};

export default function ListsTab({ members, likeIds }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentTab = searchParams.get("type") || "source";

  const tabs = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members that like me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  const handleTabChange = (id: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", id);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex w-full flex-col mt-2 gap-5">
      <Tabs
        variant="secondary"
        selectedKey={currentTab}
        onSelectionChange={(key) => handleTabChange(key as string)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Like tabs">
            {tabs.map((tab) => (
              <Tabs.Tab id={tab.id} key={tab.id}>
                {tab.label}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {tabs.map((tab) => (
          <Tabs.Panel className="pt-4" id={tab.id} key={tab.id}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground py-4">
                    No members found for this filter
                  </div>
                )}
              </>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
