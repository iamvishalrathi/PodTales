'use client'

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

type SocialLink = {
  platform: string;
  url: string;
  customPlatform?: string; // Add this field to store custom platform names
};

type ProfileEditModalProps = {
  clerkId: string;
  initialName?: string;
  initialBio?: string;
  initialWebsite?: string;
  initialSocialLinks?: SocialLink[];
};

const PLATFORM_OPTIONS = [
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "other", label: "Other" },
];

// Add URL validation helper function
const validateSocialUrl = (platform: string, url: string): boolean => {
  if (!url) return true; // Empty URLs are allowed (will be filtered out on submit)

  const urlPatterns: Record<string, RegExp> = {
    twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/i,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/i,
    facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
    github: /^https?:\/\/(www\.)?github\.com\/.+/i,
    other: /^https?:\/\/.+/i, // Any valid URL for "other"
  };

  return urlPatterns[platform]?.test(url) || false;
};

export default function ProfileEditModal({
  clerkId,
  initialName = "",
  initialBio = "",
  initialWebsite = "",
  initialSocialLinks = [],
}: ProfileEditModalProps) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [website, setWebsite] = useState(initialWebsite);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [urlErrors, setUrlErrors] = useState<Record<number, string>>({});

  // Prevent auto-focus on any input when modal opens
  useEffect(() => {
    if (open && dialogRef.current) {
      // Set focus to the dialog container itself
      dialogRef.current.focus();

      // Add a one-time event listener to capture and prevent focus events
      const preventFocus = (e: FocusEvent) => {
        if (e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement) {
          dialogRef.current?.focus();
        }
      };

      document.addEventListener('focusin', preventFocus, { once: true });

      return () => {
        document.removeEventListener('focusin', preventFocus);
      };
    }
  }, [open]);

  const updateProfile = useMutation(api.users.updateUserProfile);
  const { toast } = useToast();

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "twitter", url: "", customPlatform: "" }]);
  };

  const handleRemoveSocialLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...socialLinks];

    if (field === "platform" && value === "other") {
      // Initialize customPlatform when switching to "other"
      newLinks[index] = { ...newLinks[index], [field]: value, customPlatform: "" };
    } else if (field === "platform" && newLinks[index].customPlatform) {
      // Clear customPlatform when switching from "other" to a predefined platform
      newLinks[index] = { ...newLinks[index], [field]: value, customPlatform: undefined };
    } else {
      newLinks[index] = { ...newLinks[index], [field]: value };
    }

    setSocialLinks(newLinks);

    // Clear error when platform changes
    if (field === "platform") {
      setUrlErrors(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }

    // Validate URL when URL changes
    if (field === "url" && value) {
      const isValid = validateSocialUrl(newLinks[index].platform, value);
      setUrlErrors(prev => ({
        ...prev,
        [index]: isValid ? "" : `Invalid URL for ${newLinks[index].platform === "other" && newLinks[index].customPlatform
          ? newLinks[index].customPlatform
          : PLATFORM_OPTIONS.find(p => p.value === newLinks[index].platform)?.label}`
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Check for URL validation errors
      const hasErrors = Object.values(urlErrors).some(error => error !== "");

      // Check for missing custom platform names
      const missingCustomPlatforms = socialLinks.some(
        link => link.platform === "other" && (!link.customPlatform || link.customPlatform.trim() === "")
      );

      if (hasErrors) {
        toast({
          title: "Invalid social links",
          description: "Please correct the errors in your social links before saving.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (missingCustomPlatforms) {
        toast({
          title: "Missing platform name",
          description: "Please provide a name for all custom platforms.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Filter out empty social links and prepare for submission
      const filteredLinks = socialLinks
        .filter(link => link.url.trim() !== "")
        .map(link => {
          // For "other" platform, use the customPlatform as the platform name
          if (link.platform === "other" && link.customPlatform) {
            return {
              platform: link.customPlatform,
              url: link.url
            };
          }
          return {
            platform: link.platform,
            url: link.url
          };
        });

      await updateProfile({
        clerkId,
        name: name.trim() !== "" ? name : undefined,
        bio: bio.trim() !== "" ? bio : undefined,
        website: website.trim() !== "" ? website : undefined,
        socialLinks: filteredLinks.length > 0 ? filteredLinks : undefined,
      });

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        duration: 3000,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          id="profile-edit-button"
          variant="outline"
          className="gap-2.5 bg-black-1/50 hover:bg-black-1/70 text-white-1 flex items-center px-6 py-2.5 rounded-full border border-gray-800 transition-all duration-200 shadow-sm"
        >
          <Pencil size={16} className="text-orange-1" />
          <span className="font-medium">Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={dialogRef}
        className="bg-black-1 border-gray-800 text-white-1 max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide w-[95vw] p-4 sm:p-6"
        onOpenAutoFocus={(e) => {
          e.preventDefault(); // Prevent the default auto-focus behavior
        }}
        tabIndex={0} // Make the dialog container focusable
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white-1">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white-2">Name</Label>
            <Input
              id="name"
              placeholder="Your display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                // Prevent default behavior for space key to ensure it's captured
                if (e.key === ' ') {
                  e.stopPropagation();
                }
              }}
              className="bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1"
              autoFocus={false}
              tabIndex={-1} // This helps prevent focus during tab navigation
            />
          </div>

          {/* Bio */}
          <div className="space-y-2 w-full">
            <Label htmlFor="bio" className="text-white-2">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onKeyDown={(e) => {
                // Prevent default behavior for space key to ensure it's captured
                if (e.key === ' ') {
                  e.stopPropagation();
                }
              }}
              className="bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1 w-full min-h-[100px]"
              maxLength={250}
            />
            <p className="text-xs text-white-3 text-right">{bio.length}/250</p>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-white-2">Website</Label>
            <Input
              id="website"
              placeholder="https://yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-white-2">Social Links</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSocialLink}
                className="h-8 gap-1 border-white-1/20 text-white-1 hover:bg-white-1/10"
                disabled={socialLinks.length >= 5}
              >
                <Plus size={14} />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>

            {socialLinks.length === 0 ? (
              <p className="text-sm text-white-3 italic">No social links added yet.</p>
            ) : (
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={link.platform}
                        onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                        className="bg-black-2 border border-gray-800 rounded-md text-white-1 focus:ring-orange-1 focus:border-orange-1 text-sm h-10 w-full sm:w-1/3"
                      >
                        {PLATFORM_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {link.platform === "other" ? (
                        <div className="flex w-full gap-2">
                          <Input
                            placeholder="Platform name *"
                            value={link.customPlatform || ""}
                            onChange={(e) => handleSocialLinkChange(index, "customPlatform", e.target.value)}
                            className={`bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1 flex-1 ${!link.customPlatform || link.customPlatform.trim() === "" ? 'border-red-500' : ''
                              }`}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSocialLink(index)}
                            className="h-10 w-10 text-white-3 hover:text-red-500 hover:bg-white-1/10 flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex w-full gap-2">
                          <Input
                            placeholder={`Your ${PLATFORM_OPTIONS.find(p => p.value === link.platform)?.label} URL`}
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                            className={`bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1 flex-1 ${urlErrors[index] ? 'border-red-500' : ''}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSocialLink(index)}
                            className="h-10 w-10 text-white-3 hover:text-red-500 hover:bg-white-1/10 flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Add URL field on next line for "other" platform */}
                    {link.platform === "other" && (
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Your ${link.customPlatform || "Other"} URL`}
                          value={link.url}
                          onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                          className={`bg-black-2 border-gray-800 text-white-1 focus:ring-orange-1 focus:border-orange-1 w-full ${urlErrors[index] ? 'border-red-500' : ''}`}
                        />
                      </div>
                    )}

                    {urlErrors[index] && (
                      <p className="text-xs text-red-500 mt-1">{urlErrors[index]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {socialLinks.length >= 5 && (
              <p className="text-xs text-white-3">Maximum of 5 social links allowed.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-white-2 hover:bg-white-1/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-orange-1 hover:bg-orange-1/90 text-black"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}