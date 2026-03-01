"use client";

import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#EAB308] to-[#D97706]">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to upgrade your business card?
        </h2>

        <p className="text-xl text-amber-50 mb-10 max-w-2xl mx-auto">
          Join professionals across Sri Lanka who are making powerful first
          impressions with Casknet NFC digital business cards.
        </p>

        <a
          href="https://wa.me/94719550343?text=Hello%20Casknet,%20I%20would%20like%20to%20get%20a%20SMART%20NFC%20Business%20Card."
          target="_blank"
          rel="noopener noreferrer"
          className="group px-10 py-5 bg-white text-[#EAB308] rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-3 mx-auto"
        >
          <FaWhatsapp className="text-green-500 text-xl" />
          Contact Us to Get Yours
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </section>
  );
}