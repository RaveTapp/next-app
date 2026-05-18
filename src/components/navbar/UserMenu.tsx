"use client";

import { Session } from "next-auth";
import { Dropdown, Header, Separator, Avatar, Label } from "@heroui/react";
import { signOutUser } from "@/app/actions/authActions";

type Props = {
  user: Session["user"];
};

export default function UserMenu({ user }: Props) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar className="transition-transform" size="sm">
          <Avatar.Image
            alt="user avatar"
            src={user?.image || "/images/user.png"}
          />
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu aria-label="User actions menu">
          <Dropdown.Section>
            <Header />
            <Dropdown.Item>
              <Label>Signed in as {user?.name}</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Item href="/members/edit">
            <Label>Edit Profile</Label>
          </Dropdown.Item>
          <Separator />
          <Dropdown.Item variant="danger" onClick={async () => signOutUser()}>
            <Label>Log out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
