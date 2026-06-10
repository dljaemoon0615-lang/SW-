import { MobileAppHeader } from "./mobile-app-header";
import { BottomNav } from "./bottom-nav";

export function MobileShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="mobile-app-root mobile-app-root--page">
      <MobileAppHeader title={title} showLogo={!title} />
      <main className="mobile-app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
