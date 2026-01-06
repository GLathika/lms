import React from "react";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentAchievements() {
    return (
        <StudentLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Achievements</h1>
                <p className="text-gray-600 mt-2">
                    Badges and milestones you've unlocked
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Coming Soon!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    We are building a new achievement system to reward your learning progress. Check back later!
                </p>
            </div>
        </StudentLayout>
    );
}
