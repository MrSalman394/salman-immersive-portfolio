import { lazy, Suspense } from 'react';

const PortfolioExperience = lazy(() =>
  import('./components/PortfolioExperience').then((module) => ({ default: module.PortfolioExperience })),
);

export default function App() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-void px-6 text-center font-mono text-xs uppercase tracking-[0.32em] text-signal/70">
          Initializing Salman interface
        </main>
      }
    >
      <PortfolioExperience />
    </Suspense>
  );
}
