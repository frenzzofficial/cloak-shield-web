const SKELETON_KEYS = ["first", "second", "third", "fourth", "fifth"] as const;

/** Placeholder rows shown while a list loads. */
const ListSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="space-y-3" aria-busy="true">
    {SKELETON_KEYS.slice(0, rows).map((key) => (
      <div key={key} className="flex items-center gap-3">
        <div className="size-8 animate-pulse rounded-full bg-white/8" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/8" />
          <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    ))}
  </div>
);

export default ListSkeleton;
