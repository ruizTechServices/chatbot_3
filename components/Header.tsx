'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <a href="#features" className="text-red-600 hover:underline">
        Features
      </a>
      <a href="/chatbot_basic" className="text-red-600 hover:underline">
        Chatbot
      </a>
      <a href="#pricing" className="text-red-600 hover:underline">
        Pricing
      </a>
      <a href="#faq" className="text-red-600 hover:underline">
        FAQ
      </a>
    </>
  );

  return (
    <header className="relative flex justify-between items-center py-4">
      {/* Logo / title */}
      <div className="flex items-center gap-2">
        <Image
          src="/24Hour-ai-logo-1.png"
          alt="24Hour AI logo"
          width={100}
          height={100}
          className="rounded-lg bg-red-600 p-1"
        />
        <h1 className="text-2xl font-bold text-red-600">24Hour AI</h1>
      </div>

      {/* Desktop nav */}
      <nav className="hidden sm:flex gap-6 items-center">
        <NavLinks />
      </nav>

      {/* Burger button – visible on mobile */}
      <button
        onClick={() => setMenuOpen((p) => !p)}
        className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {/* simple burger icon */}
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile slide-down menu */}
      <nav
        className={clsx(
          'sm:hidden absolute top-full left-0 w-full bg-white shadow-md transition-transform origin-top',
          menuOpen ? 'scale-y-100' : 'scale-y-0'
        )}
      >
        <ul
          className="flex flex-col gap-4 p-4 bg-white"
          onClick={() => setMenuOpen(false)} // close when a link is tapped
        >
          <NavLinks />
        </ul>
      </nav>
    </header>
  );
}
