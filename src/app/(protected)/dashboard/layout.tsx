interface LayoutProps<_T> {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
  return (
    // Full-bleed dark canvas: the header and footer paint their own dark background, but the
    // body between them does not, so without this the page shows through as white.
    <div className="relative isolate min-h-[calc(100svh-4.25rem)] w-full overflow-hidden bg-[#02040a]">
      {/* Soft brand glow behind the content; decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(60%_60%_at_70%_0%,rgba(47,143,240,0.18),transparent_70%),radial-gradient(40%_40%_at_0%_20%,rgba(95,212,247,0.09),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-300 px-4 py-10 sm:px-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
