import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface HeroProps {
    welcomeText?: string;
    introParagraph?: string;
    imageUrl?: string;
}

const stats = [
    { label: "Success Rate", value: "98%" },
    { label: "Students Trained", value: "10,000+" },
    { label: "Placements", value: "2,500+" },
    { label: "Courses", value: "20+" },
];

export const Hero = ({ welcomeText, introParagraph, imageUrl }: HeroProps) => {
    const backgroundImage = imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    
    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{
                backgroundImage: `url('${backgroundImage}')`,
                filter: "blur(2px)"
            }}>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-black/10">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Event badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-8 shadow-xl">
                        <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                        <span className="text-white text-base font-semibold">Now Enrolling for 2024 - Limited Seats Available</span>
                    </div>
                    
                    <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight tracking-tight px-4">
                        <span className="block bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                            {welcomeText}
                        </span>
                    </h1>
                    
                    {introParagraph && (
                        <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
                            {introParagraph}
                        </p>
                    )}
                    
                    {/* Feature badges with clean styling */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 px-4">
                        <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                Redhat Courses
                            </span>
                        </div>
                        <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                AWS Courses
                            </span>
                        </div>
                        <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                Cyber Security
                            </span>
                        </div>
                        <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                DevOps
                            </span>
                        </div>
                    </div>
                    
                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4">
                        <Button className="w-full sm:w-auto px-8 py-4 bg-white text-sky-600 hover:bg-sky-50 font-bold text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Get Started Today
                        </Button>
                        <Button variant="outline" asChild className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 font-bold text-base rounded-full transition-all duration-300 hover:scale-105">
                            <Link href="#register">View Courses &rarr;</Link>
                        </Button>
                    </div>
                    
                    {/* Stats with clean glassmorphism effect */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-4">
                        {stats.map((stat) => (
                            <Card key={stat.label} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white/90 text-sm sm:text-base text-center font-medium">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureBadge = ({ label }: { label: string }) => (
    <span className="flex items-center gap-1.5 sm:gap-2 font-medium bg-background/70 backdrop-blur px-3 py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm border border-border/50 shadow-sm">
        <span className="text-secondary">&#10003;</span>{label}
    </span>
);
