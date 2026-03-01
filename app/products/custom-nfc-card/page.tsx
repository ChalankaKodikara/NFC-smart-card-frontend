"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const images = [
  "https://chhapai.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/03/27162823/Custom-Cards.gif",
];

const comparisonData = [
  { feature: "Custom Design", casknet: true, paper: true },
  { feature: "One-Time Purchase", casknet: true, paper: false },
  { feature: "Update Info Anytime", casknet: true, paper: false },
  { feature: "Cost-Effective", casknet: true, paper: false },
  { feature: "Eco Friendly", casknet: true, paper: false },
  { feature: "Real-Time Analytics", casknet: true, paper: false },
  { feature: "Endlessly Reusable", casknet: true, paper: false },
];

export default function CustomNfcCardPage() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* IMAGE */}
        <div>
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <img
              src={selectedImage}
              alt="Custom NFC Card"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <p className="text-[#FACC15] text-sm mb-2 uppercase font-semibold">
            Smart Business Card
          </p>

          <h1 className="text-4xl font-bold mb-4">Custom NFC Card</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-[#FACC15] fill-[#FACC15]"
              />
            ))}
            <span className="text-gray-400 text-sm">
              Based on 1000+ reviews
            </span>
          </div>

          <p className="text-3xl font-semibold mb-6">LKR 4,500</p>

          <p className="text-gray-400 mb-6">
            Standard production time: 5–7 working days
          </p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/94719550343?text=Hello%20Casknet,%20I%20am%20interested%20in%20the%20Custom%20NFC%20Card."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#FACC15] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
              Get Yours Now →
            </button>
          </a>

          {/* Feature Boxes */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <FeatureBox title="Your Design" />
            <FeatureBox title="Eco Friendly" />
            <FeatureBox title="Easy Setup" />
          </div>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="text-center py-24 px-6 border-t border-neutral-800">
        <h2 className="text-4xl font-bold mb-6">
          The Only Business Card You'll Ever Need
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Share your contact details instantly with just one tap. Modern
          networking powered by Casknet NFC technology.
        </p>

        <a
          href="https://wa.me/94719550343?text=Hello%20Casknet,%20I%20am%20interested%20in%20the%20Custom%20NFC%20Card."
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#FACC15] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
            Get Yours Now →
          </button>
        </a>
      </section>

      {/* ================= 3 STEPS ================= */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center border-t border-neutral-800">
        <h3 className="text-3xl font-bold mb-16">
          3 Simple Steps to Share Your Info Instantly
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <StepCard step="Step 1" title="Order Your Card" />
          <StepCard step="Step 2" title="Set Up Your Profile" />
          <StepCard step="Step 3" title="Start Networking" />
        </div>
      </section>

      {/* ================= UPGRADE SECTION ================= */}
      <section className="py-24 max-w-6xl mx-auto px-6 border-t border-neutral-800">
        <h3 className="text-3xl font-bold text-center mb-16">
          Why Upgrade to NFC?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard title="Time-Saving" />
          <InfoCard title="Update On The Go" />
          <InfoCard title="Memorable First Impression" />
          <InfoCard title="Compatible by Default" />
          <InfoCard title="Cost-Efficient" />
          <InfoCard title="Eco Friendly" />
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center border-t border-neutral-800">
        <h3 className="text-3xl font-bold mb-12">One Card That Does It All</h3>

        <div className="grid grid-cols-3 gap-6 text-left">
          <div></div>
          <div className="font-semibold text-[#FACC15]">Casknet NFC Card</div>
          <div className="font-semibold text-gray-400">Paper Cards</div>

          {comparisonData.map((item, i) => (
            <div key={i} className="contents">
              <div className="text-gray-400">{item.feature}</div>
              <div className="text-[#FACC15]">{item.casknet ? "✔" : "✖"}</div>
              <div className="text-gray-400">{item.paper ? "✔" : "✖"}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FeatureBox({ title }: { title: string }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl text-center border border-neutral-800">
      <p className="font-semibold">{title}</p>
    </div>
  );
}

function StepCard({ step, title }: { step: string; title: string }) {
  return (
    <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
      <p className="text-[#FACC15] mb-4">{step}</p>
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}

function InfoCard({ title }: { title: string }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}
