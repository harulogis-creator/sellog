import { DomainBottomNav } from "@/components/layout/DomainBottomNav";
import { isValidLocale } from "@/lib/i18n";

interface DomainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default async function DomainLayout({ children, params }: DomainLayoutProps) {
  const { domain: rawDomain } = await params;
  const domain = safeDecode(rawDomain);

  if (isValidLocale(domain)) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="pb-16 md:pb-0">{children}</div>
      <DomainBottomNav domain={domain} />
    </>
  );
}
