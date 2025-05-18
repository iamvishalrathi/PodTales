import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

interface ReportDialogProps {
    podcastId: string;
    podcastTitle: string;
}

const reportOptions = [
    { id: "inappropriate", label: "Inappropriate content" },
    { id: "copyright", label: "Copyright violation" },
    { id: "offensive", label: "Offensive language" },
    { id: "misinformation", label: "Misinformation" },
    { id: "other", label: "Other" }
];

const ReportDialog = ({ podcastId, podcastTitle }: ReportDialogProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { user } = useUser();
    
    // Use the Convex mutation
    const submitReport = useMutation(api.reports.submitReport);

    const handleSubmit = async () => {
        if (!selectedOption) {
            toast({
                title: "Please select a reason",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit the report to the database
            await submitReport({
                podcastId,
                podcastTitle,
                reportType: selectedOption,
                details: additionalDetails || undefined,
                contactEmail: contactEmail || undefined,
                // Remove the reportedBy field if user is not logged in
                // or pass undefined to make it optional
                reportedBy: undefined,
            });

            setIsSubmitting(false);
            setOpen(false);

            // Reset form
            setSelectedOption(null);
            setAdditionalDetails("");
            setContactEmail("");

            toast({
                title: "Report submitted",
                description: "Thank you for helping keep our platform safe",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error submitting report:", error);
            setIsSubmitting(false);
            
            toast({
                title: "Error submitting report",
                description: "Please try again later",
                variant: "destructive",
                duration: 3000,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-black-1/50 size-10 sm:size-12 text-white-2 hover:text-red-500"
                    title="Report podcast"
                >
                    <Flag size={18} stroke="currentColor" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black-1/95 border border-gray-800 text-white-1 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white-1">
                        Report Podcast
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-5">
                    <div>
                        <Label className="text-white-2 mb-2 block">
                            Why are you reporting "{podcastTitle}"?
                        </Label>

                        <div className="space-y-2">
                            {reportOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedOption === option.id
                                        ? "bg-orange-1/20 border border-orange-1"
                                        : "bg-black-1/50 border border-gray-800 hover:bg-black-1/70"
                                        }`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    <p className={`${selectedOption === option.id ? "text-orange-1" : "text-white-2"}`}>
                                        {option.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="details" className="text-white-2 mb-2 block">
                            Additional details (optional)
                        </Label>
                        <Textarea
                            id="details"
                            placeholder="Please provide specific details about the issue..."
                            value={additionalDetails}
                            onChange={(e) => setAdditionalDetails(e.target.value)}
                            className="bg-black-1/50 border border-gray-800 text-white-2 placeholder:text-white-3/50 resize-none min-h-[100px]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-white-2 mb-2 block">
                            Contact email (optional)
                        </Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email for follow-up..."
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-black-1/50 border border-gray-800 text-white-2 placeholder:text-white-3/50 p-2 rounded-md"
                        />
                        <p className="text-xs text-white-3 mt-1">
                            We'll only use this to follow up on your report if necessary.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                setSelectedOption(null);
                                setAdditionalDetails("");
                                setContactEmail("");
                            }}
                            className="bg-transparent border-gray-700 text-white-2 hover:bg-black-1/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedOption || isSubmitting}
                            className={`${!selectedOption ? "bg-white-1/10 text-white-3 cursor-not-allowed" : "bg-orange-1 text-black hover:bg-orange-2"}`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportDialog;