import React from 'react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">About Abhishek Library</h1>
      <div className="prose prose-zinc mx-auto">
        <p className="text-lg text-zinc-700 mb-6">
          Established in 2024, Abhishek Library is a premium study space located at Kotla Road, Raigarh, Chhattisgarh, India. 
          Our mission is to provide an undisturbed, focused environment for students preparing for competitive exams.
        </p>
        <div className="bg-white border border-zinc-200 p-6 rounded-md mb-8">
          <h3 className="font-bold mb-4 border-b pb-2">Key Information</h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><strong>Location:</strong> Kotla Road, Raigarh, Chhattisgarh</li>
            <li><strong>Operating Hours:</strong> 9:00 AM to 9:00 PM</li>
            <li><strong>Capacity:</strong> 100 individual seats</li>
          </ul>
        </div>
        <h2 className="text-xl font-bold mb-4">Who is it for?</h2>
        <p className="text-zinc-700 mb-4">Our facilities are specially designed to meet the rigorous demands of:</p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-700">
          <li>UPSC aspirants</li>
          <li>State PSC aspirants</li>
          <li>Banking & SSC aspirants</li>
          <li>Medical & Engineering entrance aspirants</li>
          <li>Anyone seeking absolute silence and focus</li>
        </ul>
      </div>
    </div>
  );
}
