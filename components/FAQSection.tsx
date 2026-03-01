"use client";

export default function FAQSection() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-black">
              Does it work on all phones?
            </h3>
            <p className="text-gray-600 mt-2">
              Works with all NFC-enabled smartphones. If NFC is not available,
              users can scan the QR code.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black">
              Do I need an app?
            </h3>
            <p className="text-gray-600 mt-2">
              No app required. Just tap or scan and your profile opens instantly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black">
              Can I update my information?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes. You can update your profile anytime using the admin dashboard.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black">
              What happens after 1 year?
            </h3>
            <p className="text-gray-600 mt-2">
              Renewal is only LKR 500 ($1.75) per year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
