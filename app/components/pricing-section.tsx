'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  period: string;
  highlight?: boolean;
  color: string;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Standard Plan',
    description: 'Perfect for individuals starting their healing journey',
    price: 200,
    period: '/month',
    color: 'bg-neutral-100 dark:bg-neutral-900',
    features: [
      '4 sessions /month',
      '60 minute sessions',
      'Individual Therapy',
      'Online Resources'
    ],
  },
  {
    name: 'Premium Plan',
    description: 'Our most popular option for comprehensive care',
    price: 500,
    period: '/month',
    highlight: true,
    color: 'bg-[#1a2e0d] dark:bg-[#1a2e0d]',
    features: [
      'Unlimited sessions',
      '60 minute sessions',
      'Individual & Group',
      '24/7 Support'
    ],
  },
  {
    name: 'Family Plan',
    description: 'Designed for families seeking collective healing',
    price: 600,
    period: '/month',
    color: 'bg-white dark:bg-black',
    features: [
      '8 sessions /month',
      '90 minute sessions',
      'Family & Group',
      'Group Workshops'
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-8" data-section="pricing">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light">Our Pricing Plans</h2>
          <p className="text-base text-muted-foreground mt-2">Choose the plan that works best for your healing journey</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col ${plan.color} ${
                plan.highlight ? 'text-white' : 'text-foreground'
              } shadow-md rounded-sm overflow-hidden`}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/10">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium ${plan.highlight ? 'text-white' : 'text-foreground'}`}>{plan.name}</h3>
                  {plan.highlight && (
                    <div className="bg-primary text-xs text-white py-0.5 px-2 rounded-sm">
                      BEST VALUE
                    </div>
                  )}
                </div>
                <p className={`text-sm mt-1.5 line-clamp-2 ${plan.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline mt-3">
                  <span className={`text-3xl font-bold ${plan.highlight ? 'text-primary-foreground' : 'text-primary'}`}>
                    ${plan.price}
                  </span>
                  <span className="ml-1.5 text-sm opacity-80">{plan.period}</span>
                </div>
              </div>
              
              {/* Features */}
              <div className="p-4 flex-1 flex flex-col">
                <ul className="space-y-3 text-sm flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className={`w-5 h-5 ${plan.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full mt-5 py-3 text-sm font-medium transition-all duration-300 ${
                    plan.highlight 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-primary/10 hover:bg-primary/20 text-foreground'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <p className="text-sm text-muted-foreground">
            All plans include a free initial consultation. Contact us for custom plans.
          </p>
        </div>
      </div>
    </section>
  );
}
