import { Usp } from "@/schemas";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Laptop, Boxes } from "lucide-react";
import { AnimatedHeading } from "../animated-heading";

const mockUsps: Usp[] = [
  {
    id: "1",
    heading: "Classroom Training",
    subheading: "Traditional in-person learning with direct instructor interaction and peer collaboration.",
    bulletPoints: [
      "Face-to-face interaction",
      "Group discussions",
      "Hands-on lab sessions",
      "Immediate doubt clearing",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    heading: "Online Training Class",
    subheading: "Flexible virtual instructor-led training sessions at your convenient hours.",
    bulletPoints: [
      "Live interactive sessions",
      "Recorded sessions available",
      "Flexible scheduling",
      "Remote lab access",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    heading: "Corporate Training",
    subheading: "Customized training programs designed specifically for corporate teams and organizations.",
    bulletPoints: [
      "Customized curriculum",
      "On-site training options",
      "Bulk pricing",
      "Progress tracking",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const icons = [
  <Users key="users" size={48} className="text-accent" />,
  <Laptop key="laptop" size={48} className="text-accent" />,
  <Boxes key="boxes" size={48} className="text-accent" />,
];

export const TrainingModes = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Training Modes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the learning format that best fits your schedule and learning style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockUsps.map((usp, i) => (
            <Card key={i} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    {icons[i]}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{usp.heading}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{usp.subheading}</p>
                
                <ul className="space-y-3">
                  {usp.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
