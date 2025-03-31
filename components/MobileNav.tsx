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
    <section className="sticky top-0 z-50 bg-black-3">
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <Link href="/" className="flex cursor-pointer items-center gap-2 pb-10 pl-4 group">
            <Image src="/icons/logo.png" alt="logo" width={35} height={35} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="overflow-hidden">
              <h1 
                className={cn(
                  "text-[28px] font-extrabold ml-2 bg-gradient-to-r from-orange-1 to-white-1 bg-clip-text text-transparent transition-all duration-500",
                  showTitle ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                )}
              >
                PodTales
              </h1>
            </div>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <nav className="flex h-full flex-col gap-6 text-white-1">
              {sidebarLinks.map(({ route, label, icon: Icon }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`);
                const isNotificationRoute = route === "/notification";

                return <SheetClose asChild key={route}>
                  <Link href={route === "/profile" ? (user ? `/profile/${user?.id}` : "/sign-in") : route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                    'bg-nav-focus border-r-4 border-orange-1': isActive
                  })}>
                    <div className="relative">
                      <Icon size={24} className={isActive ? "text-orange-1" : "text-white-2"} />
                      {isNotificationRoute && hasUnreadNotifications && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-1"></span>
                      )}
                    </div>
                    <p>{label}</p>
                  </Link>
                </SheetClose>
              })}
            </nav>
            
            {/* Authentication buttons */}
            <div className="mt-auto px-4 pb-20">
              <SignedOut>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="text-16 w-full bg-orange-1 hover:bg-orange-1/90 font-extrabold rounded-lg py-5 transition-all duration-200 shadow-lg hover:shadow-orange-1/20"
                  >
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </SheetClose>
              </SignedOut>
              <SignedIn>
                <SheetClose asChild>
                  <Button
                    className="text-16 w-full bg-orange-1 hover:bg-orange-1/90 font-extrabold rounded-lg py-5 transition-all duration-200 shadow-lg hover:shadow-orange-1/20"
                    onClick={() => signOut(() => router.push('/'))}
                  >
                    Log Out
                  </Button>
                </SheetClose>
              </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav