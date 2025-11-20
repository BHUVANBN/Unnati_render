import instance from "@/lib/axios";
import type { Course, CreateCourse } from "@/schemas";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultipleCourseResponse extends Pagination { courses: Course[] }
interface SingleCourseResponse { course: Course }

type MultipleCourseApiResponse = ApiResponse<MultipleCourseResponse>
type SingleCourseApiResponse = ApiResponse<SingleCourseResponse>

const fetchCourses = async (page = 1, limit = 9) => {
    try {
        const res = await instance.get<MultipleCourseApiResponse>(`/courses`, { params: { page, limit } });
        return res.data.data!;
    } catch (e) {
        return { courses: [], page, limit, total: 0, totalPages: 0 };
    }
}

const fetchCourse = async (id: string) => {
    try {
        const res = await instance.get<SingleCourseApiResponse>(`/courses/${id}`);
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const createCourse = async ({ description, additionalInfo, syllabus, targetAudiences, title, thumbnail }: CreateCourse) => {
    try {
        const formData = new FormData();
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("additionalInfo", JSON.stringify(additionalInfo));
        formData.append("syllabus", JSON.stringify(syllabus));
        formData.append("targetAudiences", JSON.stringify(targetAudiences));
        const res = await instance.post<SingleCourseApiResponse>("/courses", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const updateCourse = async (
    id: string,
    {
        description,
        additionalInfo,
        syllabus,
        targetAudiences,
        title,
        thumbnail,
    }: Omit<CreateCourse, "thumbnail"> & {
        thumbnail?: File;
    }
) => {
    try {
        const formData = new FormData();
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("additionalInfo", JSON.stringify(additionalInfo));
        formData.append("syllabus", JSON.stringify(syllabus));
        formData.append("targetAudiences", JSON.stringify(targetAudiences));
        const res = await instance.put<SingleCourseApiResponse>(
            `/courses/${id}`,
            formData
        );
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const deleteCourse = async (id: string) => {
    try {
        const res = await instance.delete<SingleCourseApiResponse>(`/courses/${id}`);
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

export const getCourseList = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses?limit=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data.data.courses.map((course: any) => ({
            id: course.id,
            title: course.title
        }));
    } catch (error) {
        console.error('Error fetching course list:', error);
        return [];
    }
}

export {
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse
}
