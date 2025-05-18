import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "@/components/LoaderSpinner";

const ReportManagement = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
    const [reporterNames, setReporterNames] = useState<Record<string, string>>({});

    const { user } = useUser();
    const { toast } = useToast();

    // Get reports based on active tab
    const reports = useQuery(api.reports.getReports, {
        status: activeTab === "all" ? undefined : activeTab
    });

    // Update report status mutation
    const updateReportStatus = useMutation(api.reports.updateReportStatus);

    // Fetch user information for each report
    useEffect(() => {
        const fetchReporterNames = async () => {
            if (!reports || reports.length === 0) return;

            const newReporterNames: Record<string, string> = {};

            for (const report of reports) {
                if (report.reportedBy && !reporterNames[report.reportedBy]) {
                    try {
                        // Use the query with proper parameters
                        const userData = await api.users.getUserById({ clerkId: report.reportedBy });
                        if (userData) {
                            newReporterNames[report.reportedBy] = userData.name || "Unknown User";
                        }
                    } catch (error) {
                        console.error("Error fetching user info:", error);
                        newReporterNames[report.reportedBy] = "Unknown User";
                    }
                }
            }

            setReporterNames(prev => ({ ...prev, ...newReporterNames }));
        };

        fetchReporterNames();
    }, [reports, reporterNames]);

    const handleStatusUpdate = async (reportId: string, newStatus: string) => {
        if (!user?.id) return;

        try {
            await updateReportStatus({
                reportId,
                status: newStatus,
                reviewNotes: reviewNotes[reportId],
                reviewedBy: user.id,
            });

            toast({
                title: "Report updated",
                description: `Report status changed to ${newStatus}`,
                duration: 3000,
            });
        } catch (error) {
            console.error("Error updating report:", error);
            toast({
                title: "Error updating report",
                description: "Please try again",
                variant: "destructive",
                duration: 3000,
            });
        }
    };

    if (!reports) return <LoaderSpinner />;

    return (
        <div>
            <h2 className="text-xl font-bold mb-6 text-white-1">Report Management</h2>

            <Tabs defaultValue="pending" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
                    <TabsTrigger value="all">All Reports</TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                    {reports?.length === 0 ? (
                        <p className="text-white-2 text-center py-8">No {activeTab} reports found.</p>
                    ) : (
                        reports?.map((report) => (
                            <div key={report._id} className="bg-black-1/30 border border-gray-800 rounded-lg p-4">
                                <div className="flex justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-white-1">{report.podcastTitle}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${report.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                                            report.status === "reviewed" ? "bg-blue-500/20 text-blue-500" :
                                                report.status === "resolved" ? "bg-green-500/20 text-green-500" :
                                                    "bg-red-500/20 text-red-500"
                                        }`}>
                                        {report.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-white-2 text-sm mb-1">Report Type:</p>
                                        <p className="text-white-1">{report.reportType}</p>
                                    </div>

                                    <div>
                                        <p className="text-white-2 text-sm mb-1">Reported On:</p>
                                        <p className="text-white-1">
                                            {new Date(report._creationTime).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {report.reportedBy && (
                                        <div>
                                            <p className="text-white-2 text-sm mb-1">Reported By:</p>
                                            <p className="text-white-1">
                                                {reporterNames[report.reportedBy] || report.reportedBy}
                                            </p>
                                        </div>
                                    )}

                                    {report.details && (
                                        <div className="md:col-span-2">
                                            <p className="text-white-2 text-sm mb-1">Details:</p>
                                            <p className="text-white-1 bg-black-1/50 p-2 rounded">{report.details}</p>
                                        </div>
                                    )}

                                    {report.contactEmail && (
                                        <div>
                                            <p className="text-white-2 text-sm mb-1">Contact Email:</p>
                                            <p className="text-white-1">{report.contactEmail}</p>
                                        </div>
                                    )}
                                </div>

                                {report.status === "pending" && (
                                    <>
                                        <Textarea
                                            placeholder="Add review notes..."
                                            value={reviewNotes[report._id] || ""}
                                            onChange={(e) => setReviewNotes({
                                                ...reviewNotes,
                                                [report._id]: e.target.value
                                            })}
                                            className="bg-black-1/50 border border-gray-800 text-white-2 mb-4"
                                        />

                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleStatusUpdate(report._id, "reviewed")}
                                                className="bg-blue-500/20 text-blue-500 border-blue-500/30"
                                            >
                                                Mark as Reviewed
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleStatusUpdate(report._id, "resolved")}
                                                className="bg-green-500/20 text-green-500 border-green-500/30"
                                            >
                                                Resolve
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleStatusUpdate(report._id, "dismissed")}
                                                className="bg-red-500/20 text-red-500 border-red-500/30"
                                            >
                                                Dismiss
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {report.reviewNotes && (
                                    <div className="mt-4 pt-4 border-t border-gray-800">
                                        <p className="text-white-2 text-sm mb-1">Review Notes:</p>
                                        <p className="text-white-1">{report.reviewNotes}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default ReportManagement;