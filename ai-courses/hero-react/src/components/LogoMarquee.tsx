const LOGOS = ["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"];

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  // pr-16 matches gap-16 so the two copies join seamlessly at -50%.
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={hidden || undefined}>
      {LOGOS.map((name) => (
        <div key={name} className="flex items-center gap-2.5">
          <span className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg text-xs font-semibold text-foreground">
            {name[0]}
          </span>
          <span className="text-base font-semibold text-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="relative z-10 px-8 pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:gap-12">
        <p className="shrink-0 text-center text-sm text-foreground/50 sm:text-left">
          Relied on by brands
          <br />
          across the globe
        </p>
        <div className="w-full min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
