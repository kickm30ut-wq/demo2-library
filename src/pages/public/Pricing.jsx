import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    { name: 'Hourly', price: '₹29', duration: 'per hour', features: ['Flexible timing', 'Subject to availability', 'Good for short sessions'] },
    { name: 'Monthly', price: '₹999', duration: '30 days', features: ['Exclusive seat reservation', 'Unlimited access (9 AM - 9 PM)', 'Best for consistent study'] },
    { name: 'Quarterly', price: '₹2,699', duration: '90 days', features: ['Exclusive seat reservation', 'Saves ₹298 compared to monthly', 'Long-term peace of mind'] },
    { name: 'Half-Yearly', price: '₹4,999', duration: '180 days', features: ['Exclusive seat reservation', 'Highest value plan', 'Dedicated preparation focus'] },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-zinc-600">Choose the plan that best fits your study schedule.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white border border-zinc-200 rounded-md p-6 flex flex-col">
            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-extrabold">{plan.price}</span>
              <span className="text-sm text-zinc-500"> / {plan.duration}</span>
            </div>
            <ul className="text-sm text-zinc-600 space-y-2 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/register" className="block text-center w-full py-2 bg-zinc-100 hover:bg-zinc-200 font-medium rounded-md transition-colors">
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
