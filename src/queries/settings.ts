import instance from "@/lib/axios";
import type { Setting, CreateSetting } from "@/schemas";
import { ApiResponse } from "@/types/interfaces";

interface SingleSettingResponse { setting: Setting }
type SingleSettingApiResponse = ApiResponse<SingleSettingResponse>

const fetchSettings = async () => {
    try {
        const res = await instance.get<SingleSettingApiResponse>("/settings");
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const createSetting = async ({ welcomeText, introParagraph, email, phone, address, stats, socialLinks, logo, backgroundImage }: CreateSetting) => {
    try {
        const formData = new FormData();
        if (socialLinks) formData.append("socialLinks", JSON.stringify(socialLinks));
        if (welcomeText) formData.append("welcomeText", welcomeText);
        if (introParagraph) formData.append("introParagraph", introParagraph);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (address) formData.append("address", address);
        if (stats) formData.append("stats", JSON.stringify(stats));
        if (logo) formData.append("logo", logo);
        if (backgroundImage) formData.append("backgroundImage", backgroundImage);
        const res = await instance.post<SingleSettingApiResponse>("/settings", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const updateSetting = async ({ welcomeText, introParagraph, email, phone, address, stats, socialLinks, logo, backgroundImage }: CreateSetting) => {
    try {
        const formData = new FormData();
        if (socialLinks) formData.append("socialLinks", JSON.stringify(socialLinks));
        if (welcomeText) formData.append("welcomeText", welcomeText);
        if (introParagraph) formData.append("introParagraph", introParagraph);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (address) formData.append("address", address);
        if (stats) formData.append("stats", JSON.stringify(stats));
        if (logo) formData.append("logo", logo);
        if (backgroundImage) formData.append("backgroundImage", backgroundImage);
        const res = await instance.put<SingleSettingApiResponse>(`/settings`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const deleteSetting = async () => {
    try {
        const res = await instance.delete<SingleSettingApiResponse>(`/settings`);
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

export {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting
}

