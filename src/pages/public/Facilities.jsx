import React from 'react';

export default function Facilities() {
  const facilities = [
    { title: 'Individual Partitioned Seats', desc: 'Privacy and focus with high-quality partitioned desks.' },
    { title: 'Ergonomic Seating', desc: 'Comfortable chairs designed for long hours of study.' },
    { title: 'High-Speed Wi-Fi', desc: 'Uninterrupted internet for online classes and research.' },
    { title: 'Dedicated Charging Port', desc: 'Power up your laptop and mobile at every desk.' },
    { title: '100% Air-Conditioning', desc: 'Comfortable temperature maintained throughout the year.' },
    { title: 'Power Backup', desc: 'Zero interruptions during power cuts.' },
    { title: 'CCTV Security', desc: '24/7 surveillance for your safety and belongings.' },
    { title: 'Absolute Silence Policy', desc: 'Strict no-talking rules to maintain a pin-drop silence.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">Our Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f, i) => (
          <div key={i} className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm">
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-zinc-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
