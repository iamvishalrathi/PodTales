import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Flag, AlertCircle, Users } from 'lucide-react';

const Statistics = () => {
    // Add queries for statistics
    const totalReports = useQuery(api.reports.getTotalReports);
    const pendingReports = useQuery(api.reports.getPendingReportsCount);
    const adminCount = useQuery(api.users.getAdminCount);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-black-1/30 border border-gray-800 rounded-lg p-6 hover:bg-black-1/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-1/20 p-2 rounded-full">
                        <Flag size={20} className="text-orange-1" />
                    </div>
                    <h3 className="text-white-3 font-medium">Total Reports</h3>
                </div>
                <p className="text-3xl font-bold text-white-1">{totalReports || 0}</p>
            </div>
            <div className="bg-black-1/30 border border-gray-800 rounded-lg p-6 hover:bg-black-1/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-500/20 p-2 rounded-full">
                        <AlertCircle size={20} className="text-yellow-500" />
                    </div>
                    <h3 className="text-white-3 font-medium">Pending Reports</h3>
                </div>
                <p className="text-3xl font-bold text-white-1">{pendingReports || 0}</p>
            </div>
            <div className="bg-black-1/30 border border-gray-800 rounded-lg p-6 hover:bg-black-1/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                        <Users size={20} className="text-blue-500" />
                    </div>
                    <h3 className="text-white-3 font-medium">Total Admins</h3>
                </div>
                <p className="text-3xl font-bold text-white-1">{adminCount || 0}</p>
            </div>
        </div>
    );
};

export default Statistics;