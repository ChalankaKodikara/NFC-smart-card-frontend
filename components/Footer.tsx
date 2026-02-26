"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-[#EAB308] mb-4">Casknet</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your networking experience with smart NFC business
              cards. Share your digital profile instantly with a simple tap.
            </p>

            {/* Contact Icons */}
            <div className="flex gap-4">
              <a
                href="mailto:info@casknet.dev"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#EAB308] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:+94700000000"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#EAB308] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href="https://casknet.dev/contact"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#EAB308] transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://casknet.dev/#features"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/#pricing"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/#how-it-works"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/#faq"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://casknet.dev/about"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/contact"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/privacy-policy"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://casknet.dev/terms"
                  className="hover:text-[#EAB308] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Casknet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
