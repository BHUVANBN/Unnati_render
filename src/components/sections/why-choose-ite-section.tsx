"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Replaced local placeholder images with high-quality remote images (Unsplash)
const labImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
];
const seminarImages = [
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde16?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573495628364-6b1acb260507?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=800&q=80"
];

const features = [
  "100% Placement Assistance",
  "Industry Expert Faculty",
  "Hands-on Practical Training",
  "International Certifications",
  "Flexible Training Modes"
];

export const WhyChooseITESection = () => {

  // Auto-scroll logic for carousels using Embla API
  const [labApi, setLabApi] = useState<any>(null);
  const [seminarApi, setSeminarApi] = useState<any>(null);
  const [labIndex, setLabIndex] = useState(0);
  const [seminarIndex, setSeminarIndex] = useState(0);

  useEffect(() => {
    if (!labApi) return;
    const interval = setInterval(() => {
      labApi.scrollPrev();
    }, 5000);
    return () => clearInterval(interval);
  }, [labApi]);

  useEffect(() => {
    if (!seminarApi) return;
    const interval = setInterval(() => {
      seminarApi.scrollNext();
    }, 5100);
    return () => clearInterval(interval);
  }, [seminarApi]);

  useEffect(() => {
    if (labApi) {
      labApi.on("select", () => {
        setLabIndex(labApi.selectedScrollSnap());
      });
    }
    if (seminarApi) {
      seminarApi.on("select", () => {
        setSeminarIndex(seminarApi.selectedScrollSnap());
      });
    }
  }, [labApi, seminarApi]);

  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">ITE</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes us the premier choice for IT education and career advancement
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Carousels */}
          <div className="flex flex-col gap-12">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ITE Smart Lab</h3>
              <Carousel opts={{ loop: true }} setApi={setLabApi} className="relative">
                <CarouselContent>
                  {labImages.map((_, i) => (
                    <CarouselItem key={i} className="flex justify-center sm:basis-1/3 space-x-0">
                      <img src={labImages[labImages.length - 1 - i]} alt="ITE Smart Lab" className="w-full h-48 sm:h-56 object-cover rounded-2xl" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
                <CarouselNext className="right-4 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
              </Carousel>
              {/* Dots below carousel */}
              <div className="flex justify-center items-center mt-4 gap-2">
                {labImages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${labIndex === i ? "bg-sky-600 w-8" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ITE Seminar</h3>
              <Carousel opts={{ loop: true }} setApi={setSeminarApi} className="relative">
                <CarouselContent >
                  {seminarImages.map((src, i) => (
                    <CarouselItem key={i} className="flex justify-center sm:basis-1/3 space-x-0">
                      <img src={src} alt="ITE Seminar" className="w-full h-48 sm:h-56 object-cover rounded-2xl" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
                <CarouselNext className="right-4 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10" />
              </Carousel>
              {/* Dots below carousel */}
              <div className="flex justify-center items-center mt-4 gap-2">
                {seminarImages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${seminarIndex === i ? "bg-sky-600 w-8" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Empowering future tech professionals with real-world training, globally aligned certifications, and mentorship from seasoned industry experts.
              </p>
              <ul className="mb-8 space-y-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-sky-600 to-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="text-white" size={16} />
                    </div>
                    <span className="text-gray-700 text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-sky-500/25 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
