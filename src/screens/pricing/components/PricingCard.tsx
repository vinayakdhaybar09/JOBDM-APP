import React from 'react';

interface PlanFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: number;
  credits: number;
  bonusCredits?: number;
  features: PlanFeature[];
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  credits,
  bonusCredits,
  features,
  isPopular,
}) => {
  return (
    <div className={`relative bg-white rounded-xl p-8 ${
      isPopular 
        ? 'shadow-xl border-2 border-blue-500/30 scale-105' 
        : 'shadow-lg border border-gray-200/80'
    } transition-all hover:shadow-xl hover:scale-[1.02]`}>
      {isPopular && (
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-medium absolute -top-3 right-6 shadow-lg">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-500">₹</span>
          <span className="text-5xl font-bold text-gray-900">{price}</span>
        </div>
      </div>
      <div className="flex gap-2 mb-8">
        <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-100">
          {credits} Credits
        </span>
        {bonusCredits && (
          <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium border border-green-100">
            +{bonusCredits} Bonus
          </span>
        )}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-100">
              <span className="text-green-600 text-sm">✓</span>
            </span>
            <span className="text-gray-600">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
          isPopular
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
            : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/25'
        }`}
      >
        Buy Now
      </button>
    </div>
  );
};

export default PricingCard;