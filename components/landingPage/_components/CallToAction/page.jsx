import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Content Creation?</h2>
        <p className="mb-10 text-lg text-neutral-500 dark:text-neutral-400">Join thousands of teams already using ContentCollab to streamline their workflow.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input className="md:max-w-sm w-full" placeholder="Enter your email" type="email" />
          <Button size="lg">Get Started for Free</Button>
        </div>
      </div>
    </section>
  );
}
