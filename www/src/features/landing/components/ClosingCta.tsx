import { Download } from 'lucide-react';
import Image from 'next/image';
import closingImage from '@/assets/images/closing.webp';
import { Button } from '@/components/ui/button';
import { site } from '@/libs/site';

export function ClosingCta() {
  return (
    <section id="download" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal relative isolate overflow-hidden rounded-[32px] border border-line shadow-card">
          <Image
            src={closingImage}
            alt=""
            fill
            quality={86}
            placeholder="blur"
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="-z-10 object-cover object-bottom"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />
          <div className="max-w-xl px-7 py-16 sm:px-14 sm:py-24">
            <h2 className="text-[36px] leading-[1.1] font-medium tracking-[-0.025em] text-balance sm:text-[48px]">
              Start writing in seconds.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty sm:text-[18px]">
              Download Zodnote, open it, and type. That's the whole setup.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href={site.downloadUrl}>
                <Download className="group-hover:translate-y-0.5" />
                Download for Mac
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
