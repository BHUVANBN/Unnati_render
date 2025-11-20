"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export type TestimonialPlacement = {
  name?: string | null;
  photo?: {
    url: string;
  } | null;
  company?: {
    logo?: {
      url?: string | null;
    } | null;
  } | null;
};

export type TestimonialCard = {
  id?: string;
  content?: string | null;
  rating?: number | null;
  placement?: TestimonialPlacement | null;
};

interface TestimonialCardProps {
  name: string;
  photoUrl: string;
  content: string;
  rating: number;
  companyLogoUrl?: string;
}

const TestimonialCardComponent = ({ name, photoUrl, content, rating, companyLogoUrl }: TestimonialCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const displayContent = expanded ? content : (content.length > 150 ? content.slice(0, 150) + "..." : content);
  
  return (
    <Card className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="relative z-10 p-6 flex flex-col h-full">
        {/* Rating stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        
        {/* Content */}
        <p className="text-gray-700 mb-6 flex-grow leading-relaxed text-sm">
          {displayContent}
          {content.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sky-600 hover:text-sky-700 font-medium ml-1"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
        
        {/* Author info */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="font-semibold text-gray-900 text-sm">{name}</div>
            {companyLogoUrl && (
              <div className="w-20 h-8 mt-1">
                <img
                  src={companyLogoUrl}
                  alt="Company"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const fallbackTestimonials: TestimonialCard[] = [
  {
    id: "mock1",
    rating: 5,
    content: "I had an exceptional experience at ITE Bhopal. The quality of coaching provided by the instructors was top-notch.",
    placement: {
      name: "chandravir.singh",
      photo: {
        url: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      company: {
        logo: {
          url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        },
      },
    },
  },
  {
    id: "mock2",
    rating: 4,
    content: "Great learning environment and supportive staff. Highly recommend!",
    placement: {
      name: "anonymous",
      photo: {
        url: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      company: {
        logo: {
          url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        },
      },
    },
  },
  {
    id: "mock3",
    rating: 5,
    content: "The practical training and real-world projects helped me land my dream job. Thank you ITE!",
    placement: {
      name: "rajesh.kumar",
      photo: {
        url: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      company: {
        logo: {
          url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Microsoft_logo.svg",
        },
      },
    },
  },
  {
    id: "mock4",
    rating: 5,
    content: "Excellent curriculum and hands-on projects. The trainers are very knowledgeable.",
    placement: {
      name: "bhuvan.bn",
      photo: {
        url: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      company: {
        logo: {
          url: "https://res.cloudinary.com/dxfpm6vjo/image/upload/v1763226688/vodn6yfdubnwncr3hj53.png",
        },
      },
    },
  },
  {
    id: "mock5",
    rating: 4,
    content: "The placement assistance was remarkable. They helped me secure a great position at a top company.",
    placement: {
      name: "priya.sharma",
      photo: {
        url: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      company: {
        logo: {
          url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        },
      },
    },
  },
];

interface TestimonialsProps {
  testimonials?: TestimonialCard[];
}

export const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  const testimonialList = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  // Auto-scroll logic for carousel
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselApi]);
  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", () => {
        setActiveIndex(carouselApi.selectedScrollSnap());
      });
    }
  }, [carouselApi]);

  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Reviews From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Students</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what our successful students have to say about their learning journey
          </p>
        </div>
        
        <Carousel
          className="w-full max-w-6xl mx-auto"
          setApi={setCarouselApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {testimonialList.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex justify-center basis-full md:basis-1/2 lg:basis-1/3 px-4"
              >
                <TestimonialCardComponent
                  name={testimonial.placement?.name || "Anonymous"}
                  photoUrl={testimonial.placement?.photo?.url || "/avatar.svg"}
                  content={testimonial.content ?? ""}
                  rating={testimonial.rating ?? 5}
                  companyLogoUrl={testimonial.placement?.company?.logo?.url ?? undefined}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation buttons */}
          <div className="hidden md:block">
            <CarouselPrevious className="bg-white shadow-lg border border-gray-200 hover:bg-gray-50" />
            <CarouselNext className="bg-white shadow-lg border border-gray-200 hover:bg-gray-50" />
          </div>
        </Carousel>
        
        {/* Dots for mobile */}
        <div className="flex justify-center items-center mt-8 gap-2 md:hidden">
          {testimonialList.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? "bg-gradient-to-r from-sky-600 to-blue-600 w-8" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
