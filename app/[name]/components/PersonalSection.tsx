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

type PersonalProps = {
  name?: string;
  slogan?: string;
  bio?: string;
  profileImage?: string;
  socialLinks?: SocialLink[];
};

export default function PersonalSection({
  name = "",
  slogan = "",
  bio = "",
  profileImage,
  socialLinks = [],
}: PersonalProps) {
  const firstName = name?.split(" ")[0] || "";

  /* ================= SAFE CLOUDINARY OPTIMIZER ================= */
  const getOptimizedImage = (url?: string) => {
    if (!url) return null;

    if (url.includes("cloudinary.com")) {
      return url.replace(
        "/upload/",
        "/upload/w_700,h_700,c_fill,q_auto,f_auto/"
      );
    }

    return url;
  };

  const optimizedImage = getOptimizedImage(profileImage);

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
    <section className="pt-16 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-black" />
            <span className="font-medium text-lg">
              {name || "Your Name"}
            </span>

            <div className="flex items-center gap-2 text-green-600 ml-6">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-light">Available</span>
            </div>
          </div>

          {/* Small Profile Card */}
          <div className="flex items-center gap-4">
            {optimizedImage ? (
              <img
                src={optimizedImage}
                alt={name}
                className="w-[75px] h-[75px] rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-[75px] h-[75px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                N/A
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-black">
                {name || "Your Name"}
              </h2>
              <p className="text-gray-500 text-sm">
                {slogan || "Your slogan here"}
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Hi, I'm {firstName || "You"}
          </h1>

          {/* Bio */}
          <p className="text-gray-600 leading-relaxed max-w-xl">
            {bio || "Add your bio from admin panel."}
          </p>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4 pt-6">
              {socialLinks.map((item, index) => {
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
          )}
        </div>

        {/* ================= RIGHT SIDE IMAGE ================= */}
        <div className="rounded-[32px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
          {optimizedImage ? (
            <img
              src={optimizedImage}
              alt={name}
              className="w-full h-[450px] md:h-[600px] object-cover"
            />
          ) : (
            <div className="w-full h-[450px] md:h-[600px] bg-gray-100 flex items-center justify-center text-gray-400">
              No Profile Image
            </div>
          )}
        </div>
      </div>
    </section>
  );
}