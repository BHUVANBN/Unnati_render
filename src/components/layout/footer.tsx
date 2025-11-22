import Image from "next/image";
import { Instagram, Facebook, Linkedin, Twitter, Phone, Mail } from "lucide-react";
import { Link } from "next-view-transitions";

interface FooterProps {
    logoUrl: string;
}

export const Footer = ({ logoUrl }: FooterProps) => {
    const listOne = ["AWS Certification", "RedHat Training", "Cybersecurity", "DevOps"];
    const listTwo = ["Placement Support", "Interview Prep", "Resume Building", "Career Guidance"];
    return (
        <footer className="bg-gradient-to-br from-sky-800 via-sky-700 to-blue-800 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            
            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24">
                <div className="grid grid-cols-1 gap-12 sm:gap-16 md:gap-8 lg:grid-cols-4">
                    {/* Logo + Tagline */}
                    <div className="flex flex-col lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src={logoUrl}
                                alt="Logo"
                                width={180}
                                height={70}
                                className="object-contain w-40 h-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm leading-relaxed text-white/80 mb-6">
                            Empowering students with industry-leading skills and certifications for a brighter tomorrow in the tech world.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Facebook size={18} className="text-white" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Linkedin size={18} className="text-white" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Instagram size={18} className="text-white" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Twitter size={18} className="text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Courses Links */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Popular Courses</h3>
                        <ul className="space-y-4">
                            {listOne.map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Student Services</h3>
                        <ul className="space-y-4">
                            {listTwo.map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center">
                                    <Phone size={18} className="text-sky-300" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <p className="text-white/80 text-sm">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center">
                                    <Mail size={18} className="text-sky-300" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <p className="text-white/80 text-sm">info@unnatiit.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-sm">
                            © 2026 Unnati IT Solutions. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
