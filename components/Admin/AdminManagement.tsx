import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useDebounce } from "@/lib/useDebounce";

const AdminManagement = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  // Mutation to set a user as admin
  const setUserAdmin = useMutation(api.users.setUserAdmin);
  
  // Query to search users
  const users = useQuery(api.users.searchUsers, { 
    searchTerm: debouncedSearch 
  });
  
  const handleAddAdmin = async () => {
    if (!userId.trim() || !user?.id) return;
    
    try {
      await setUserAdmin({
        userId: userId.trim(),
        isAdmin: true,
        requestingUserId: user.id
      });
      
      toast({
        title: "Admin added",
        description: "User has been granted admin privileges",
        duration: 3000,
      });
      
      setUserId("");
    } catch (error) {
      console.error("Error adding admin:", error);
      toast({
        title: "Error adding admin",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white-1">Admin Management</h2>
      
      <div className="bg-black-1/30 border border-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white-1 mb-4">Add New Admin</h3>
        
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              placeholder="Search user by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black-1/50 border border-gray-800 text-white-2"
            />
            
            {users && users.length > 0 && searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-black-1 border border-gray-800 rounded-lg max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.clerkId}
                    className="flex items-center gap-3 p-2 hover:bg-black-2 cursor-pointer"
                    onClick={() => {
                      setUserId(user.clerkId);
                      setSearchTerm(user.name);
                    }}
                  >
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-white-1 text-sm font-medium">{user.name}</p>
                      <p className="text-white-3 text-xs">{user.clerkId}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleAddAdmin}
            disabled={!userId.trim()}
            className="bg-orange-1 text-black hover:bg-orange-2"
          >
            Add Admin
          </Button>
        </div>
        
        <p className="text-white-3 text-sm mt-2">
          Note: Search for a user by their name or Clerk ID to grant them admin privileges.
        </p>
      </div>
    </div>
  );
};

export default AdminManagement;