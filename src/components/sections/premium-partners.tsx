"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";
import { Company } from "@/schemas";

interface PremiumPartnersProps {
    partners?: Company[];
}

export const PremiumPartners = ({ partners = [] }: PremiumPartnersProps) => {
    const display = useMemo(() => (Array.isArray(partners) ? partners : []), [partners]);
    const [carouselApi, setCarouselApi] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!carouselApi) return;
        const handler = () => setActiveIndex(carouselApi.selectedScrollSnap());
        carouselApi.on("select", handler);
        handler();
        return () => {
            carouselApi.off?.("select", handler);
        };
    }, [carouselApi]);

    return (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <AnimatedHeading text="Premium Partners" />
                    <p className="text-xl text-gray-600 mt-4">Where Our Students Work</p>
                </div>
                
                <Carousel
                    className="w-full max-w-6xl mx-auto"
                    setApi={setCarouselApi}
                    opts={{ loop: true, align: "center" }}
                >
                    <CarouselContent>
                        {display.map((partner) => (
                            <CarouselItem
                                key={partner.id}
                                className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 flex justify-center px-2"
                            >
                                <div className="flex items-center justify-center h-full">
                                    <img
                                        src={partner.logo?.url || "/placeholder.svg"}
                                        alt={partner.name}
                                        className="h-32 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden sm:flex">
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                    </div>
                </Carousel>
                
                <div className="flex justify-center items-center gap-1.5 sm:hidden mt-8">
                    {display.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-4 h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-foreground" : "bg-muted-foreground/30"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
