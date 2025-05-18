import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import LoaderSpinner from "@/components/LoaderSpinner";

const AdminManagement = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [userId, setUserId] = useState("");
  
  // Mutation to set a user as admin
  const setUserAdmin = useMutation(api.users.setUserAdmin);
  
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
        
        <div className="flex gap-2">
          <Input
            placeholder="Enter Clerk User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-black-1/50 border border-gray-800 text-white-2"
          />
          <Button
            onClick={handleAddAdmin}
            disabled={!userId.trim()}
            className="bg-orange-1 text-black hover:bg-orange-2"
          >
            Add Admin
          </Button>
        </div>
        
        <p className="text-white-3 text-sm mt-2">
          Note: Enter the Clerk ID of the user you want to grant admin privileges to.
        </p>
      </div>
    </div>
  );
};

export default AdminManagement;