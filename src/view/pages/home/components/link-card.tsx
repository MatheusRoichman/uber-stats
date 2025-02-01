interface LinkCardProps {
  title: string
  description: string
  href: string
}

export function LinkCard({ title, description, href }: LinkCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col gap-2 rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground flex-1">
      <h2 className="text-2xl font-bold font-title">{title}</h2>
      <p className="text-lg font-light">{description}</p>
    </a>
  )
}