"use client";

import { useEffect, useState } from "react";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

type SocialLink = {
  platform: string;
  url: string;
};

type PersonalProps = {
  name: string;
  slogan: string;
  bio: string;
  profileImage?: string;
  slug: string;
};

export default function PersonalSection({
  name,
  slogan,
  bio,
  profileImage,
  slug,
}: PersonalProps) {
  const firstName = name?.split(" ")[0] || "";
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  /* ================= FETCH SOCIAL LINKS ================= */
  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/${slug}`,
        );

        if (!res.ok) return;

        const json = await res.json();

        if (json?.success && json?.data?.social?.links) {
          setSocialLinks(json.data.social.links);
        }
      } catch (error) {
        console.error("Social fetch error:", error);
      }
    };

    if (slug) fetchSocial();
  }, [slug]);

  /* ================= ICON MATCHER ================= */
  const getIcon = (platform: string) => {
    const p = platform?.toLowerCase().trim();

    if (p.includes("linkedin")) return <FaLinkedinIn />;
    if (p.includes("github")) return <FaGithub />;
    if (p.includes("instagram")) return <FaInstagram />;
    if (p.includes("facebook")) return <FaFacebookF />;
    if (p.includes("twitter") || p.includes("x")) return <FaTwitter />;
    if (p.includes("website") || p.includes("web")) return <FaGlobe />;

    return null;
  };

  return (
    <div className="pt-10 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-black" />
            <span className="font-medium text-lg">{name}</span>

            <div className="flex items-center gap-2 text-green-600 ml-6">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-light">Available</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {profileImage && (
              <img
                src={profileImage}
                alt={name}
                className="w-[70px] h-[70px] rounded-full object-cover shadow-md"
              />
            )}

            <div>
              <h2 className="text-lg font-semibold text-black">{name}</h2>
              <p className="text-gray-500 font-light text-sm">{slogan}</p>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
            Hi, I'm {firstName}
            <br />
            {/* <span className="text-gray-700 font-light text-2xl md:text-3xl">
              {slogan}
            </span> */}
          </h1>

          {/* Bio */}
          <p className="text-gray-600 leading-relaxed max-w-xl">{bio}</p>

          {/* Profile + Social */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6">
            {/* Profile */}

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.length > 0 &&
                socialLinks.map((item, index) => {
                  const icon = getIcon(item.platform);
                  if (!icon) return null;

                  return (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-black hover:-translate-y-1"
                    >
                      {icon}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        {profileImage && (
          <div className="rounded-[32px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-[450px] md:h-[600px] object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
