import { BrandLogo } from "@/shared/ui/brand-logo";
import { APP_DESCRIPTION } from "@/shared/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer px-5 py-12 text-center md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4">
        <BrandLogo variant="footer" href={undefined} />
        <p className="max-w-md text-sm text-slate-400">{APP_DESCRIPTION}</p>
        <p className="text-xs text-slate-500">
          © 2026 NOW MEET GO · 나믿고. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
