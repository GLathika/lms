import apiClient from "./apiClient";

export const mediaService = {
    uploadMedia: async (file, courseId, lessonId) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("courseId", courseId);
        formData.append("lessonId", lessonId);

        const { data } = await apiClient.post("/media/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    },

    deleteMedia: async (fileUrl) => {
        const { data } = await apiClient.delete(`/media/delete?fileUrl=${encodeURIComponent(fileUrl)}`);
        return data;
    },
};

export default mediaService;
