"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import Statistics from "@/components/Admin/Statistics";
import Navigation from "@/components/Admin/Navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    // Query to check if the current user is an admin
    const isAdmin = useQuery(
        api.users.isUserAdmin,
        user?.id ? { userId: user.id } : "skip"
    );

    const pendingReports = useQuery(api.reports.getPendingReportsCount);

    useEffect(() => {
        if (isLoaded && isAdmin !== undefined) {
            setIsChecking(false);

            // Redirect non-admin users
            if (!isAdmin && user) {
                router.push("/");
            }
        }
    }, [user, isLoaded, router, isAdmin]);

    // Show loading state while checking admin status
    if (isChecking || !isLoaded || isAdmin === undefined) {
        return <LoaderSpinner />;
    }

    // Show access denied message for non-admins
    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <h1 className="text-2xl font-bold text-white-1 mb-4">Access Denied</h1>
                <p className="text-white-2 max-w-md">
                    You don&apos;t have permission to access the admin area. Please contact an administrator if you believe this is an error.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)]">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <Navigation pendingReports={pendingReports || 0} />
                {children}
            </div>
        </div>
    );
}