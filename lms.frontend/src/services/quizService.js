import apiClient from "./apiClient";

export const quizService = {
    getStudentQuizzes: async (studentId) => {
        try {
            const { data } = await apiClient.get(`/student/${studentId}/quizzes`);
            return data;
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            return [];
        }
    },

    getQuizById: async (quizId) => {
        const { data } = await apiClient.get(`/quizzes/${quizId}`);
        return data;
    },

    submitQuiz: async (quizId, studentId, answers) => {
        const { data } = await apiClient.post(
            `/quizzes/${quizId}/submit?studentId=${studentId}`,
            answers
        );
        return data;
    },

    getStudentResults: async (studentId) => {
        const { data } = await apiClient.get(`/student/${studentId}/quiz-results`);
        return data;
    },
};

export default quizService;
