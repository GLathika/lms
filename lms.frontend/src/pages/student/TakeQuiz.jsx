import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import { quizService } from "../../services/quizService";
import { getCurrentUser } from "../../services/authService";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

export default function TakeQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const currentUser = getCurrentUser();

    useEffect(() => {
        loadQuiz();
    }, [id]);

    const loadQuiz = async () => {
        try {
            const data = await quizService.getQuizById(id);
            setQuiz(data);
        } catch (error) {
            console.error("Failed to load quiz", error);
            toast.error("Failed to load quiz");
            navigate("/student/quizzes");
        } finally {
            setLoading(false);
        }
    };

    const handleOptionChange = (questionId, optionIndex) => {
        setAnswers({
            ...answers,
            [questionId]: optionIndex,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser?.id) {
            toast.error("Please login to submit");
            return;
        }

        // Check if all questions answered?
        /* Optional: 
        if (Object.keys(answers).length < quiz.questions.length) {
            toast.warning("Please answer all questions");
            return;
        }
        */

        setSubmitting(true);
        try {
            const data = await quizService.submitQuiz(id, currentUser.id, answers);
            setResult(data);
            toast.success(data.passed ? "Quiz Passed! 🎉" : "Quiz Submitted");
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Failed to submit quiz", error);
            toast.error("Failed to submit quiz");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader />;
    if (!quiz) return <div>Quiz not found</div>;

    // Render Result View if available
    if (result) {
        return (
            <StudentLayout>
                <div className="max-w-3xl mx-auto">
                    <div className={`rounded-2xl shadow-lg border p-8 text-center ${result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        }`}>
                        <div className="text-6xl mb-4">
                            {result.passed ? "🏆" : "📝"}
                        </div>
                        <h2 className={`text-3xl font-bold mb-2 ${result.passed ? "text-green-800" : "text-red-800"
                            }`}>
                            {result.passed ? "Congratulations!" : "Keep Practicing!"}
                        </h2>
                        <p className="text-xl text-gray-700 mb-6">
                            You scored <span className="font-bold">{result.score}%</span>
                        </p>

                        <div className="flex justify-center gap-8 mb-8">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 uppercase">Total Questions</p>
                                <p className="text-xl font-bold">{result.totalQuestions}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 uppercase">Correct</p>
                                <p className="text-xl font-bold">{result.correctAnswers}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/student/quizzes")}
                                className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                            >
                                Back to Quizzes
                            </button>
                            {!result.passed && (
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                                >
                                    Retry Quiz
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/student/quizzes")}
                        className="text-gray-500 hover:text-gray-900 mb-4 flex items-center gap-2"
                    >
                        ← Back to Quizzes
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
                    <p className="text-gray-600 mt-2">{quiz.description}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {quiz.questions && quiz.questions.map((question, qIndex) => (
                        <div key={question.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex gap-3">
                                <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-lg text-sm shrink-0">
                                    {qIndex + 1}
                                </span>
                                {question.text}
                            </h3>

                            <div className="space-y-3 pl-11">
                                {question.options && question.options.map((option, oIndex) => (
                                    <label
                                        key={oIndex}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${answers[question.id] === oIndex
                                                ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                                                : "border-gray-200"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={oIndex}
                                            checked={answers[question.id] === oIndex}
                                            onChange={() => handleOptionChange(question.id, oIndex)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit Quiz"}
                        </button>
                    </div>
                </form>
            </div>
        </StudentLayout>
    );
}
