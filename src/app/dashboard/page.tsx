"use client";

export default function DashboardMain() {
  return (
    <section className="bg-card rounded-xl shadow-lg px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4" style={{fontFamily:'var(--font-roboto)'}}>Dashboard Home</h2>
      <p className="text-text-secondary max-w-xl mb-2">Welcome to your dashboard. Here you can manage referrals and see your campaign performance at a glance.</p>
    </section>
  );
}
