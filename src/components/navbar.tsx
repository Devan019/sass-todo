"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { IconHome, IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarButton, NavbarLogo, MobileNav, MobileNavHeader,MobileNavMenu,MobileNavToggle } from "./ui/resizable-navbar";
import { useRouter } from "next/navigation";

export const Header= () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="w-4 h-4" />,
    },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full">
              <IconUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.firstName || user.emailAddresses[0].emailAddress}
              </span>
            </div>
          )}
          <NavbarButton
            as="button"
            variant="secondary"
            onClick={handleSignOut}
          >
            <IconLogout className="w-4 h-4" />
            Logout
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <IconHome className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </a>
          
          {user && (
            <div className="w-full px-4 py-3 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-2">
                <IconUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.firstName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <IconLogout className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};