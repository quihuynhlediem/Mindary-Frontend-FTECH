import { Conversation } from '@/app/types/chat';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
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
            <div className="space-y-1">
                {sortedConversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={cn(
                            "group p-3 rounded-lg cursor-pointer transition-colors",
                            "hover:bg-[#7EC8D3]/10",
                            currentConversation?.id === conversation.id
                                ? "bg-[#7EC8D3]/10 border border-[#7EC8D3]/20"
                                : "hover:border hover:border-[#7EC8D3]/20"
                        )}
                        onClick={() => onSelect(conversation)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#212429] truncate">
                                    {conversation.title}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    {conversation.lastMessage}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {format(new Date(conversation.lastMessageAt), 'MMM d, h:mm a')}
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteDialog({ open: true, conversation });
                                }}
                                className={cn(
                                    "p-1 rounded transition-all",
                                    isMobile
                                        ? "opacity-100 bg-[#F784AD]/10"
                                        : "opacity-0 group-hover:opacity-100 hover:bg-[#F784AD]/10"
                                )}
                            >
                                <Trash2 className="w-4 h-4 text-[#F784AD]" />
                            </button>
                        </div>
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