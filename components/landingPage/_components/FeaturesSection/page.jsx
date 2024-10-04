import { Users, Zap, Globe } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-neutral-100 dark:bg-neutral-800">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          <FeatureCard 
            icon={<Users className="h-12 w-12 text-neutral-900 mb-4 dark:text-neutral-50" />}
            title="Real-time Collaboration"
            description="Work together seamlessly in real-time, no matter where your team is located."
          />
          <FeatureCard 
            icon={<Zap className="h-12 w-12 text-neutral-900 mb-4 dark:text-neutral-50" />}
            title="Smart Automation"
            description="Automate repetitive tasks and focus on what matters most - creating great content."
          />
          <FeatureCard 
            icon={<Globe className="h-12 w-12 text-neutral-900 mb-4 dark:text-neutral-50" />}
            title="Cross-platform Support"
            description="Access your projects from any device, anywhere in the world."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105 dark:bg-neutral-950">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}
