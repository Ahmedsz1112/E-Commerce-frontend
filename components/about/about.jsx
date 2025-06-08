import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen px-6 py-16 sm:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
          Welcome to our platform! We are dedicated to providing a seamless shopping experience with a focus on simplicity, quality, and trust.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make online shopping fast, secure, and enjoyable. We aim to bring you a variety of high-quality products and make them accessible with just a few clicks.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where shopping online is the first choice for every customer, and we work every day to build that experience through innovation and dedication.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Trusted platform with secure payments</li>
            <li>Fast and reliable delivery service</li>
            <li>High-quality products from verified sellers</li>
            <li>Responsive support team always ready to help</li>
          </ul>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg">
            Thank you for choosing us. We’re excited to have you here!
          </p>
        </div>
      </div>
    </div>
  );
}
