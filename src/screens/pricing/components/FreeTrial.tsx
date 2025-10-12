import React from 'react';

const FreeTrial = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 max-w-4xl mx-auto my-12 shadow-lg border border-green-100/50">
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
          <span className="text-2xl">🎁</span>
        </div>
        <div>
          <h3 className="text-gray-900 font-bold text-xl mb-1">Free Trial Bonus! 🎉</h3>
          <p className="text-gray-600 text-lg">Get 20 free email credits when you join. Perfect to test your first campaign!</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/30 rounded-full blur-3xl -mr-20 -mt-20 z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl -ml-20 -mb-20 z-0" />
    </div>
  );
};

export default FreeTrial;