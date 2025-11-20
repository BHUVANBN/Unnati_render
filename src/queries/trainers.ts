import instance from "@/lib/axios"
import { Trainer, CreateTrainer } from "@/schemas"
import { ApiResponse } from "@/types/interfaces"

interface MultipleTrainerResponse { trainers: Trainer[] }
interface SingleTrainerResponse { trainer: Trainer }

type MultipleTrainerApiResponse = ApiResponse<MultipleTrainerResponse>
type SingleTrainerApiResponse = ApiResponse<SingleTrainerResponse>

const fetchTrainers = async () => {
    try {
        const response = await instance.get<MultipleTrainerApiResponse>("/trainers")
        return response.data.data!
    } catch (e) {
        return { trainers: [] }
    }
}

const deleteTrainer = async (id: string) => {
    try {
        const response = await instance.delete<SingleTrainerApiResponse>(`/trainers?id=${id}`)
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

const createTrainer = async ({ designation, experience, expertise, name, photo, bio }: CreateTrainer) => {
    try {
        const formData = new FormData();
        formData.append("designation", designation);
        formData.append("experience", experience.toString());
        formData.append("expertise", expertise);
        formData.append("name", name);
        formData.append("bio", bio || "");
        // Only append photo if it exists
        if (photo) {
            formData.append("photo", photo);
        }
        const response = await instance.post<SingleTrainerApiResponse>("/trainers", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

const updateTrainer = async (id: string, { designation, experience, expertise, name, photo, bio }: CreateTrainer) => {
    try {
        const formData = new FormData();
        formData.append("designation", designation);
        formData.append("experience", experience.toString());
        formData.append("expertise", expertise);
        formData.append("name", name);
        formData.append("bio", bio || "");
        // Only append photo if it exists
        if (photo) {
            formData.append("photo", photo);
        }
        const response = await instance.put<SingleTrainerApiResponse>(`/trainers?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

export {
    fetchTrainers,
    deleteTrainer,
    createTrainer,
    updateTrainer
}