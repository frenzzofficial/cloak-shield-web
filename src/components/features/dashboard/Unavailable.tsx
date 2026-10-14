import { AlertIcon } from "@/components/ui/icons/Icons";

/** Shown in a Panel whose data could not be loaded. */
const Unavailable = ({ what }: { what: string }) => (
  <p className="flex items-center gap-2 text-sm text-muted-foreground">
    <AlertIcon className="size-4 text-chart-4" />
    {what} couldn&apos;t be loaded right now.
  </p>
);

export default Unavailable;
