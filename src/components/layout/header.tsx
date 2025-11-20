"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { Search, Menu, X, Mail, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/placements", label: "Placements" },
    { href: "/trainers", label: "Trainers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export interface HeaderProps {
    logoUrl: string;
    phone: string;
    email: string;
    social?: {
        facebook?: string;
        linkedin?: string;
        instagram?: string;
        twitter?: string;
    };
    showCoursesNewBadge?: boolean;
}

export const Header = ({ logoUrl, phone, email, social, showCoursesNewBadge = false }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const activeMap = useMemo(() => {
        const current = pathname || "/";
        const map: Record<string, boolean> = {};
        navLinks.forEach(({ href }) => {
            if (href === "/") {
                map[href] = current === "/";
            } else {
                map[href] = current.startsWith(href);
            }
        });
        return map;
    }, [pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="w-full bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-between px-6 py-3 text-xs text-white/90 border-b border-white/20 relative z-[60]">
                <div className="flex items-center gap-6">
                    {phone && (
                        <span className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone size={16} className="inline-block" />
                            <span className="font-medium">{phone}</span>
                        </span>
                    )}
                    {email && (
                        <span className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={16} className="inline-block" />
                            <span className="font-medium">{email}</span>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <Link href={social?.facebook || "#"} target="_blank" aria-label="Facebook" className="hover:text-sky-200 transition-colors">
                        <Facebook size={18} />
                    </Link>
                    <Link href={social?.linkedin || "#"} target="_blank" aria-label="LinkedIn" className="hover:text-sky-200 transition-colors">
                        <Linkedin size={18} />
                    </Link>
                    <Link href={social?.instagram || "#"} target="_blank" aria-label="Instagram" className="hover:text-pink-300 transition-colors">
                        <Instagram size={18} />
                    </Link>
                    <Link href={social?.twitter || "#"} target="_blank" aria-label="Twitter" className="hover:text-sky-200 transition-colors">
                        <Twitter size={18} />
                    </Link>
                </div>
            </div>
            {/* Header Nav */}
            <nav className={`fixed top-10 left-0 right-0 w-full transition-all duration-300 z-[60] bg-white shadow-lg border-b border-gray-200`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Link href="/" aria-label="Home">
                            <Image
                                src={logoUrl || "/placeholder.svg"}
                                alt="Logo"
                                width={180}
                                height={70}
                                className="h-14 w-auto md:h-16 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav links - Using primary color for main navigation */}
                    <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-semibold text-gray-800 transition-colors duration-300">
                        {navLinks.map((link) => {
                            const showBadge = showCoursesNewBadge && link.href === "/courses";
                            const isActive = activeMap[link.href];
                            return (
                            <motion.li
                                key={link.href}
                                className="relative"
                                initial="rest"
                                whileHover="hover"
                                animate={isActive ? "active" : "rest"}
                            >
                                <Link
                                    href={link.href}
                                    className={`transition-all duration-300 focus:outline-none px-4 py-3 rounded-xl relative text-sm lg:text-base ${
                                        isActive 
                                            ? "text-sky-600 bg-sky-50"
                                            : "hover:text-sky-600 hover:bg-sky-50 focus:text-sky-600"
                                    }`}
                                >
                                    {link.label}
                                    {showBadge && (
                                        <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white">
                                            New
                                        </Badge>
                                    )}
                                    <motion.span
                                        variants={{
                                            rest: { scaleX: 0 },
                                            hover: { scaleX: 1 },
                                            active: { scaleX: 1 },
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={`origin-left absolute left-4 -bottom-1 h-[3px] w-[calc(100%-2rem)] rounded-full ${
                                            isScrolled ? 'bg-sky-600' : 'bg-white'
                                        }`}
                                        style={{ display: "block" }}
                                    />
                                </Link>
                            </motion.li>
                            );
                        })}
                    </ul>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Desktop CTA Button - Glassmorphism effect */}
                        <Button
                            asChild
                            className="font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm border bg-sky-600 hover:bg-sky-700 text-white border-sky-600"
                        >
                            <Link href="/demo-class">Demo Class</Link>
                        </Button>
                    </div>

                    {/* Mobile menu toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden rounded-full transition-colors duration-300 text-gray-800 hover:bg-gray-100"
                        aria-label="Toggle mobile menu"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu - Using glassmorphism effect */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-lg shadow-lg">
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => {
                                const showBadge = showCoursesNewBadge && link.href === "/courses";
                                const isActive = activeMap[link.href];
                                return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block py-3 px-2 rounded-md transition-all duration-200 font-medium ${
                                        isActive
                                            ? "text-white bg-white/20"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        {link.label}
                                        {showBadge && (
                                            <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white">
                                                New
                                            </Badge>
                                        )}
                                    </span>
                                </Link>
                                );
                            })}

                            {/* Mobile CTA Button - Glassmorphism effect */}
                            <div className="pt-4 border-t border-white/20">
                                <Link
                                    href="/demo-class"
                                    className="block w-full text-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-3 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Demo Class
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
