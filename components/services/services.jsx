import React from "react";

export default function ServicesPage() {
  const services = [
    {
      title: "Fast Delivery",
      description:
        "Receive your orders quickly and securely with our efficient delivery system.",
      icon: "🚚",
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are here to help you anytime, anywhere. Your satisfaction is our priority.",
      icon: "📞",
    },
    {
      title: "High Quality Products",
      description:
        "We provide carefully selected and verified products to ensure quality and satisfaction.",
      icon: "🛍️",
    },
    {
      title: "Secure Payment",
      description:
        "Enjoy worry-free payments with our encrypted and trusted payment gateway.",
      icon: "🔐",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-16 sm:px-12 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Our Services
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-700">
            We are committed to delivering value and excellence through our services.
          </p>
        </div>
      </div>
    </div>
  );
}
