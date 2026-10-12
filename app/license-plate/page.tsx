import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import projects from "./projects.json";

export const metadata: Metadata = { title: "License Plate & Grants", description: "Support Garnet and other Montana ghost towns with the Explore Montana Ghost Towns specialty plate." };
const steps = [
  ["Visit your county treasurer.", "Go to a Montana County Treasurer Motor Vehicle Office to request the plate."],
  ["Ask for the ghost town plate.", "Request the Explore Montana Ghost Towns plate sponsored by the Garnet Preservation Association."],
  ["Pay the required fees.", "The plate includes a $20 sponsor donation and $20 in initial specialty plate administrative fees, in addition to your regular registration costs. The annual sponsor donation is $20."],
  ["Check timing and availability.", "Ask your county treasurer about switching before your renewal month. If the plate is not in stock, the office can issue a temporary registration permit while you wait."],
];
export default function LicensePlatePage() {
  return <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
    <section className="bg-[#1e2f1f] px-5 pt-44 pb-14 text-[#f8f6f1] md:px-10 md:pt-48">
      <div className="mx-auto grid max-w-[82rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div><p className="text-sm font-semibold text-[#e0c46d]">License Plate &amp; Grants</p><h1 className="display-type mt-4 text-5xl leading-tight md:text-6xl">A plate that helps preserve our past.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-white/80">The “Explore Montana Ghost Towns” license plate is available for cars, trucks, and trailers. Your $20 contribution per plate supports Garnet Ghost Town and other historical preservation projects in Montana. Your $20 donation to the Garnet Preservation Association is tax deductible.</p></div>
        <figure><Image src="/images/support/garnet-license-plate.png" alt="Explore Montana Ghost Towns specialty license plate, showing historic buildings at Garnet" width={1034} height={589} priority className="h-auto w-full" /><figcaption className="mt-3 text-xs text-white/70">Plate design from the Montana Motor Vehicle Division.</figcaption></figure>
      </div>
    </section>
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[82rem]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div><p className="text-sm font-semibold text-[#98613d]">Where your donation goes</p><h2 className="display-type mt-3 text-4xl">Help at Garnet.<br />Help across Montana.</h2></div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border-t-4 border-[#3d5a3e] pt-5"><p className="display-type text-6xl">75%</p><h3 className="mt-3 text-xl font-semibold">Stays at Garnet</h3><p className="mt-3 leading-7 text-[#625b50]">Used for restoration and enhancement in Garnet Ghost Town.</p></div>
          <div className="border-t-4 border-[#a36b43] pt-5"><p className="display-type text-6xl">25%</p><h3 className="mt-3 text-xl font-semibold">Helps across Montana</h3><p className="mt-3 leading-7 text-[#625b50]">Supports other historical preservation projects in Montana through the GPA grant program.</p></div>
        </div>
      </div>
      <nav aria-label="License plate and grants sections" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#3d5a3e]">
        <a href="#garnet-projects" className="underline underline-offset-4">Work at Garnet</a>
        <a href="#grants" className="underline underline-offset-4">Apply for a grant</a>
        <a href="#funded-projects" className="underline underline-offset-4">Funded projects</a>
      </nav>
      <div className="mt-16 border-t border-[#24352b]/20 pt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div><h2 className="display-type text-4xl">How to get yours</h2><p className="mt-4 max-w-sm leading-7 text-[#625b50]">Your county treasurer handles the request. Contact the office before you go to confirm current costs and availability.</p><a href="https://mvdmt.gov/county-treasurer-locations/" target="_blank" rel="noreferrer" className="mt-6 inline-block bg-[#3d5a3e] px-5 py-4 font-semibold text-white hover:bg-[#24352b]">Find your county treasurer ↗</a></div>
        <ol className="grid gap-7">{steps.map(([title, copy], index) => <li key={title} className="flex gap-5"><span className="display-type text-3xl text-[#98613d]" aria-hidden="true">0{index + 1}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-7 text-[#625b50]">{copy}</p></div></li>)}</ol>
      </div>
      <p className="mt-12 text-sm leading-6 text-[#625b50]">Plate information: <a href="https://mvdmt.gov/portfolio-item/garnet-preservation-association-inc/" className="underline underline-offset-4">Montana Motor Vehicle Division</a></p>
      </div>
    </section>

    <section id="garnet-projects" className="scroll-mt-28 px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[82rem]">
        <Reveal><p className="text-sm font-semibold text-[#98613d]">The 75% that stays at Garnet</p><h2 className="display-type mt-4 leading-[0.95] section-heading">License plate funding<span className="block text-[#3d5a3e]">at work in Garnet.</span></h2></Reveal>
        <Reveal className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure>
            <Image src="/images/Getinvolved-licenseplate-75%25-interpretivesign.webp" alt="Adams House interpretive sign at Garnet, with a historic family photograph and the story of the home" width={1048} height={786} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
            <figcaption className="archive-caption text-black/65">Interpretive signs help visitors understand Garnet’s buildings and the people who lived here.</figcaption>
          </figure>
          <div><h3 className="display-type text-3xl">Interpretive signs and displays</h3><p className="mt-5 text-base leading-8 text-black/72">Funds have been used to redo existing interpretive signs and sign holders around the ghost town and the access roads. The old signs were weathered, and some had been vandalized. A couple of the interpretive displays were inaccurate, and several others needed more information.</p></div>
        </Reveal>
        <Reveal className="mt-12 grid gap-8 border-t border-black/15 pt-10 lg:grid-cols-2 lg:gap-16">
          <h3 className="display-type text-3xl">Historic building assessments</h3>
          <p className="text-base leading-8 text-black/72">Another license plate project is the hiring of History Corp to complete an assessment of Garnet’s buildings, giving BLM a road map for prioritizing work. Garnet has 27 main buildings and several smaller structures, including sheds and outhouses. All of these buildings were assessed, and the complete analysis is expected in spring 2027.</p>
        </Reveal>
      </div>
    </section>

    <section id="grants" className="paper-grain scroll-mt-28 bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
      <div className="mx-auto max-w-[82rem]">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div><p className="mb-5 text-sm font-semibold text-[#e0c46d]">Montana Ghost Town License Plate grants</p><h2 className="display-type leading-[0.95] section-heading">Supporting preservation<span className="block">across Montana.</span></h2></div>
          <div className="prose-copy text-base leading-8 text-white/74"><p>The Garnet Preservation Association is delighted to support publicly accessible historic preservation endeavors or the creation and enhancement of historic interpretive and educational programs in Montana. Grant funding is made possible through revenue generated by sales of the Ghost Town License Plate. Over the years, a wide range of nonprofit grant recipients have brought history to life across the state.</p><p>If you’re working on a project focused on preserving Montana’s rich historical legacy, we encourage you to apply for grant funding. Please carefully review the qualifications below before submitting your application.</p></div>
        </Reveal>
        <div className="mt-12 divide-y divide-white/15 border-y border-white/15">
          {[
            ["Historic buildings", "The project must involve the preservation or stabilization of a significant, publicly accessible historical building within Montana."],
            ["Historic displays", "The project must involve the creation or enhancement of historic interpretive or educational displays located within Montana."],
          ].map(([title,copy]) => <Reveal key={title} className="grid gap-5 py-8 md:grid-cols-[.65fr_1.35fr] md:gap-12"><h3 className="display-type text-3xl text-[#e0c46d]">{title}</h3><p className="max-w-2xl text-base leading-8 text-white/74">{copy}</p></Reveal>)}
        </div>
        <Reveal className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div><h3 className="display-type text-3xl">Review and reporting</h3><ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-white/74"><li>Administrative expenses will not be funded.</li><li>Applicants with 501(c)(3) designation will be given preference.</li><li>The grant application committee reviews applications and submits them to the GPA Board for final approval.</li><li>Grants are awarded as license plate funding accrues. Funds are distributed to awarded applicants in a timely manner.</li><li>A written outcome report is required within six months of project completion. Pictures are encouraged.</li></ul></div>
          <div><h3 className="display-type text-3xl">How to apply</h3><p className="mt-6 leading-8 text-white/74">Download the application and cover letter from GPA’s existing website. Submit your completed application to the GPA Grant Committee, PO Box 18295, Missoula, MT 59808.</p><a href="https://www.garnetghosttown.org/assets/files/License-plate-grant-application-2024.pdf" className="mt-6 inline-block border border-[#e0c46d]/60 px-6 py-4 font-semibold text-[#e0c46d] hover:bg-white/5">Download grant application ↗</a><a href="https://www.garnetghosttown.org/assets/files/grant-application-cover-ltr-2024.pdf" className="mt-4 block font-semibold text-[#e0c46d] underline underline-offset-4">Download cover letter ↗</a><p className="mt-4 text-sm leading-7 text-white/65">Questions? Call <a href="tel:+14063293914" className="underline underline-offset-4">406-329-3914</a>.</p></div>
        </Reveal>
      </div>
    </section>

    <section id="funded-projects" className="scroll-mt-28 px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[82rem]">
        <Reveal><p className="mb-5 text-sm font-semibold text-[#98613d]">License plate grants awarded</p><h2 className="display-type leading-[0.95] section-heading">Projects we’ve<span className="block text-[#3d5a3e]">helped preserve.</span></h2></Reveal>
        <div className="mt-12 divide-y divide-black/15 border-t border-black/15">
          {[projects[3], projects[0], projects[1], projects[2], projects[4]].map(project => <article key={project.title} className="py-10 md:py-14">
            <Reveal className={`grid items-start gap-8 lg:gap-16 ${project.image ? "lg:grid-cols-2" : "lg:grid-cols-[.65fr_1.35fr]"}`}>
              {project.image ? <figure><Image src={`/images/${project.image}`} alt={project.alt ?? ""} width={project.width ?? 1200} height={project.height ?? 900} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto max-h-[32rem] w-full object-contain object-left" /></figure> : <p className="display-type text-6xl text-[#98613d]">{project.year}</p>}
              <div><p className="text-sm font-semibold text-[#98613d]">{project.year} · {project.work}</p><h3 className="display-type mt-3 text-3xl md:text-4xl">{project.title}</h3><p className="mt-5 text-base leading-8 text-black/72">{project.summary}</p>
                <details className="mt-6 border-t border-black/15 pt-5"><summary className="cursor-pointer font-semibold text-[#3d5a3e]">Read the project history</summary><div className="prose-copy mt-5 text-base leading-8 text-black/72">{project.paragraphs.map((paragraph,index) => <p key={index}>{paragraph}</p>)}
                  {project.link && <a href={project.link} className="inline-block font-semibold text-[#3d5a3e] underline underline-offset-4">Visit the project website ↗</a>}
                  {project.title === "Bonner Milltown History Center" && <figure className="mt-6"><Image src="/images/getinvolved-licenseplategrant-Bonner Railroad Panels3.webp" alt="Bonner railroad interpretive panel titled From Montana’s Mountains to the Silver Screen, showing historic locomotive photographs" width={8100} height={5400} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" /><figcaption className="archive-caption">One of the railroad history panels supported by the 2024 license plate grant. <a href="/images/getinvolved-licenseplategrant-Bonner%20Railroad%20Panels3.webp" className="underline underline-offset-4">View full-size panel ↗</a></figcaption></figure>}</div></details>
              </div>
            </Reveal>
          </article>)}
        </div>
      </div>
    </section>
  </main>;
}
