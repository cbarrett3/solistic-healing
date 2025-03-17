'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  period: string;
  highlight?: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Standard Plan',
    description: 'Perfect for individuals starting their healing journey',
    price: 200,
    period: '/month',
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
    features: [
      '8 sessions /month',
      '90 minute sessions',
      'Family & Group',
      'Group Workshops'
    ],
  },
];

export default function PricingSection() {
  // State to track which card is selected
  const [selectedCard, setSelectedCard] = useState<number | null>(1); // Default to middle card

  // Handle card selection
  const handleSelectPlan = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <section id="pricing" className="w-full py-8" data-section="pricing">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light text-foreground">Our Pricing Plans</h2>
          <p className="text-base text-muted-foreground mt-2">Choose the plan that works best for your healing journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const isHighlight = selectedCard === index || (selectedCard === null && plan.highlight);
            
            return (
              <div 
                key={index}
                className={`
                  relative flex flex-col rounded-[var(--radius-sm)] overflow-hidden 
                  transition-all duration-300 
                  ${isHighlight 
                    ? 'pricing-card-highlight z-10 transform hover:-translate-y-1' 
                    : 'pricing-card hover:shadow-lg transform hover:-translate-y-0.5'
                  }
                `}
                style={{
                  backgroundColor: isHighlight 
                    ? 'var(--conditions-accent-dark)' 
                    : index === 0 
                      ? 'var(--about-card-bg)' 
                      : 'var(--color-card)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isHighlight 
                    ? 'var(--conditions-accent)' 
                    : 'var(--color-border)'
                }}
              >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-border/20">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${
                      isHighlight ? 'text-white' : 'text-foreground'
                    }`}>{plan.name}</h3>
                    {(plan.highlight || selectedCard === index) && (
                      <div className="bg-primary text-xs text-primary-foreground py-0.5 px-2 rounded-[var(--radius-sm)]">
                        BEST VALUE
                      </div>
                    )}
                  </div>
                  <p className={`text-sm mt-1.5 line-clamp-2 ${
                    isHighlight ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline mt-3">
                    <span className={`text-3xl font-bold ${
                      isHighlight ? 'text-primary-highlight' : 'text-primary'
                    }`}>
                      ${plan.price}
                    </span>
                    <span className={`ml-1.5 text-sm ${
                      isHighlight ? 'text-white/80' : 'text-muted-foreground'
                    }`}>{plan.period}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <ul className="space-y-3 text-sm flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className={`w-5 h-5 ${
                          isHighlight ? 'text-primary-highlight' : 'text-primary'
                        }`} />
                        <span className={`${
                          isHighlight ? 'text-white/90' : 'text-foreground'
                        }`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handleSelectPlan(index)}
                    className={`
                      w-full mt-5 py-3 text-sm font-medium 
                      rounded-[var(--radius-sm)] 
                      transition-all duration-300 
                      ${isHighlight 
                        ? 'pricing-highlight-button' 
                        : 'pricing-standard-button'
                      }
                    `}
                    aria-label={`Choose ${plan.name}`}
                  >
                    Choose Plan
                  </button>
                </div>

                {/* Decorative elements for highlight card */}
                {isHighlight && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
                    <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-primary/10 blur-2xl"></div>
                    <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-primary/10 blur-2xl"></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-5">
          <p className="text-sm text-muted-foreground">
            All plans include a free initial consultation. Contact us for custom plans.
          </p>
        </div>
      </div>

      <style jsx>{`
        .pricing-card {
          background-color: var(--color-card);
          color: var(--color-card-foreground);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s var(--ease-standard);
        }
        
        .pricing-card-highlight {
          position: relative;
          box-shadow: var(--shadow-md), 0 0 0 1px var(--conditions-accent);
        }
        
        .pricing-card-highlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg, 
            rgba(139, 195, 74, 0.15) 0%,
            rgba(139, 195, 74, 0.05) 100%
          );
          pointer-events: none;
        }
        
        .pricing-card-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            to top, 
            rgba(0, 0, 0, 0.15) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: -1;
        }
        
        /* Button Styles */
        .pricing-highlight-button {
          background-color: var(--color-primary);
          color: var(--color-primary-foreground);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 2px 10px rgba(139, 195, 74, 0.3);
        }
        
        .pricing-highlight-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.7s var(--ease-standard);
          z-index: -1;
        }
        
        .pricing-highlight-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(139, 195, 74, 0.4);
        }
        
        .pricing-highlight-button:hover::before {
          left: 100%;
        }
        
        .pricing-highlight-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(139, 195, 74, 0.3);
        }
        
        .pricing-standard-button {
          background-color: transparent;
          color: var(--color-foreground);
          border: 1px solid var(--color-primary);
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        
        .pricing-standard-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: color-mix(in oklch, var(--color-primary), transparent 90%);
          transition: width 0.3s var(--ease-standard);
          z-index: -1;
        }
        
        .pricing-standard-button:hover {
          color: var(--color-foreground);
        }
        
        .pricing-standard-button:hover::before {
          width: 100%;
        }
        
        .pricing-standard-button:active {
          transform: translateY(1px);
        }
        
        /* Custom text color for highlight card */
        .text-primary-highlight {
          color: #c5ff41;
        }
        
        @media (max-width: 640px) {
          .pricing-card-highlight {
            order: -1;
          }
        }
        
        /* Dark mode specific adjustments */
        :global(.dark) .pricing-card-highlight {
          background-color: #2a3e1d;
          box-shadow: var(--shadow-md), 0 0 0 1px rgba(139, 195, 74, 0.4);
        }
        
        :global(.dark) .pricing-card-highlight::before {
          background: linear-gradient(
            135deg, 
            rgba(139, 195, 74, 0.2) 0%,
            rgba(139, 195, 74, 0.05) 100%
          );
        }
        
        :global(.dark) .pricing-highlight-button {
          box-shadow: 0 2px 10px rgba(139, 195, 74, 0.2);
        }
        
        :global(.dark) .pricing-highlight-button:hover {
          box-shadow: 0 4px 15px rgba(139, 195, 74, 0.3);
        }
      `}</style>
    </section>
  );
}
