import LeftSidebar from "@/components/Sidebars/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/Sidebars/RightSidebar/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayers/PodcastPlayer";
import { Heart } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                src="/icons/logo.png"
                width={30}
                height={30}
                alt="menu icon"
              />
              <MobileNav />
            </div>
            <div className="flex flex-col">
              <Toaster />
              {children}
              <div className="flex items-center justify-center mt-8 mb-8 text-white-3 text-sm">
                <p className="flex items-center gap-1">
                  Made with <Heart size={16} className="text-orange-1 fill-orange-1" /> by{" "}
                  <a
                    href="https://github.com/iamvishalrathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-1 hover:underline transition-all duration-200"
                  >
                    Vishal Kumar
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <RightSidebar />
      </main>
      <PodcastPlayer />
    </div>
  );
}
