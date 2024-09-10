"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from '../_components/Cart'

function Header() {
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    CartApis.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        res?.data?.data.forEach((citem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: citem.id,
              product: citem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };

  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    !isLoggedIn && (
      <header className="bg-bgcolor1 dark:bg-gray-900">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <Image src="/logo.svg" alt="logo" width={100} height={100} /> {/* Logo */}
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary dark:hover:bg-secondary"
                    href="/sign-in"
                  >
                    Login
                  </a>
                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-secondary sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-5 text-gray-300 ">
                  <h2 className="flex gap-1 cursor-pointer">
                    <ShoppingCart className="text-gray-300" onClick={() => setOpenCart(!openCart)} /> ({cart?.length})
                  </h2>
                  <UserButton />
                  {openCart && <Cart />}
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                className="block rounded bg-[#242424] p-2.5 text-gray-300 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Add this below the toggle button */}
        {isMobileMenuOpen && (
          <nav className="absolute right-4 mt-2 w-48 bg-[#2b2b2b] text-white shadow-lg rounded-lg z-50">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="/" className="block text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="#" className="block text-gray-300 hover:text-white">
                  Explore
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="#" className="block text-gray-300 hover:text-white">
                  Courses
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="#" className="block text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="#" className="block text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    )
  );
}

export default Header;
