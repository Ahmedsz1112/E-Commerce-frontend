"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
  Button,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCart } from "../context/Cart/CartContext";
import SearchPage from "../ui/search";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search , setSearch] = useState(false)
  const { cartItems } = useCart();
  const { username, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => router.push("/login");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handelSearch = () => {
    setSearch(prev => !prev);
  }

  const avatarUrl =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className="bg-white">
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative w-full max-w-xs flex flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-4">
              {isAuthenticated ? (
                <Popover className="relative">
                  <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                    <img
                      alt={username}
                      src={avatarUrl}
                      className="h-6 w-6 rounded-full ring-2 ring-white"
                    />
                    <span className="text-sm text-gray-700">
                      Welcome, {username}
                    </span>
                    <ChevronDownIcon className="h-5 w-5" />
                  </PopoverButton>

                  <PopoverPanel className="absolute left-1/2 mt-5 w-48 -translate-x-1/2 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 p-4 text-sm">
                    <Link
                      href="/myorder"
                      className="block hover:bg-gray-50 p-1"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left hover:bg-gray-50 p-1"
                    >
                      Logout
                    </button>
                  </PopoverPanel>
                </Popover>
              ) : (
                <Button
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 text-sm font-medium text-white">
          Get free delivery on orders over $100
        </p>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                onClick={() => setOpen(true)}
                className="p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <Link href="/" className="ml-4 flex lg:ml-0">
                <img
                  src="https://as1.ftcdn.net/jpg/02/49/82/50/1000_F_249825007_f5dzNTBuUZoV5nERUWTlPDoU3cvLIBzn.webp"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </Link>

              <PopoverGroup className="hidden lg:ml-8 lg:flex space-x-8">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {label}
                  </Link>
                ))}
              </PopoverGroup>

              <div className="ml-auto flex items-center space-x-4">
                {isAuthenticated ? (
                  <Popover className="relative hidden lg:block">
                    <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                      <img
                        alt={username}
                        src={avatarUrl}
                        className="h-6 w-6 rounded-full ring-2 ring-white"
                      />
                      <span className="text-sm text-gray-700">
                        Welcome, {username}
                      </span>
                      <ChevronDownIcon className="h-5 w-5" />
                    </PopoverButton>

                    <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 p-4 text-sm">
                      <Link
                        href="/myorder"
                        className="block hover:bg-gray-50 p-1"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left hover:bg-gray-50 p-1"
                      >
                        Logout
                      </button>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Button
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}

                <button
                  onClick={handelSearch}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>

                <Link href="/cart" className="flex items-center p-2 group">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItems.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {search && <SearchPage/>}
      </header>
    </div>
  );
}
