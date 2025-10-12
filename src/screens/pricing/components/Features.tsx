import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Delivery',
      description: 'Credits are added to your account immediately after purchase',
      gradient: 'from-blue-500/20 to-blue-600/20',
      iconBg: 'bg-blue-500',
    },
    {
      icon: '👥',
      title: 'Quality Contacts',
      description: 'Access verified HR contacts and employee referrals',
      gradient: 'from-purple-500/20 to-purple-600/20',
      iconBg: 'bg-purple-500',
    },
    {
      icon: '📈',
      title: 'Higher Success Rate',
      description: 'Personalized emails get 3x better response rates',
      gradient: 'from-green-500/20 to-green-600/20',
      iconBg: 'bg-green-500',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto my-24">
      {features.map((feature, index) => (
        <div key={index} className="relative group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
               style={{ background: `radial-gradient(circle at center, ${feature.gradient.split(' ')[1]} 0%, transparent 70%)` }} />
          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <span className="text-3xl">{feature.icon}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;