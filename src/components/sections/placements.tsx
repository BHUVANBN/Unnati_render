"use client";

import { User, Linkedin, Mail } from "lucide-react";

export type PlacementCard = {
  id?: string;
  name?: string | null;
  role?: string | null;
  photo?: {
    url?: string | null;
  } | null;
  description?: string | null;
  linkedin?: string | null;
  email?: string | null;
  company?: {
    name?: string | null;
    logo?: {
      url?: string | null;
    } | null;
  } | null;
  package?: string | null;
};

interface PlacementsProps {
  placements?: PlacementCard[];
}

export const fallbackPlacements: PlacementCard[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Software Engineer",
    photo: {
      url: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    description: "Successfully placed as Software Engineer at Google. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/rahulsharma",
    email: "rahul.sharma@example.com",
    company: {
      name: "Google",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
    },
    package: "45 LPA",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Frontend Developer",
    photo: {
      url: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    description: "Successfully placed as Frontend Developer at Microsoft. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/priyapatel",
    email: "priya.patel@example.com",
    company: {
      name: "Microsoft",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Microsoft_logo.svg",
      },
    },
    package: "38 LPA",
  },
  {
    id: "3",
    name: "Amit Kumar",
    role: "DevOps Engineer",
    photo: {
      url: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    description: "Successfully placed as DevOps Engineer at Amazon. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/amitkumar",
    email: "amit.kumar@example.com",
    company: {
      name: "Amazon",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
    },
    package: "42 LPA",
  },
  {
    id: "4",
    name: "Neha Singh",
    role: "Data Scientist",
    photo: {
      url: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    description: "Successfully placed as Data Scientist at Meta. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/nehasingh",
    email: "neha.singh@example.com",
    company: {
      name: "Meta",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      },
    },
    package: "48 LPA",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    role: "Backend Developer",
    photo: {
      url: "https://randomuser.me/api/portraits/men/79.jpg",
    },
    description: "Successfully placed as Backend Developer at Netflix. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/vikramreddy",
    email: "vikram.reddy@example.com",
    company: {
      name: "Netflix",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
      },
    },
    package: "40 LPA",
  },
  {
    id: "6",
    name: "Anjali Gupta",
    role: "Product Manager",
    photo: {
      url: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    description: "Successfully placed as Product Manager at Apple. Demonstrating exceptional skills and dedication to achieve outstanding career results.",
    linkedin: "https://linkedin.com/in/anjaligupta",
    email: "anjali.gupta@example.com",
    company: {
      name: "Apple",
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      },
    },
    package: "52 LPA",
  },
];

export const Placements = ({ placements }: PlacementsProps) => {
  const displayPlacements = placements?.length ? placements : fallbackPlacements;

  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Placements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our students are placed at top companies with excellent packages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPlacements.map((placement, idx) => (
            <div
              key={placement.id ?? `fallback-placement-${idx}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* Student Image */}
              <div className="relative overflow-hidden">
                {placement.photo?.url ? (
                  <img
                    src={placement.photo?.url}
                    alt={placement.name ?? "Student"}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-sky-600" />
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                    {placement.name}
                  </h3>
                  <div className="text-sky-600 font-semibold text-lg mb-2">
                    {placement.role}
                  </div>
                  <div className="text-gray-700 font-medium mb-3">
                    {placement.company?.name}
                  </div>
                  {placement.package && (
                    <div className="inline-block bg-gradient-to-r from-sky-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm mb-4">
                      {placement.package}
                    </div>
                  )}
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {placement.description || `Successfully placed as ${placement.role} at ${placement.company?.name || 'a leading company'}. Demonstrating exceptional skills and dedication to achieve outstanding career results.`}
                  </div>
                </div>
                
                {/* Social Links (Optional - can be added later) */}
                <div className="mt-6 flex justify-center space-x-3">
                  {placement.linkedin && (
                    <a
                      href={placement.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-sky-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {placement.email && (
                    <a
                      href={`mailto:${placement.email}`}
                      className="w-10 h-10 bg-gray-100 hover:bg-sky-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
