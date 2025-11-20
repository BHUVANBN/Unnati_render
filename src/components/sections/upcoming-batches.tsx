import { Course } from "@/schemas";
import { AnimatedHeading } from "../animated-heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Batch {
    course: Course;
    date: string;
    timings: string;
}

const mockBatches: Batch[] = [
    {
        course: { id: "1", title: "Upcoming RHCSA batch", description: "RHCSA course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Offline"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "15-Sep-25", timings: "5pm to 6pm"
    },
    {
        course: { id: "2", title: "Upcoming RHCE batch", description: "RHCE course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Offline"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "20-Sep-25", timings: "6pm to 7pm"
    },
    {
        course: { id: "3", title: "Upcoming DevOps batch", description: "DevOps course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Online"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "25-Sep-25", timings: "7pm to 8pm"
    },
    {
        course: { id: "4", title: "Upcoming OpenShift batch", description: "OpenShift course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Online"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "01-Oct-25", timings: "5pm to 6pm"
    },
    {
        course: { id: "5", title: "Upcoming Ansible batch", description: "Ansible course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Online"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "05-Oct-25", timings: "6pm to 7pm"
    },
    {
        course: { id: "6", title: "Upcoming AWS batch", description: "AWS course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Online"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "06-Oct-25", timings: "6pm to 7pm"
    },
    {
        course: { id: "7", title: "Upcoming RHCSA (linux)", description: "RHCSA course", additionalInfo: { studentsEnrolled: 0, rating: 0, duration: "2 months", languages: ["English"], mode: ["Offline"], projectsIncluded: 0 }, syllabus: { title: [""], subtitle: "", points: [""] }, targetAudiences: [""], createdAt: new Date(), updatedAt: new Date() }, date: "25-Sep-25", timings: "5pm to 6pm"
    }
];

export const UpcomingBatches = () => {
    return (
        <section className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Batches</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join our upcoming training batches and kickstart your IT career
                    </p>
                </div>
                
                <div className="flex flex-col xl:flex-row gap-8 w-full">
                    {/* Table */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6">
                            <h3 className="text-xl font-bold text-white">Schedule Overview</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Course</th>
                                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
                                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Timings</th>
                                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockBatches.map((batch, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">{batch.course.title}</div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{batch.date}</td>
                                            <td className="py-4 px-6 text-gray-600">{batch.timings}</td>
                                            <td className="py-4 px-6">
                                                <Link 
                                                    href={`/courses/${batch.course.id}`} 
                                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 text-sm font-medium"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4 text-center">Need Help Choosing?</h3>
                            <p className="mb-6 text-center leading-relaxed">
                                Our education counselors can help you select the best training program based on your requirements
                            </p>
                            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 rounded-xl">
                                Talk to Counselor
                            </Button>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Flexible Learning</h3>
                            <p className="mb-6 text-center text-gray-600 leading-relaxed">
                                We offer flexible batch timings and can arrange special batches based on demand
                            </p>
                            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl">
                                <Link href="/demo-class">Book Free Demo</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    };
