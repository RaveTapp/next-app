import { Link, Button } from "@heroui/react";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";

export default async function TopNav() {
  const session = await auth();

  const navLinks = [
    { label: "Members", href: "/members" },
    { label: "Lists", href: "/lists" },
    { label: "Messages", href: "/messages" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-linear-to-r from-purple-400 to-purple-700 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold no-underline">
            NextApp
          </Link>
        </div>
        <div className="">
          <ul className="flex items-center gap-8">
            {navLinks.map((x) => {
              return <NavLink href={x.href} label={x.label} key={x.label} />;
            })}
          </ul>
        </div>
        <div className="">
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <ul className="flex items-center gap-4">
              <li>
                <Link href="login" className="no-underline">
                  <Button variant="outline" className="text-white">
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="register" className="no-underline">
                  <Button variant="outline" className="text-white">
                    Register
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
    </nav>
  );
}
