"use client";

import Link from "next/link";
import Statistics from "@/components/Admin/Statistics";
import { Users, Flag, ArrowRight } from 'lucide-react';

const AdminPage = () => {

    return (
        <div className="min-h-[calc(100vh-80px)]">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white-1">Admin Dashboard</h1>
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white-1 mb-2">Welcome to Dashboard</h1>
                            <p className="text-white-3">Manage your podcast platform and handle user reports</p>
                        </div>
                    </div>
                    <Statistics />

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Link 
                            href="/admin/management" 
                            className="group bg-black-1/30 border border-gray-800 rounded-xl p-6 hover:bg-black-1/40 transition-all hover:border-orange-1/50"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-orange-1/20 p-3 rounded-lg group-hover:bg-orange-1/30 transition-colors">
                                    <Users className="w-6 h-6 text-orange-1" />
                                </div>
                                <h2 className="text-xl font-bold text-white-1">Admin Management</h2>
                            </div>
                            <p className="text-white-3">Manage admin users and permissions</p>
                            <div className="flex items-center gap-2 mt-4 text-orange-1 group-hover:gap-3 transition-all">
                                <span className="text-sm font-medium">Manage Admins</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>

                        <Link 
                            href="/admin/reports" 
                            className="group bg-black-1/30 border border-gray-800 rounded-xl p-6 hover:bg-black-1/40 transition-all hover:border-orange-1/50"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-orange-1/20 p-3 rounded-lg group-hover:bg-orange-1/30 transition-colors">
                                    <Flag className="w-6 h-6 text-orange-1" />
                                </div>
                                <h2 className="text-xl font-bold text-white-1">Report Management</h2>
                            </div>
                            <p className="text-white-3">Handle user reports and content moderation</p>
                            <div className="flex items-center gap-2 mt-4 text-orange-1 group-hover:gap-3 transition-all">
                                <span className="text-sm font-medium">View Reports</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;