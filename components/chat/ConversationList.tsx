import { Conversation } from '@/app/types/chat';
import { format } from 'date-fns';
import { Trash2, HeartHandshake } from 'lucide-react';
import { useState, useMemo } from 'react';
import { ConfirmationDialog } from '../ui/confirmation-dialog';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ConversationListProps {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    onSelect: (conversation: Conversation) => void;
    onDelete: (conversation: Conversation) => Promise<void>;
}

export function ConversationList({
    conversations,
    currentConversation,
    onSelect,
    onDelete
}: ConversationListProps) {
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        conversation: Conversation | null;
    }>({
        open: false,
        conversation: null
    });
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Sort conversations by lastMessageAt
    const sortedConversations = useMemo(() => {
        return [...conversations].sort((a, b) =>
            new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );
    }, [conversations]);

    const handleDelete = async () => {
        if (deleteDialog.conversation) {
            await onDelete(deleteDialog.conversation);
            setDeleteDialog({ open: false, conversation: null });
        }
    };

    return (
        <>
            <div className="space-y-3">
                {sortedConversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={cn(
                            "group flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all bg-white shadow-sm border border-transparent hover:border-gradient-to-r hover:from-[#19A7CE]/30 hover:to-[#7EC8D3]/30 hover:shadow-lg",
                            currentConversation?.id === conversation.id
                                ? "border-2 border-gradient-to-r from-[#19A7CE] to-[#7EC8D3] bg-gradient-to-r from-[#eaf7fa] to-[#f4fafd] shadow-lg"
                                : ""
                        )}
                        onClick={() => onSelect(conversation)}
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#19A7CE] to-[#7EC8D3] flex items-center justify-center">
                            <HeartHandshake className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[#212429] truncate text-base">
                                {conversation.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate mt-0.5">
                                {conversation.lastMessage}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                                {format(new Date(conversation.lastMessageAt), 'MMM d, h:mm a')}
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteDialog({ open: true, conversation });
                            }}
                            className={cn(
                                "ml-2 p-1 rounded-full transition-all hover:bg-[#F784AD]/10",
                                isMobile
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            )}
                        >
                            <Trash2 className="w-4 h-4 text-[#F784AD]" />
                        </button>
                    </div>
                ))}
            </div>

            <ConfirmationDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
                onConfirm={handleDelete}
                title="Delete Conversation"
                description="Are you sure you want to delete this conversation? This action cannot be undone."
            />
        </>
    );
} 