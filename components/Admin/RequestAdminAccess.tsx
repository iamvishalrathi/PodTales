import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Shield, ArrowRight } from "lucide-react";

interface RequestAdminAccessProps {
    userId: string;
}

const RequestAdminAccess = ({ userId }: RequestAdminAccessProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [reason, setReason] = useState("");

    const requestAdminAccess = useMutation(api.users.requestAdminAccess);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) return;

        setIsSubmitting(true);
        try {
            await requestAdminAccess({ userId, reason });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to submit admin request:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <Shield className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-white-1 mb-2">Request Submitted!</h2>
                <p className="text-white-3">
                    Your request has been submitted successfully. We&apos;ll review it and get back to you soon.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="bg-black-1/30 border border-gray-800 rounded-xl p-8 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="bg-orange-1/20 p-4 rounded-full">
                        <Shield className="w-8 h-8 text-orange-1" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white-1 mb-2">Request Admin Access</h1>
                <p className="text-white-3 mb-6">
                    Tell us why you&apos;d like to become an administrator. We&apos;ll review your request and get back to you.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Why would you like to become an admin?"
                            className="w-full bg-black-2/50 border border-gray-800 rounded-lg p-3 text-white-1 placeholder:text-white-3 focus:outline-none focus:border-orange-1 transition-colors min-h-[120px]"
                            disabled={isSubmitting}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !reason.trim()}
                        className="w-full bg-orange-1 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-1 text-white font-medium rounded-lg py-3 px-4 transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            "Submitting..."
                        ) : (
                            <>
                                Submit Request
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestAdminAccess;