"use client";

import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <section className="py-28 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* HEADER */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Simple & Transparent Pricing
        </h2>

        <p className="text-gray-500 mb-20">
          Choose the perfect NFC solution for your business.
        </p>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          <PricingCard
            title="Custom NFC Card"
            price="LKR 4,500"
            subtitle="USD 14.58"
            highlight
          />

          <PricingCard
            title="Metal NFC Card"
            price="Price On Request"
            subtitle="Premium Edition"
          />

          <PricingCard
            title="Custom NFC Standee"
            price="Price On Request"
            subtitle="Business Display"
          />

        </div>
      </div>
    </section>
  );
}


/* ================= PRICING CARD ================= */

function PricingCard({
  title,
  price,
  subtitle,
  highlight = false,
}: {
  title: string;
  price: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`rounded-3xl p-10 border transition-all duration-300 shadow-lg
      ${
        highlight
          ? "bg-neutral-900 text-white border-[#FACC15] scale-105"
          : "bg-neutral-900 text-white border-neutral-800 hover:-translate-y-3 hover:shadow-2xl"
      }`}
    >
      {highlight && (
        <div className="mb-4 text-xs uppercase font-semibold text-[#FACC15]">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-semibold mb-6">{title}</h3>

      <p className="text-3xl font-bold mb-3">{price}</p>

      <p className="text-gray-400 mb-10">{subtitle}</p>

      <a
        href="https://wa.me/94719550343"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-full py-3 bg-[#FACC15] text-black font-bold rounded-xl hover:bg-yellow-400 transition-all">
          Contact →
        </button>
      </a>
    </motion.div>
  );
}