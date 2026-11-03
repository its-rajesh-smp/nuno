import Image from 'next/image';
import { LogoMark } from '@/components/ui/Logo';
import { authArt } from '../helpers/artCopy';

// Left half of the auth pages: copy on a flat sky, the artwork along the bottom.
// Always light, in both themes, so the art reads the same.
export function AuthArtPanel() {
  return (
    <aside className="relative hidden overflow-hidden text-stone-900 lg:block" style={{ backgroundColor: authArt.background }}>
      <Image
        src={authArt.image}
        alt=""
        priority
        placeholder="blur"
        sizes="60vw"
        className="absolute inset-x-0 bottom-0 h-auto w-full"
      />
      <div className="relative px-12 pt-15">
        <div className="flex items-center gap-2">
          <LogoMark className="size-5" />
          <span className="font-mono text-[12px] tracking-[0.3em] uppercase">Zodnote</span>
        </div>

        <figure className="mt-20 max-w-[540px]">
          <blockquote className="text-[22px] leading-[1.45] font-medium tracking-[-0.02em] text-balance">
            “{authArt.quote}”
          </blockquote>
          <figcaption className="mt-6 text-[15px] text-stone-600">{authArt.attribution}</figcaption>
        </figure>
        <div className="my-9 h-px w-16 bg-stone-900/15" />
        <ul className="space-y-4 text-[15px] text-stone-600">
          {authArt.quotes.map((quote) => (
            <li key={quote} className="even:pl-6">
              “{quote}”
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
