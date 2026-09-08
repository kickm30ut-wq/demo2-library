import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="bg-white py-20 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">Your Dedicated Space to Focus, Prepare & Achieve</h1>
          <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
            Abhishek Library provides a quiet, comfortable, and premium self-study environment in Raigarh. Specifically designed for competitive exam aspirants.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors">Register Now</Link>
            <Link to="/login" className="px-6 py-3 bg-zinc-100 text-zinc-900 font-medium rounded-md hover:bg-zinc-200 transition-colors">View Seat Availability</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Library Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['100 Seats', '9 AM – 9 PM', 'High-Speed Wi-Fi', 'AC Environment', 'Charging at Every Desk', 'Power Backup', 'CCTV Security', 'Absolute Silence'].map((feature, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-200 rounded-md">
                <p className="font-medium text-zinc-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="text-2xl font-bold text-zinc-300 mb-2">01</div>
              <h3 className="font-bold mb-2">Register & Login</h3>
              <p className="text-sm text-zinc-600">Create your account to get access to our online portal.</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-300 mb-2">02</div>
              <h3 className="font-bold mb-2">Select Your Seat</h3>
              <p className="text-sm text-zinc-600">Check the live seat map and pick your preferred spot.</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-300 mb-2">03</div>
              <h3 className="font-bold mb-2">Book Your Time</h3>
              <p className="text-sm text-zinc-600">Choose hourly or get a long-term subscription plan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
