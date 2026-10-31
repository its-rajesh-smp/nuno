import { AppWindowMock } from './AppWindowMock';

// The dark stage that shows the product, with a dot grid and a soft butter glow.
export function ProductStage() {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-stage p-3 stage-grid sm:p-10 lg:p-14">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 h-64 w-[60%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 -bottom-32 -z-10 h-72 w-96 rounded-full bg-peach-edge/10 blur-3xl" />
      <AppWindowMock />
    </div>
  );
}
