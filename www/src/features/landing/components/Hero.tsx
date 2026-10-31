import { Download } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/assets/images/hero.webp';
import { Button } from '@/components/ui/button';
import { site } from '@/libs/site';
import { ProductStage } from './ProductStage';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 sm:pt-44">
      {/* Box height grows with width so the meadow stays level with the button. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[446px] sm:h-[490px] md:h-[calc(410px_+_10.9vw)] lg:h-[calc(441px_+_10.9vw)]">
        <Image
          src={heroImage}
          alt=""
          fill
          preload
          quality={86}
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-rise">
          <h1 className="mx-auto max-w-4xl text-[44px] leading-[0.98] font-normal tracking-[-0.035em] text-balance sm:text-[60px] lg:text-[76px]">
            A notepad that just lets you <span className="marker">write</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-muted text-pretty sm:text-[20px]">
            No login, no clutter, no cloud. Just open it and type.
          </p>
          <Button asChild size="lg" className="mt-9">
            <a href={site.downloadUrl}>
              <Download className="group-hover:translate-y-0.5" />
              Download for Mac
            </a>
          </Button>
        </div>
        <div className="mt-16 animate-rise [animation-delay:150ms] sm:mt-24">
          <ProductStage />
        </div>
      </div>
    </section>
  );
}
