import React, { useState, useEffect } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { certificateService } from "../../services/certificateService";
import { getCurrentUser } from "../../services/authService";
import Loader from "../../components/Loader";

export default function StudentCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getCurrentUser();

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        if (!currentUser?.id) return;
        try {
            const data = await certificateService.getStudentCertificates(currentUser.id);
            setCertificates(data);
        } catch (error) {
            console.error("Failed to load certificates", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <StudentLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
                <p className="text-gray-600 mt-2">
                    Your earned certifications and achievements
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.length > 0 ? (
                    certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative"
                        >
                            <div className="h-2 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">🏆</span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">
                                        {cert.certificateCode}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {cert.course?.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Issued on: {new Date(cert.issueDate).toLocaleDateString()}
                                </p>

                                <button
                                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    onClick={() => window.print()}
                                >
                                    <span>⬇️</span> Download
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
                        <span className="text-4xl block mb-4">🎓</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                            No Certificates Yet
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Complete courses with 100% progress to earn certificates!
                        </p>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
