import { Blogs } from "@/components/sections/blogs";
import { FAQs } from "@/components/sections/faqs";
import { Hero } from "@/components/sections/hero";
import { PremiumPartners } from "@/components/sections/premium-partners";
import { Placements } from "@/components/sections/placements";
import { Companies } from "@/components/sections/companies";
import { UpcomingBatches } from "@/components/sections/upcoming-batches";
import { TrainingModes } from "@/components/sections/training-modes";
import { WhyChooseITESection } from "@/components/sections/why-choose-ite-section";
import { Testimonials, TestimonialCard } from "@/components/sections/testimonials";
import { db } from "@/lib/db";
import {
    fallbackHero,
    fallbackPremiumPartners,
    fallbackCompanies,
    fallbackPlacements,
    fallbackFaqs,
    fallbackBlogs,
    PlacementCard,
} from "@/lib/fallback-content";

export default async function Home() {
    const settings = await db.setting.findFirst({
        select: {
            welcomeText: true,
            introParagraph: true
        }
    })
    const hero = await db.image.findFirst({
        where: {
            type: "HERO"
        },
        select: {
            url: true
        }
    })
    const partners = await db.company.findMany({
        where: {
            isPremium: true
        },
        include: {
            logo: true
        },
        take:5
    })
    const companies = await db.company.findMany({
        include: {
            logo: true
        },
        take:20
    })
    const placements = await db.placement.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 10,
        include: {
            company: {
                include: {
                    logo: true
                }
            },
        }
    })
    const testimonials = await db.testimonial.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 10,
        include: {
            placement: {
                include: {
                    company: {
                        include: {
                            logo: true
                        }
                    },
                    photo: true
                }
            }
        }
    })

    const faqs = await db.faq.findMany({
        where: {
            topic: {
                name: "General"
            }
        },
        take:10,
        include:{
            topic:true
        }
    })

    const blogs = await db.blog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 3,
        include: {
            thumbnail: true
        }
    })

    const welcomeText = settings?.welcomeText || fallbackHero.welcomeText;
    const introParagraph = settings?.introParagraph || fallbackHero.introParagraph;
    const heroImageUrl = hero?.url || "/hero.png";
    const partnerItems = partners.length > 0 ? partners : fallbackPremiumPartners;
    const companyItems = companies.length > 0 ? companies : fallbackCompanies;
    const placementSource = placements.length > 0 ? placements : fallbackPlacements;
    const placementItems: PlacementCard[] = placementSource.map((placement: any) => {
        const logoRecord = placement?.company?.logo;
        const logoUrl = typeof logoRecord === "string" ? logoRecord : logoRecord?.url ?? null;
        const photoCandidate = placement?.photoUrl ?? null;

        return {
            id: placement?.id,
            name: placement?.name ?? null,
            role: placement?.role ?? null,
            company: placement?.company
                ? {
                    name: placement.company?.name ?? null,
                    logo: logoUrl ? { url: logoUrl } : undefined,
                }
                : undefined,
            photoUrl: photoCandidate,
        };
    });
    const testimonialItems: TestimonialCard[] = testimonials.map((testimonial: any) => {
        const placement = testimonial?.placement;
        const logoRecord = placement?.company?.logo;
        const logoUrl = typeof logoRecord === "string" ? logoRecord : logoRecord?.url ?? null;
        const photoRecord = placement?.photo;
        const photoUrl = typeof photoRecord === "string" ? photoRecord : photoRecord?.url ?? null;

        return {
            id: testimonial?.id,
            content: testimonial?.content ?? null,
            rating: testimonial?.rating ?? null,
            placement: placement
                ? {
                    name: placement?.name ?? null,
                    photo: photoUrl ? { url: photoUrl } : null,
                    company: logoUrl
                        ? {
                            logo: {
                                url: logoUrl,
                            },
                        }
                        : undefined,
                }
                : undefined,
        };
    });
    const faqItems = faqs.length > 0 ? faqs : fallbackFaqs;
    const blogItems = blogs.length > 0 ? blogs : fallbackBlogs;

    return (
        <main className="min-h-screen">
            <Hero 
                welcomeText={welcomeText} 
                introParagraph={introParagraph} 
                imageUrl={hero?.url}
            />
            <PremiumPartners partners={partnerItems} />
            <Companies companies={companyItems} />
            <Placements placements={placementItems} />
            <UpcomingBatches />
            <TrainingModes />
            <WhyChooseITESection />
            <Testimonials testimonials={testimonialItems} />
            <FAQs items={faqItems} />
            <Blogs blogs={blogItems} />
        </main>
    );
}
