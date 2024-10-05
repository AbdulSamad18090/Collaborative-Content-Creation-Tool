import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          <PricingCard 
            title="Basic"
            price="$9/month"
            features={[
              "Up to 5 team members",
              "Basic collaboration features",
              "5GB storage",
            ]}
          />
          <PricingCard 
            title="Pro"
            price="$29/month"
            features={[
              "Up to 20 team members",
              "Advanced collaboration features",
              "50GB storage",
              "Priority support",
            ]}
            isFeatured
          />
          <PricingCard 
            title="Enterprise"
            price="Custom"
            features={[
              "Unlimited team members",
              "Custom features",
              "Unlimited storage",
              "24/7 dedicated support",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, features, isFeatured }) {
  return (
    <div className={`flex flex-col p-6 rounded-lg shadow-lg ${isFeatured ? 'bg-neutral-900 text-neutral-50 scale-110' : 'bg-white border border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800'}`}>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}</p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button className={`mt-auto ${isFeatured && "bg-white text-black hover:bg-gray-200"}`}>{isFeatured ? "Choose Plan" : "Contact Sales"}</Button>
    </div>
  );
}
