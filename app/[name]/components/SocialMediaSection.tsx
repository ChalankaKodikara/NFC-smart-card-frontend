"use client";

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

type Props = {
  links?: SocialLink[];
};

export default function SocialMediaSection({ links }: Props) {
  if (!links || links.length === 0) return null;

  const iconMap: Record<string, React.ReactNode> = {
    linkedin: <FaLinkedinIn />,
    github: <FaGithub />,
    instagram: <FaInstagram />,
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    website: <FaGlobe />,
  };

  const socialItems = links
    .map((item) => ({
      platform: item.platform.toLowerCase(),
      url: item.url,
    }))
    .filter((item) => iconMap[item.platform]);

  if (socialItems.length === 0) return null;

  return (
    <div className="w-full mt-4">
      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[28px] p-6 space-y-4">
          {socialItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-700">
                  {iconMap[item.platform]}
                </div>
                <span className="capitalize text-gray-800 font-medium">
                  {item.platform}
                </span>
              </div>
              <span className="text-sm text-gray-400">Visit →</span>
            </a>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex justify-center items-center py-8">
        <div className="flex gap-12">
          {socialItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 text-gray-700 group-hover:text-black text-xl">
                {iconMap[item.platform]}
              </div>

              <span className="capitalize text-sm text-gray-600 group-hover:text-black transition">
                {item.platform}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
