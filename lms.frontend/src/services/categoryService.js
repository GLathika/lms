import apiClient from "./apiClient";

export const categoryService = {
    getAllCategories: async () => {
        try {
            const { data } = await apiClient.get("/categories");
            return data || [];
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    },
};

export default categoryService;
