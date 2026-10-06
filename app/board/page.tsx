import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBoardMembers } from "@/lib/content/board";

export const metadata: Metadata = { title: "Board Members", description: "Meet the board of the Garnet Preservation Association." };

export default async function BoardPage() {
  const members = await getBoardMembers();
  return <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
    <section className="bg-[#1e2f1f] px-5 pt-44 pb-14 text-[#f8f6f1] md:px-10 md:pt-48">
      <div className="mx-auto max-w-[82rem]">
        <p className="text-sm font-semibold text-[#e0c46d]">Garnet Preservation Association</p>
        <h1 className="display-type mt-4 text-5xl leading-tight md:text-7xl">The people behind the work.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">Our board helps guide the association’s work to preserve Garnet and share its history. Meet the members who help keep that work moving.</p>
      </div>
    </section>
    <section aria-label="Board profiles" className="mx-auto max-w-[82rem] px-5 py-12 md:px-10 md:py-16">
      {members.some(member => member.placeholder) && <p className="mb-8 border-l-2 border-[#a36b43] pl-4 text-sm leading-6 text-[#625b50]">Member names, photos, and biographies are coming soon. These sample profiles show how the page will look.</p>}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => <article key={member.id}>
          <div className="relative aspect-[5/6] overflow-hidden bg-[#e6dece]">
            <Image src={member.photo?.url || `/images/board/placeholder-${index % 3 + 1}.svg`} alt={member.photo?.alt || `Photo to come for ${member.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
          </div>
          <p className="mt-5 text-xs font-semibold tracking-wider text-[#98613d] uppercase">{member.role}</p>
          <h2 className="display-type mt-2 text-3xl">{member.name}</h2>
          {member.bio && <p className="mt-3 leading-7 text-[#625b50]">{member.bio}</p>}
        </article>)}
      </div>
      <Link href="/preserve" className="mt-12 inline-block border-b border-[#98613d] pb-2 font-semibold">Learn about preservation and volunteering →</Link>
    </section>
  </main>;
}
