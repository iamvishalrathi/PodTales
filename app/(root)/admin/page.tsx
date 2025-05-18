"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import Link from "next/link";

const AdminPage = () => {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    // Query to check if the current user is an admin
    const isAdmin = useQuery(
        api.users.isUserAdmin,
        user?.id ? { userId: user.id } : "skip"
    );

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
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white-1">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/admin/management" className="bg-black-1/30 border border-gray-800 rounded-xl p-6 hover:bg-black-1/40 transition-colors">
                        <h2 className="text-xl font-bold text-white-1 mb-2">Admin Management</h2>
                        <p className="text-white-3">Manage admin users and permissions</p>
                    </Link>

                    <Link href="/admin/reports" className="bg-black-1/30 border border-gray-800 rounded-xl p-6 hover:bg-black-1/40 transition-colors">
                        <h2 className="text-xl font-bold text-white-1 mb-2">Report Management</h2>
                        <p className="text-white-3">Handle user reports and content moderation</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;