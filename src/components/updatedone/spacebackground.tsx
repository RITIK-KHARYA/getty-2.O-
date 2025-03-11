export function GridSmallBackgroundDemo() {
  return (
    <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

      <div className="bottom-0 h-full w-full flex items-center justify-center"></div>
    </div>
  );
}
