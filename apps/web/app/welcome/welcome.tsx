import { ModeToggle } from '~/components/mode-toggle';
import { Button } from '~/components/ui/button';

export function Welcome() {
  return (
    <main className="flex items-center justify-center p-4">
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Yuna!</h1>
        <Button>Get Started</Button>
        <ModeToggle />
      </div>
    </main>
  );
}
