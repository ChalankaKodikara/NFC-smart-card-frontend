import { Nfc, Link2, Settings } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Nfc,
      title: 'NFC Tap to Share',
      description: 'Simply tap your card on any smartphone to instantly share your contact information and digital profile.',
    },
    {
      icon: Link2,
      title: 'Custom Profile Links',
      description: 'Create personalized digital profiles with all your social media, website links, and contact details in one place.',
    },
    {
      icon: Settings,
      title: 'Admin Control Panel',
      description: 'Manage your digital business cards, update information in real-time, and track engagement analytics.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a lasting impression in the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#EAB308] to-[#FACC15] rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
