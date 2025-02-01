import { LinkCard } from "./components/link-card";

export function Home() {
  return (
    <>
      <section className="bg-foreground text-background min-h-80 xl:p-48 lg:p-32 md:p-24 p-8">
        <div className="flex flex-col justify-center max-w-5xl mx-auto">
          <h1 className="font-bold text-7xl font-title">Uber Stats</h1>
          <p className="text-lg mt-4">All your Uber information, in one place.</p>
        </div>
      </section>

      <section className="p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkCard
            title="Cost Report"
            description="See how much you've spent on rides."
            href="/cost-report"
          />

          <LinkCard
            title="Ride History"
            description="See all your past rides."
            href="/ride-history"
          />
        </div>
      </section>
    </>
  )
}