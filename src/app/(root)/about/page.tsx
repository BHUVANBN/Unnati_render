import { AnimatedHeading } from "@/components/animated-heading";

const specialistDescription = `Unnati Development and Training Centre Pvt Ltd, founded in 2001, is a global IT training company with a clear vision of providing quality education to individuals and corporates. We have partnered with Red Hat to deliver training for their leading IT certification courses in System Administration, OpenStack, Ansible, Puppet, OpenShift, Cloud Computing, Enterprise Virtualization, Clustering & Storage Solutions, and DevOps Automation.`;

const facilitiesDescription = `We operate two state-of-the-art campuses in Aurangabad, Maharashtra, located at CIDCO and Beed By Pass. The head office at CIDCO spans 950 sq.ft with four labs and an office. The Beed By Pass branch covers 750 sq.ft with three labs and an office. Our campuses host around 30 high-configuration machines and uninterrupted power backup.`;

const missionStatement = `Provide a quality product/service that exceeds the expectations of our students—no exceptions. We deliver programs ranging from foundational computer literacy to highly advanced enterprise technologies.`;

const differenceStatement = `Every member of our team understands the complete spectrum of services we offer. We promote accountability and inclusiveness, which strengthens our relationships. With a broad platform that includes hybrid cloud infrastructure, middleware, responsive integration, cloud-native application development, and automation solutions, we help organizations confidently adapt to digital change using Red Hat technologies.`;

const director = {
    name: "Ashutosh S. Bhakare",
    title: "Director & Corporate Trainer (Linux, Cloud, JBoss, DevOps)",
    image: "https://unnatidevelopment.in/wp-content/uploads/2020/01/Ashutosh_S_Bhakare-200x308-removebg-preview.png",
    about: [
        "Awarded Best Red Hat Certified Instructor two times in a row.",
        "Red Hat Certified Instructor & Consultant with 22 years of experience in Linux and open source technologies.",
        "Focused on solving business challenges with tailored open source solutions and meticulous documentation."
    ],
    trainingProfile: [
        "Corporate Trainer on Linux, Cloud, JBoss, DevOps",
        "SCI, RHCI, JBCI, RHCA-XI*, MCP, CCNA, CKA, CKS, Google Authorised Trainer, RHCSA RHEL9",
        "Active Fedora contributor: https://fedoraproject.org/wiki/User:Ashutoshbhakare"
    ],
    certifications: [
        "Red Hat Certified Engineer",
        "SUSE Certified Engineer",
        "Certified Ethical Hacker",
        "Certified Kubernetes Administrator",
        "Red Hat Certified Specialist in Configuration Management",
        "Red Hat Certificate of Expertise in Ansible Automation",
        "Red Hat Certified JBoss Administrator",
        "Red Hat Certified System Administrator in Red Hat OpenStack",
        "Red Hat Certified Security Specialist",
        "Red Hat Certificate of Expertise in Clustering and Storage Management",
        "Red Hat Certificate of Expertise in Platform as a Service",
        "Red Hat Certificate of Expertise in Linux Diagnostics and Troubleshooting",
        "Red Hat Certificate of Expertise in Hybrid Cloud Storage",
        "Red Hat Certificate of Expertise in Server Hardening",
        "Red Hat Certified Virtualization Administrator"
    ]
};

const staff = [
    {
        name: "Mrs. Rachana A. Bhakare",
        image: "https://unnatidevelopment.in/wp-content/uploads/2022/08/Rachna-Bhakre-1.png",
        education: "B.Sc; RHCSA, RHCE, Cloud, RHCVA",
        experience: "4+ years across RHCSA, RHCE, Python programming, and databases.",
        domain: "Specialist in Linux fundamentals & advanced features alongside Python and database training."
    },
    {
        name: "Mr. Ankush Kathar",
        image: "https://unnatidevelopment.in/wp-content/uploads/2020/01/IMG_5661-removebg-preview.png",
        education: "Red Hat OpenShift Certified, RHCSA, RHCE, Cloud",
        experience: "10+ years of experience with OpenShift, multiple cloud platforms, RHCSA, and RHCE.",
        domain: "Expert in cloud orchestration, OpenShift, and advanced Linux administration."
    },
    {
        name: "Mr. Pavan S. Wankhade",
        image: "https://unnatidevelopment.in/wp-content/uploads/2020/01/IMG_5662-removebg-preview.png",
        education: "M.E. (CSE), SCA, RHCSA, RHCE, Cloud, Python",
        experience: "7+ years in Python, automation, cloud platforms, Linux, CI/CD, and corporate training.",
        domain: "Delivers programs in Python automation, Ansible, Terraform, cloud administration, and DevOps tooling."
    }
];

const stats = [
    { value: "3500+", label: "Certified Students" },
    { value: "3200", label: "Placed Students" },
    { value: "4", label: "Corporate Trainers" },
    { value: "3", label: "Cities" },
    { value: "100+", label: "Corporate Trainings" }
];

const deliverables = [
    "Online Lab",
    "E-learning Content",
    "Red Hat Global Exam (PE110)",
    "Three Participation Certificates"
];

export default function AboutPage() {
    return (
        <div className="space-y-20 pb-16">
            <section className="bg-gradient-to-br from-secondary/20 via-secondary/10 to-background">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-32 pb-16 text-center sm:pt-36 sm:pb-20">
                    <AnimatedHeading text="About Unnati Development Centre" />
                    <p className="max-w-3xl text-sm sm:text-base text-muted-foreground">
                        Empowering professionals since 2001 with industry-aligned training, Red Hat partnerships, and a relentless focus on quality education for individuals and corporate teams.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="space-y-5">
                    <h2 className="text-3xl font-semibold">Why We Are Specialists</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{specialistDescription}</p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg">
                    <h3 className="text-xl font-semibold">Facilities We Provide</h3>
                    <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line">{facilitiesDescription}</p>
                </div>
            </section>

            <section className="bg-secondary/10">
                <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 text-center sm:py-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold">Our Mission</h2>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{missionStatement}</p>
                    </div>
                    <div className="rounded-3xl bg-background p-8 shadow-lg">
                        <h3 className="text-2xl font-semibold">Our Difference</h3>
                        <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line">{differenceStatement}</p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4">
                <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-secondary/40 bg-card p-6 shadow-sm">
                            <div className="text-3xl font-bold text-accent">{stat.value}</div>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-md">
                        <img
                            src={director.image}
                            alt={director.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                            <h2 className="text-3xl font-semibold text-foreground">{director.name}</h2>
                            <p className="text-accent font-medium">{director.title}</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-foreground">About</h3>
                            <ul className="space-y-1">
                                {director.about.map((item) => (
                                    <li key={item} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-md">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Training Profile</h3>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                            {director.trainingProfile.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Certifications</h3>
                        <ul className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                            {director.certifications.map((cert) => (
                                <li key={cert}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl space-y-8 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Our Eminent Staff</h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                        A team of seasoned trainers dedicated to delivering hands-on expertise across Linux, cloud, automation, and modern development practices.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {staff.map((member) => (
                        <div key={member.name} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-md">
                            <div className="mb-4 overflow-hidden rounded-2xl bg-secondary/20">
                                <img src={member.image} alt={member.name} className="h-48 w-full object-cover" loading="lazy" />
                            </div>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Education</p>
                                    <p>{member.education}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Experience</p>
                                    <p>{member.experience}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Teaching Domain</p>
                                    <p>{member.domain}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-5xl space-y-6 rounded-3xl border border-secondary/30 bg-secondary/10 px-6 py-10 text-center shadow-md">
                <h2 className="text-3xl font-semibold">Deliverables from Unnati</h2>
                <ul className="mx-auto grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    {deliverables.map((item) => (
                        <li key={item} className="rounded-full bg-background px-4 py-2 shadow-sm">
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary/80">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-16 text-center text-primary-foreground">
                    <h2 className="text-3xl font-semibold">We Are Ready to Build Your Career</h2>
                    <p className="max-w-2xl text-sm sm:text-base">
                        Whether you are beginning your journey in IT or seeking advanced certifications, our mentors and labs are ready to support every milestone.
                    </p>
                    <a
                        href="/contact"
                        className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow hover:bg-background/90"
                    >
                        Get in touch
                    </a>
                </div>
            </section>
        </div>
    );
}
