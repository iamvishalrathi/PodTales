"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();
  const [showTitle, setShowTitle] = useState(false);
  
  // Fetch notifications to check for unread ones
  const notifications = useQuery(
    api.notifications.getUserNotifications,
    user?.id ? { userId: user.id } : "skip"
  );
  
  // Check if there are any unread notifications
  const hasUnreadNotifications = notifications?.some(notification => !notification.isRead) || false;

  // Show title with a slight delay for animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="sticky top-0 z-50">
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={28} height={28} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1 w-[85vw] max-w-[300px] flex flex-col">
          <Link href="/" className="flex cursor-pointer items-center gap-2 pb-6 pl-2 group">
            <Image src="/icons/logo.png" alt="logo" width={32} height={32} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="overflow-hidden">
              <h1 
                className={cn(
                  "text-[24px] sm:text-[28px] font-extrabold ml-1 bg-gradient-to-r from-orange-1 to-white-1 bg-clip-text text-transparent transition-all duration-500",
                  showTitle ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                )}
              >
                PodTales
              </h1>
            </div>
          </Link>
          
          <nav className="flex flex-col gap-2 text-white-1 flex-1 overflow-y-auto">
            {sidebarLinks.map(({ route, label, icon: Icon }) => {
              // For profile route, check if the current path is the user's profile
              const isProfileRoute = route === "/profile";
              const userProfilePath = user ? `/profile/${user?.id}` : "/sign-in";
              
              // Check if current path is active
              const isActive = isProfileRoute
                ? pathname === userProfilePath // Only active if it's exactly the user's profile
                : pathname === route || pathname.startsWith(`${route}/`);
              
              const isNotificationRoute = route === "/notification";

              return <SheetClose asChild key={route}>
                <Link href={isProfileRoute ? userProfilePath : route} className={cn(
                  "flex gap-3 items-center py-3 px-3 rounded-lg justify-start transition-all duration-200",
                  isActive 
                    ? "bg-nav-focus border-r-4 border-orange-1 text-orange-1" 
                    : "hover:bg-black-2/40"
                )}>
                  <div className="relative">
                    <Icon size={22} className={isActive ? "text-orange-1" : "text-white-2"} />
                    {isNotificationRoute && hasUnreadNotifications && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-1"></span>
                    )}
                  </div>
                  <p className="text-[15px] sm:text-base">{label}</p>
                </Link>
              </SheetClose>
            })}
          </nav>
          
          {/* Authentication buttons - moved directly into SheetContent */}
          <div className="mt-4 mb-8 px-2">
            <SignedOut>
              <SheetClose asChild>
                <Button
                  asChild
                  className="text-[15px] w-full bg-orange-1 hover:bg-orange-1/90 font-bold rounded-lg py-4 transition-all duration-200 shadow-lg hover:shadow-orange-1/20"
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </SheetClose>
            </SignedOut>
            <SignedIn>
              <SheetClose asChild>
                <Button
                  className="text-[15px] w-full bg-orange-1 hover:bg-orange-1/90 font-bold rounded-lg py-4 transition-all duration-200 shadow-lg hover:shadow-orange-1/20"
                  onClick={() => signOut(() => router.push('/'))}
                >
                  Log Out
                </Button>
              </SheetClose>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav