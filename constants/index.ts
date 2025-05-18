import { Home, Compass, Mic, Bell, Users, User, Settings } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Compass,
    route: "/discover",
    label: "Discover",
  },
  {
    icon: Mic,
    route: "/create-podcast",
    label: "Create Podcast",
  },
  {
    icon: Bell,
    route: "/notification",
    label: "Notification",
  },
  {
    icon: Users,
    route: "/community",
    label: "Community",
  },
  {
    icon: User,
    route: "/profile",
    label: "My Profile",
  },
  {
    icon: Settings,
    route: "/admin",
    label: "Admin",
    adminOnly: true,
  },
];
