"use client";

import Link from "next/link";

export default function ProductSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#FACC15] uppercase tracking-widest mb-4">
            Revolutionize Your Networking
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Smart NFC Business Cards
          </h2>

          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Modern networking made simple. Tap your NFC card or scan the QR code
            to instantly share your digital profile — no apps required.
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductCard
            title="Custom NFC Card"
            price="LKR 4,500"
            image="https://chhapai.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/03/27162823/Custom-Cards.gif"
            link="/products/custom-nfc-card"
          />

          <ProductCard
            title="Metal NFC Card"
            price="To Be Announced"
            image="/images/METLE.jpg"
            link="/products/metal-nfc-card"
          />

          <ProductCard
            title="Custom NFC Standee"
            price="To Be Announced"
            image="/images/Standee.jpg"
            link="/products/custom-nfc-standee"
          />
        </div>
      </div>
    </section>
  );
}

/* ================= REUSABLE PRODUCT CARD ================= */

function ProductCard({
  title,
  price,
  image,
  link,
}: {
  title: string;
  price: string;
  image: string;
  link: string;
}) {
  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* IMAGE */}
      <div className="relative h-64 bg-[#FFF9E6] flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[400px] object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FACC15]/10 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-3 py-1 bg-[#FACC15]/20 text-black rounded-full">
            Custom Product
          </span>
          <span className="text-xs px-3 py-1 bg-black text-white rounded-full">
            NFC
          </span>
        </div>

        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>

        <p className="text-black font-medium mb-4">{price}</p>

        {/* LINK BUTTON */}
        <Link href={link}>
          <button className="w-full py-3 border border-black text-black rounded-xl font-medium hover:bg-[#FACC15] hover:border-[#FACC15] transition-all">
            View Product →
          </button>
        </Link>
      </div>
    </div>
  );
}
