import ko from "@/messages/ko.json";

const loadingText = (ko as { common: { loading: string } }).common.loading;

export default function WwwLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
      <div className="text-neutral-500 text-sm">{loadingText}</div>
    </div>
  );
}
