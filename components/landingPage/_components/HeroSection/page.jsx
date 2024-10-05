import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter()
    return (
      <section id="home" className="py-20 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Collaborate and Create
          <span className="text-neutral-900 dark:text-neutral-50"> Together</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400">
          Empower your team with our advanced collaborative content creation tool. Streamline your workflow, boost productivity, and create amazing content together.
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <Button size="lg" onClick={() => {
                router.push('/auth/signup')
              }}>Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>
    );
  }
  