import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-16 sm:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Please fill out the form below or reach out directly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Address
              </h2>
              <p className="text-gray-600">123 Main Street, Cairo, Egypt</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Email
              </h2>
              <p className="text-gray-600">support@example.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Phone
              </h2>
              <p className="text-gray-600">+20 123 456 7890</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Working Hours
              </h2>
              <p className="text-gray-600">Saturday – Thursday: 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
