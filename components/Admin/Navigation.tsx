import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flag, LayoutDashboard, UserCog } from 'lucide-react';

const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className="mb-8">
            <ul className="flex flex-wrap gap-4 text-white-2">
                <li>
                    <Link
                        href="/admin"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${pathname === '/admin'
                                ? 'bg-orange-1/20 text-orange-1'
                                : 'hover:bg-black-1/30'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/management"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${pathname === '/admin/management'
                                ? 'bg-orange-1/20 text-orange-1'
                                : 'hover:bg-black-1/30'
                            }`}
                    >
                        <UserCog size={18} />
                        <span>Admin Management</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/reports"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${pathname === '/admin/reports'
                                ? 'bg-orange-1/20 text-orange-1'
                                : 'hover:bg-black-1/30'
                            }`}
                    >
                        <Flag size={18} />
                        <span>Reports</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;