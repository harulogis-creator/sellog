/**
 * 블로그 소유자 프로필 (아바타 + 표시 이름)
 * [domain] 메인 등에서 소유자 정보 표시
 */
interface DomainOwnerProfileProps {
  displayName: string | null;
  avatarUrl: string | null;
  /** 프로필 미설정 시 대체 텍스트 (예: 블로그 이름) */
  fallbackLabel?: string;
  className?: string;
}

export function DomainOwnerProfile({
  displayName,
  avatarUrl,
  fallbackLabel = "블로그 소유자",
  className = "",
}: DomainOwnerProfileProps) {
  const label = displayName?.trim() || fallbackLabel;

  return (
    <div
      className={`flex items-center gap-3 text-sm text-neutral-600 ${className}`}
      role="group"
      aria-label={`소유자: ${label}`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="h-9 w-9 rounded-full object-cover ring-1 ring-neutral-200/80"
          width={36}
          height={36}
        />
      ) : (
        <div
          className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 font-medium text-xs"
          aria-hidden
        >
          {label.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="font-medium text-neutral-800">{label}</span>
    </div>
  );
}
