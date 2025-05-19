"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import Navigation from "@/components/Admin/Navigation";
import RequestAdminAccess from "@/components/Admin/RequestAdminAccess";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoaded } = useUser();
    const [isChecking, setIsChecking] = useState(true);

    // Query to check if the current user is an admin
    const isAdmin = useQuery(
        api.users.isUserAdmin,
        user?.id ? { userId: user.id } : "skip"
    );

    useEffect(() => {
        if (isLoaded && isAdmin !== undefined) {
            setIsChecking(false);
        }
    }, [user, isLoaded, isAdmin]);

    return (
        <div className="max-md:min-h-[calc(100vh-135px)] min-h-[calc(100vh-85px)]">
            {(isChecking || !isLoaded || isAdmin === undefined) ? (
                <div className="flex items-center justify-center h-full">
                    <LoaderSpinner />
                </div>
            ) : !isAdmin && user ? (
                <RequestAdminAccess userId={user.id} />
            ) : (
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white-1">Admin Portal</h1>
                        {user && (
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.imageUrl}
                                    alt={user.fullName || "Admin"}
                                    className="w-10 h-10 rounded-full border-2 border-orange-1"
                                />
                                <div>
                                    <p className="text-white-1 font-medium">{user.fullName}</p>
                                    <p className="text-white-3 text-sm">Administrator</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Navigation />
                    <div className="bg-black-1/20 rounded-xl border border-gray-800 p-6">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}