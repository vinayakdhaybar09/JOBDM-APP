import React from 'react';

const CurrentBalance = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-10 max-w-lg mx-auto text-center shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-50" />
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6 gap-2">
          <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
            <span className="text-2xl">✉️</span>
          </span>
          <span className="text-xl font-semibold">Current Balance</span>
        </div>
        <div className="text-7xl font-bold mb-3 flex items-center justify-center">
          <span className="bg-white/10 rounded-2xl px-8 py-4 backdrop-blur-sm">20</span>
        </div>
        <div className="text-lg font-medium text-blue-100">Email Credits Available</div>
      </div>
      <div className="absolute top-1/2 left-0 w-full h-48 bg-gradient-to-b from-white/10 to-transparent transform -translate-y-1/2 blur-2xl" />
    </div>
  );
};

export default CurrentBalance;