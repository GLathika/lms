import apiClient from "./apiClient";

export const certificateService = {
    getStudentCertificates: async (studentId) => {
        try {
            const { data } = await apiClient.get(`/student/${studentId}/certificates`);
            return data;
        } catch (error) {
            console.error("Error fetching certificates:", error);
            return [];
        }
    },

    generateCertificate: async (studentId, courseId) => {
        const { data } = await apiClient.post(
            `/student/${studentId}/certificates/generate?courseId=${courseId}`
        );
        return data;
    },
};

export default certificateService;
