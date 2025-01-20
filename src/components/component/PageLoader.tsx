"use client";

function PageLoader() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="motion-safe:animate-bounce text-2xl font-bold">
        Loading....
      </div>
    </div>
  );
}

export default PageLoader;
