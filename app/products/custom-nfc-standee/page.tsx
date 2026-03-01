"use client";

import { useState } from "react";

const images = ["/images/Standee.jpg"];

export default function CustomNfcStandeePage() {
  const [selectedImage] = useState(images[0]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* IMAGE */}
        <div>
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-10 rounded-3xl shadow-2xl flex items-center justify-center border border-neutral-700">
            <img
              src={selectedImage}
              alt="Custom NFC Standee"
              className="max-h-[420px] object-contain"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-[#FACC15] font-semibold uppercase mb-3 tracking-wider">
            Business Display
          </p>

          <h1 className="text-4xl font-bold mb-6">Custom NFC Standee</h1>

          <p className="text-3xl font-semibold mb-6">Price On Request</p>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Perfect for reception desks, counters, retail shops, and events. Let
            customers tap or scan and instantly access your digital profile,
            promotions, or contact details.
          </p>

          {/* FEATURES */}
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span className="text-[#FACC15]">✔</span>
              Premium Acrylic or PVC Build
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#FACC15]">✔</span>
              Custom Branding & Design
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#FACC15]">✔</span>
              NFC + QR Code Enabled
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#FACC15]">✔</span>
              Ideal for Shops & Events
            </li>
          </ul>

          {/* BUTTON */}
          <a
            href="https://wa.me/94719550343?text=Hello%20Casknet,%20I%20am%20interested%20in%20the%20Custom%20NFC%20Standee."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#FACC15] text-black py-4 px-8 rounded-xl font-semibold hover:bg-yellow-400 transition-all">
              Contact Us →
            </button>
          </a>
        </div>
      </div>

      {/* ================= BUSINESS MESSAGE SECTION ================= */}
      <section className="border-t border-neutral-800 py-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Turn Every Visitor Into A Digital Connection
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Place your NFC Standee at your front desk or event booth and allow
          customers to instantly connect with your business digitally — no
          paper, no hassle.
        </p>
      </section>
    </div>
  );
}
