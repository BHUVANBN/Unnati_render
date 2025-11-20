import instance from "@/lib/axios";
import type { Contact, CreateContact } from "@/schemas";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultipleContactResponse extends Pagination { testimonials: Contact[] }
interface SingleContactResponse { testimonial: Contact }

type MultipleContactApiResponse = ApiResponse<MultipleContactResponse>
type SingleContactApiResponse = ApiResponse<SingleContactResponse>

const fetchContacts = async (page: number, limit: number) => {
    try {
        const res = await instance.get<MultipleContactApiResponse>("/testimonials", { params: { page, limit } });
        return res.data.data!;
    } catch (e) {
        return { testimonials: [], page, limit, total: 0, totalPages: 0 };
    }
}

const createContact = async ({ courseId, email, firstName, lastName, orgName, phone }: CreateContact) => {
    try {
        const res = await instance.post<SingleContactApiResponse>("/testimonials", { courseId, email, firstName, lastName, orgName, phone });
        return res.data.data!;
    } catch (e) {
        return { testimonial: null };
    }
}

const deleteContact = async (id: string) => {
    try {
        const res = await instance.delete<SingleContactApiResponse>(`/testimonials/${id}`);
        return res.data.data!;
    } catch (e) {
        return { testimonial: null };
    }
}

export {
    fetchContacts,
    createContact,
    deleteContact
}