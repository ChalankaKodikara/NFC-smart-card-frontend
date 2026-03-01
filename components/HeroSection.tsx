"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Floating Background Dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-float-1"
          style={{ top: "10%", left: "10%" }}
        />
        <div
          className="absolute w-3 h-3 bg-amber-400/30 rounded-full animate-float-2"
          style={{ top: "20%", left: "80%" }}
        />
        <div
          className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-float-3"
          style={{ top: "60%", left: "15%" }}
        />
        <div
          className="absolute w-4 h-4 bg-amber-400/20 rounded-full animate-float-1"
          style={{ top: "70%", left: "85%" }}
        />
        <div
          className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-float-2"
          style={{ top: "30%", left: "50%" }}
        />
        <div
          className="absolute w-3 h-3 bg-amber-400/20 rounded-full animate-float-3"
          style={{ top: "80%", left: "40%" }}
        />
        <div
          className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-float-1"
          style={{ top: "40%", left: "70%" }}
        />
        <div
          className="absolute w-3 h-3 bg-amber-400/20 rounded-full animate-float-2"
          style={{ top: "50%", left: "25%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-8">
          <span className="text-sm font-medium text-gray-700">
            NFC Digital Business Solutions
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Smart NFC Business Cards by{" "}
          <span className="text-[#EAB308]">Casknet</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform traditional business cards into interactive digital
          experiences. Share your profile instantly with NFC tap or QR scan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* SIGN IN BUTTON */}
          <button
            onClick={() => router.push("/login")}
            className="group px-8 py-4 bg-[#EAB308] text-white rounded-xl font-semibold shadow-lg hover:bg-[#D97706] transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* LEARN MORE BUTTON */}
          <button
            onClick={() => router.push("#features")}
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
