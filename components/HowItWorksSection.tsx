import { CreditCard, Smartphone, Share2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: CreditCard,
      number: '01',
      title: 'Order Your Card',
      description: 'Choose your design and customize your NFC business card with your branding.',
    },
    {
      icon: Smartphone,
      number: '02',
      title: 'Set Up Your Profile',
      description: 'Create your digital profile with all your contact info, links, and social media.',
    },
    {
      icon: Share2,
      number: '03',
      title: 'Start Sharing',
      description: 'Tap your card on any smartphone to instantly share your information.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-7xl font-bold text-[#FACC15] opacity-20">
                {step.number}
              </div>
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#EAB308] to-[#FACC15] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
