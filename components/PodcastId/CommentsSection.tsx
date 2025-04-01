import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import DetailSection from './SectionDetail';
import { Id } from '@/convex/_generated/dataModel';
import { UserResource } from '@clerk/types';

// Update User interface to match UserResource properties
interface User {
    id: string;
    imageUrl: string;
    fullName?: string | null; // Changed to accept null
    username?: string | null; // Changed to accept null
}

interface Comment {
    _id: Id<"comments">;
    userId: string;
    userName: string;
    userImageUrl: string;
    content: string;
    _creationTime: number;
}

interface CommentsSectionProps {
    user: UserResource | User | null | undefined;  // Accept both UserResource and User
    podcastComments: Comment[] | undefined;
    comment: string;
    isOwner: boolean;
    setComment: (comment: string) => void;
    handleCommentSubmit: () => void;
    handleCommentDelete: (commentId: Id<"comments">) => void;
}

const CommentsSection = ({
    user,
    podcastComments,
    comment,
    isOwner,
    setComment,
    handleCommentSubmit,
    handleCommentDelete
}: CommentsSectionProps) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <DetailSection
            title="Comments"
            rightElement={
                podcastComments && podcastComments.length > 0 ? (
                    <span className="text-14 text-white-3 bg-black-1/50 px-3 py-1 rounded-full">
                        {podcastComments.length}
                    </span>
                ) : null
            }
        >
            {/* Add Comment Form */}
            {user && (
                <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-black-1/50 p-3 sm:p-4 rounded-lg border border-gray-800">
                        <div className="flex-shrink-0 relative w-8 h-8 sm:w-10 sm:h-10 mx-auto sm:mx-0">
                            <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                className="rounded-full object-cover"
                                fill
                                sizes="(max-width: 640px) 32px, 40px"
                            />
                        </div>
                        <div className="flex-grow">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === ' ') {
                                        e.stopPropagation();
                                    }
                                }}
                                placeholder="Share your thoughts..."
                                className="w-full bg-black-1/70 border border-gray-800 rounded-lg p-2 sm:p-3 text-white-2 placeholder:text-white-3 focus:outline-none focus:ring-1 focus:ring-orange-1 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                            />
                            <div className="flex justify-end mt-2 sm:mt-3">
                                <button
                                    onClick={handleCommentSubmit}
                                    disabled={!comment.trim()}
                                    className={`px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-all ${comment.trim()
                                        ? "bg-orange-1 text-black hover:bg-orange-2"
                                        : "bg-white-1/10 text-white-3 cursor-not-allowed"
                                        }`}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Show Comments Toggle */}
            {podcastComments && podcastComments.length > 0 ? (
                <div className="flex justify-center mb-3 sm:mb-4">
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-1 sm:gap-2 bg-black-1/50 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full hover:bg-white-1/10 transition-colors"
                    >
                        {showComments ? (
                            <>
                                <ChevronUp size={16} stroke="white" />
                                <span className="text-13 sm:text-14 font-medium text-white-2">
                                    <span className="hidden sm:inline">Hide Comments</span>
                                    <span className="sm:hidden">Hide</span>
                                </span>
                            </>
                        ) : (
                            <>
                                <ChevronDown size={16} stroke="white" />
                                <span className="text-13 sm:text-14 font-medium text-white-2">
                                    <span className="hidden sm:inline">Show {podcastComments.length} Comments</span>
                                    <span className="sm:hidden">Show {podcastComments.length}</span>
                                </span>
                            </>
                        )}
                    </button>
                </div>
            ) : (
                !user && (
                    <div className="text-center py-6 sm:py-8 bg-black-1/50 rounded-lg border border-gray-800">
                        <MessageCircle size={30} className="mx-auto mb-2 sm:mb-3 text-white-3" />
                        <p className="text-sm sm:text-base text-white-3 px-3">Sign in to comment!</p>
                    </div>
                )
            )}

            {/* Comments List */}
            {showComments && (
                <div className="space-y-4 sm:space-y-6">
                    {podcastComments && podcastComments.length > 0 ? (
                        podcastComments.map((comment) => (
                            <div key={comment._id} className="flex gap-2 sm:gap-4 bg-black-1/50 p-3 sm:p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                                <div className="flex-shrink-0 relative w-8 h-8 sm:w-10 sm:h-10">
                                    <Image
                                        src={comment.userImageUrl}
                                        alt={comment.userName}
                                        className="rounded-full object-cover"
                                        fill
                                        sizes="(max-width: 640px) 32px, 40px"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <h4 className="text-14 sm:text-16 font-medium text-white-1 truncate max-w-[120px] sm:max-w-none">{comment.userName}</h4>
                                            <span className="text-11 sm:text-12 text-white-3">
                                                {new Date(comment._creationTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        {user && (user.id === comment.userId || isOwner) && (
                                            <button
                                                onClick={() => handleCommentDelete(comment._id)}
                                                className="text-white-3 hover:text-red-500 transition-colors p-1 sm:p-1.5 rounded-full hover:bg-white-1/10"
                                                title="Delete comment"
                                            >
                                                <Trash2 size={14} className="sm:hidden" />
                                                <Trash2 size={16} className="hidden sm:block" />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-13 sm:text-15 text-white-2">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-6 sm:py-8 bg-black-1/50 rounded-lg border border-gray-800">
                            <MessageCircle size={30} className="mx-auto mb-2 sm:mb-3 text-white-3" />
                            <p className="text-sm sm:text-base text-white-3">No comments yet. Be the first!</p>
                        </div>
                    )}
                </div>
            )}
        </DetailSection>
    );
};

export default CommentsSection;