import { AnnouncementBar } from "@/app/www/AnnouncementBar";
import { SkipToContent } from "@/app/www/SkipToContent";
import { WwwHeader } from "@/app/www/WwwHeader";
import { WwwFooter } from "@/app/www/WwwFooter";
import { LocaleProvider } from "@/components/LocaleProvider";

export default function WwwLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-background">
        <SkipToContent />
        <AnnouncementBar />
        <WwwHeader />
        <main id="main-content" className="flex-1">{children}</main>
        <WwwFooter />
      </div>
    </LocaleProvider>
  );
}
