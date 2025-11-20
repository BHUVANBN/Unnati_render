import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import QueryProvider from "@/providers/query-provider";
import { db } from "@/lib/db";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
    title: "Unnati - Learn and Grow",
    description: "Your platform for premium educational courses",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const setting = await db.setting.findFirst({
        select: {
            email: true,
            phone: true,
            socialLinks: true
        }
    })
    const latestCourse = await db.course.findFirst({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            createdAt: true
        }
    });
    const newCourseThreshold = 1000 * 60 * 60 * 24 * 7; // 7 days
    const hasNewCourses = latestCourse ? (Date.now() - latestCourse.createdAt.getTime()) <= newCourseThreshold : false;

    const email = setting?.email ?? "";
    const phone = setting?.phone ?? "";
    const social = setting?.socialLinks as {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    } || {};
    const logoUrl = "/unnatilogo.png";
    return (
        <ViewTransitions>
            <html lang="en">
                <body
                    className="font-sans antialiased bg-gray-50"
                ><QueryProvider>
                        <div className="min-h-screen flex flex-col">
                            <header>
                                <Header logoUrl={logoUrl} phone={phone} email={email} social={social} showCoursesNewBadge={hasNewCourses} />
                            </header>
                            <main className="flex-grow">{children}</main>

                            <footer className="mt-auto">
                                <Footer logoUrl={logoUrl} />
                            </footer>
                        </div>
                    </QueryProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
