"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

type Contact = {
  email?: string;
  phone?: string;
  location?: string;
};

export default function ContactSection({ slug }: { slug: string }) {
  const [contact, setContact] = useState<Contact>({});

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/${slug}`
        );

        if (!res.ok) return;

        const json = await res.json();

        if (json?.success && json?.data?.contact) {
          setContact(json.data.contact);
        }
      } catch (error) {
        console.error("Contact fetch error:", error);
      }
    };

    if (slug) fetchContact();
  }, [slug]);

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Contact Me
          </h2>
          <p className="text-gray-500 mt-3">
            Let’s connect and build something amazing together.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center group"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition">
                <FaEnvelope className="text-gray-600 group-hover:text-white text-xl transition" />
              </div>
              <h3 className="mt-5 font-semibold text-lg text-gray-800">
                Email
              </h3>
              <p className="text-gray-500 mt-2 text-sm break-all">
                {contact.email}
              </p>
            </a>
          )}

          {/* Phone */}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center group"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition">
                <FaPhoneAlt className="text-gray-600 group-hover:text-white text-xl transition" />
              </div>
              <h3 className="mt-5 font-semibold text-lg text-gray-800">
                Phone
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {contact.phone}
              </p>
            </a>
          )}

          {/* Location */}
          {contact.location && (
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center group">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition">
                <FaMapMarkerAlt className="text-gray-600 group-hover:text-white text-xl transition" />
              </div>
              <h3 className="mt-5 font-semibold text-lg text-gray-800">
                Location
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {contact.location}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}