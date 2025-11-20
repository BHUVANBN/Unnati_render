import { Blog, Company, Course, Faq, Trainer } from "@/schemas";

export type PlacementCard = {
    id?: string;
    name?: string | null;
    role?: string | null;
    company?: {
        name?: string | null;
        logo?: {
            url?: string | null;
        } | null;
    } | null;
    photoUrl?: string | null;
};

type CourseDisplay = Course & {
    subtitle?: string;
    duration?: string;
    mode?: string[];
    thumbnail?: string | { url: string };
};

const now = () => new Date("2024-01-01T00:00:00Z");

export const fallbackHero = {
    welcomeText: "Transform Your Career with Industry-Leading IT Training",
    introParagraph: "Join thousands of learners who have upskilled with expert mentors, job-ready curricula, and hands-on projects tailored for the real world.",
};

export const fallbackPremiumPartners: Company[] = Array.from({ length: 5 }).map((_, idx) => ({
    id: `fallback-premium-${idx}`,
    name: ["TechNova Systems", "CloudEdge Labs", "SecureData Corp", "NextGen Networks", "AIWave Solutions"][idx],
    isPremium: true,
    imageId: `fallback-premium-${idx}-logo`,
    createdAt: now(),
    updatedAt: now(),
    logo: {
        id: `fallback-premium-${idx}-logo`,
        url: "/placeholder.svg",
        type: "LOGO",
        createdAt: now(),
        updatedAt: now(),
    },
}));

export const fallbackCompanies: Company[] = Array.from({ length: 12 }).map((_, idx) => ({
    id: `fallback-company-${idx}`,
    name: [
        "InnovaSoft",
        "ByteBridge",
        "BluePeak Analytics",
        "QuantumStack",
        "DataForge",
        "CyberSphere",
        "NeuralNest",
        "ApexLabs",
        "OptiCore",
        "FusionMatrix",
        "VertexCloud",
        "SynapseAI",
    ][idx],
    isPremium: idx % 3 === 0,
    imageId: `fallback-company-${idx}-logo`,
    createdAt: now(),
    updatedAt: now(),
    logo: {
        id: `fallback-company-${idx}-logo`,
        url: "/placeholder.svg",
        type: "LOGO",
        createdAt: now(),
        updatedAt: now(),
    },
}));

export const fallbackPlacements: PlacementCard[] = [
    { name: "Priyansh Nema", role: "DevOps Engineer", company: { name: "Brandsmashers", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/men/31.jpg" },
    { name: "Rohit Sharma", role: "Cloud Architect", company: { name: "Google", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Nilesh Chandrawanshi", role: "Technical Support Engineer", company: { name: "Red Hat", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/men/21.jpg" },
    { name: "Bhalendra Singh Rathore", role: "Technical Consultant", company: { name: "Yes Bank", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/men/52.jpg" },
    { name: "Paridhi Jha", role: "Sr Data Engineer Analyst", company: { name: "Optum", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "Diksha Shirke", role: "Associate Cloud Engineer", company: { name: "Gate6", logo: { url: "/placeholder.svg" } }, photoUrl: "https://randomuser.me/api/portraits/women/35.jpg" },
].map((item, idx) => ({
    id: `fallback-placement-${idx}`,
    name: item.name,
    role: item.role,
    photoUrl: item.photoUrl,
    company: item.company,
})) as PlacementCard[];

export const fallbackFaqs: Faq[] = [
    {
        id: "fallback-faq-1",
        question: "How do I enroll in a course?",
        answer: "Choose your preferred course, click on Register Now, and complete the enrollment form. Our counselor will reach out within 24 hours.",
        topic: {
            id: "fallback-topic-1",
            name: "General",
            createdAt: now(),
            updatedAt: now(),
        },
        createdAt: now(),
        updatedAt: now(),
    },
    {
        id: "fallback-faq-2",
        question: "Are the classes live or recorded?",
        answer: "We offer blended learning with live mentor-led sessions and recordings for revision, plus weekly doubt-clearing clinics.",
        topic: {
            id: "fallback-topic-2",
            name: "Learning Experience",
            createdAt: now(),
            updatedAt: now(),
        },
        createdAt: now(),
        updatedAt: now(),
    },
    {
        id: "fallback-faq-3",
        question: "Do you provide placement support?",
        answer: "Yes. Every learner gets resume workshops, mock interviews, and curated job opportunities through our placement cell.",
        topic: {
            id: "fallback-topic-3",
            name: "Career",
            createdAt: now(),
            updatedAt: now(),
        },
        createdAt: now(),
        updatedAt: now(),
    },
];

export const fallbackBlogs: Blog[] = [
    {
        slug: "getting-started-with-devops",
        title: "Getting Started with DevOps in 2025",
        content: "Discover the essential tools, skills, and workflows to launch a successful DevOps career this year.",
        imageId: "fallback-blog-1",
        createdAt: now(),
        updatedAt: now(),
        thumbnail: {
            id: "fallback-blog-thumb-1",
            url: "/placeholder.svg",
            type: "BLOG",
            createdAt: now(),
            updatedAt: now(),
        },
    },
    {
        slug: "cloud-certifications-roadmap",
        title: "Cloud Certifications Roadmap",
        content: "A practical certification roadmap to stay ahead in AWS, Azure, and Google Cloud.",
        imageId: "fallback-blog-2",
        createdAt: now(),
        updatedAt: now(),
        thumbnail: {
            id: "fallback-blog-thumb-2",
            url: "/placeholder.svg",
            type: "BLOG",
            createdAt: now(),
            updatedAt: now(),
        },
    },
    {
        slug: "cybersecurity-career-guide",
        title: "Cybersecurity Career Guide",
        content: "Explore career paths, skills, and projects that make you industry-ready in cybersecurity.",
        imageId: "fallback-blog-3",
        createdAt: now(),
        updatedAt: now(),
        thumbnail: {
            id: "fallback-blog-thumb-3",
            url: "/placeholder.svg",
            type: "BLOG",
            createdAt: now(),
            updatedAt: now(),
        },
    },
];

export const fallbackCourses: CourseDisplay[] = [
    {
        id: "fallback-course-1",
        title: "AWS Cloud Practitioner Essentials",
        description: "Learn the AWS fundamentals with hands-on labs and real-world scenarios in just 6 weeks.",
        targetAudiences: ["Graduates", "Working Professionals"],
        imageId: "fallback-course-1-image",
        createdAt: now(),
        updatedAt: now(),
        additionalInfo: {
            studentsEnrolled: 5600,
            rating: 4.7,
            duration: "6 weeks",
            languages: ["English"],
            mode: ["Live Online"],
            projectsIncluded: 3,
        },
        syllabus: {
            title: ["AWS Foundations"],
            subtitle: "Core Services & Architecture",
            points: ["Identity and Access", "Compute Services", "Networking & Security"],
            imageId: "fallback-course-1-syllabus",
        },
        subtitle: "Master AWS fundamentals",
        duration: "6 weeks",
        mode: ["Live Online"],
        thumbnail: {
            id: "fallback-course-1-thumbnail",
            url: "/placeholder.svg",
            type: "COURSE",
            createdAt: now(),
            updatedAt: now(),
        },
    },
    {
        id: "fallback-course-2",
        title: "Red Hat Certified System Administrator",
        description: "Master Linux administration, SELinux, and automation to ace the RHCSA certification exam.",
        targetAudiences: ["System Administrators", "IT Professionals"],
        imageId: "fallback-course-2-image",
        createdAt: now(),
        updatedAt: now(),
        additionalInfo: {
            studentsEnrolled: 7100,
            rating: 4.8,
            duration: "8 weeks",
            languages: ["English", "Hindi"],
            mode: ["Offline", "Hybrid"],
            projectsIncluded: 4,
        },
        syllabus: {
            title: ["Linux Foundations"],
            subtitle: "System Administration Essentials",
            points: ["User Management", "Storage", "Networking"],
            imageId: "fallback-course-2-syllabus",
        },
        subtitle: "Hands-on Linux mastery",
        duration: "8 weeks",
        mode: ["Offline", "Hybrid"],
        thumbnail: {
            id: "fallback-course-2-thumbnail",
            url: "/placeholder.svg",
            type: "COURSE",
            createdAt: now(),
            updatedAt: now(),
        },
    },
    {
        id: "fallback-course-3",
        title: "Advanced Cybersecurity Bootcamp",
        description: "Hands-on offensive and defensive security labs covering SOC operations, SIEM, and incident response.",
        targetAudiences: ["Security Analysts", "Graduates"],
        imageId: "fallback-course-3-image",
        createdAt: now(),
        updatedAt: now(),
        additionalInfo: {
            studentsEnrolled: 4200,
            rating: 4.6,
            duration: "10 weeks",
            languages: ["English"],
            mode: ["Live Online"],
            projectsIncluded: 5,
        },
        syllabus: {
            title: ["Security Engineering"],
            subtitle: "Threat Detection & Mitigation",
            points: ["Network Security", "Threat Hunting", "Incident Response"],
            imageId: "fallback-course-3-syllabus",
        },
        subtitle: "Become a job-ready security analyst",
        duration: "10 weeks",
        mode: ["Live Online"],
        thumbnail: {
            id: "fallback-course-3-thumbnail",
            url: "/placeholder.svg",
            type: "COURSE",
            createdAt: now(),
            updatedAt: now(),
        },
    },
];

export const fallbackTrainers: Trainer[] = [
    {
        id: "fallback-trainer-1",
        name: "Anita Verma",
        bio: "Cloud architect with 12 years of experience across AWS and Azure enterprise deployments.",
        expertise: "Cloud & DevOps",
        experience: "12",
        designation: "Principal Cloud Trainer",
        photo: {
            id: "trainer-1-photo",
            url: "https://randomuser.me/api/portraits/women/68.jpg",
            type: "TRAINER" as const,
            createdAt: now(),
            updatedAt: now()
        },
        createdAt: now(),
        updatedAt: now(),
    },
    {
        id: "fallback-trainer-2",
        name: "Prateek Sharma",
        bio: "Linux evangelist and Red Hat certified instructor helping teams modernize infrastructure.",
        expertise: "Linux & Automation",
        experience: "10",
        designation: "Lead Linux Trainer",
        photo: {
            id: "trainer-2-photo",
            url: "https://randomuser.me/api/portraits/men/32.jpg",
            type: "TRAINER" as const,
            createdAt: now(),
            updatedAt: now()
        },
        createdAt: now(),
        updatedAt: now(),
    },
    {
        id: "fallback-trainer-3",
        name: "Sneha Kulkarni",
        bio: "Cybersecurity mentor with a focus on ethical hacking, SOC operations, and compliance.",
        expertise: "Cybersecurity",
        experience: "9",
        designation: "Senior Security Specialist",
        photo: {
            id: "trainer-3-photo",
            url: "https://randomuser.me/api/portraits/women/44.jpg",
            type: "TRAINER" as const,
            createdAt: now(),
            updatedAt: now()
        },
        createdAt: now(),
        updatedAt: now(),
    },
];
