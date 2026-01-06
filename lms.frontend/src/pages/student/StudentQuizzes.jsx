import React, { useState, useEffect } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { quizService } from "../../services/quizService";
import { getCurrentUser } from "../../services/authService";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

export default function StudentQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getCurrentUser();

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        if (!currentUser?.id) return;
        try {
            const data = await quizService.getStudentQuizzes(currentUser.id);
            setQuizzes(data);
        } catch (error) {
            console.error("Failed to load quizzes", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <StudentLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Quizzes</h1>
                <p className="text-gray-600 mt-2">
                    Test your knowledge from your enrolled courses
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">📝</span>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        Quiz
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {quiz.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {quiz.description}
                                </p>

                                <Link
                                    to={`/student/quizzes/${quiz.id}`}
                                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Start Quiz
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
                        <span className="text-4xl block mb-4">📚</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                            No Quizzes Found
                        </h3>
                        <p className="text-gray-500 mt-2">
                            You don't have any quizzes available yet. Enroll in courses to see quizzes.
                        </p>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
