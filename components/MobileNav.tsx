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

const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();
  const [showTitle, setShowTitle] = useState(false);

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
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4 group">
            <Image src="/icons/logo.png" alt="logo" width={23} height={27} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="overflow-hidden">
              <h1 
                className={cn(
                  "text-24 font-extrabold ml-2 bg-gradient-to-r from-orange-1 to-white-1 bg-clip-text text-transparent transition-all duration-500",
                  showTitle ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                )}
              >
                PodTales
              </h1>
            </div>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <nav className="flex h-full flex-col gap-6 text-white-1">
              {sidebarLinks.map(({ route, label, imgURL }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`);

                return <SheetClose asChild key={route}>
                  <Link href={route === "/profile" ? (user ? `/profile/${user?.id}` : "/sign-in") : route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                    'bg-nav-focus border-r-4 border-orange-1': isActive
                  })}>
                    <Image src={imgURL} alt={label} width={24} height={24} />
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