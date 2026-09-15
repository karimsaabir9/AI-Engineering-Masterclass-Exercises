"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
];

function Header() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const path = usePathname();
  console.log(path);

  const initial = (
    user?.firstName ||
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "U"
  )
    .charAt(0)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="logo" width={30} height={36} />
          <h2 className="font-bold text-xl sm:text-2xl">AI Trip Planner</h2>
        </div>

        {/* Menu Options */}
        <div className="hidden md:flex gap-8 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="flex gap-3 sm:gap-5 items-center">
          <div className="hidden md:block">
            {!user ? (
              <SignInButton mode="modal">
                <Button>Get Started</Button>
              </SignInButton>
            ) : path === "/create-new-trip" ? (
              <Link href={"/my-trips"}>
                <Button>My Trips</Button>
              </Link>
            ) : (
              <Link href={"/create-new-trip"}>
                <Button>Create New trip</Button>
              </Link>
            )}
          </div>

          {user && (
            <>
              {/* Visual separator between site navigation and account controls */}
              <div
                className="md:hidden w-px h-6 bg-gray-200"
                aria-hidden="true"
              />

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Open user account menu"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  className="w-11 h-11 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center hover:opacity-90 active:scale-95 transition"
                >
                  {initial}
                </button>

                <div
                  role="menu"
                  aria-label="User account"
                  className={`absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg py-2 z-50 origin-top-right transition duration-150 ease-out ${
                    menuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {user?.fullName || user?.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="border-t my-1">
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        openUserProfile();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Manage account
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label={
              mobileNavOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-haspopup="true"
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          mobileNavOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 pb-2">
          {menuOptions.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              onClick={() => setMobileNavOpen(false)}
            >
              <h2 className="text-lg hover:text-primary">{menu.name}</h2>
            </Link>
          ))}
          {!user ? (
            <SignInButton mode="modal">
              <Button className="w-full">Get Started</Button>
            </SignInButton>
          ) : path == "/create-new-trip" ? (
            <Link
              href={"/my-trips"}
              onClick={() => setMobileNavOpen(false)}
            >
              <Button className="w-full">My Trips</Button>
            </Link>
          ) : (
            <Link
              href={"/create-new-trip"}
              onClick={() => setMobileNavOpen(false)}
            >
              <Button className="w-full">Create New trip</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
