"use client";

import { useEffect, useState } from "react";
import { Company } from "@/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";

interface CompaniesProps {
  companies: Company[];
}

export const Companies = ({ companies }: CompaniesProps) => {
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
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedHeading text="Where Our Students Work" />
        </div>
        
        <Carousel
          className="w-full max-w-6xl mx-auto"
          setApi={setCarouselApi}
          opts={{ loop: true, align: "center" }}
        >
          <CarouselContent>
            {companies.map((company) => (
              <CarouselItem
                key={company.id}
                className="basis-1/2 xs:basis-1/3 md:basis-1/4 xl:basis-1/5 flex justify-center px-2"
              >
                <div className="flex items-center justify-center h-full">
                  <img
                    src={company.logo?.url || "/placeholder.svg"}
                    alt={company.name || "Company"}
                    className="h-32 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] object-contain"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex">
            <CarouselPrevious className="-left-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
            <CarouselNext className="-right-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
          </div>
        </Carousel>
        
        <div className="flex justify-center items-center mt-6 gap-2 sm:hidden">
          {companies.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-purple-600 w-8" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
