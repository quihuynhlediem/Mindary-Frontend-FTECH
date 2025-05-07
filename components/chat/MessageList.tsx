import { ChatMessage } from '@/app/types/chat';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MessageListProps {
    messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
    return (
        <div className="chat-messages">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                        "flex gap-3",
                        message.type === 'USER' ? "justify-end" : "justify-start"
                    )}
                >
                    <div
                        className={cn(
                            "max-w-[70%] rounded-lg p-4",
                            message.type === 'USER'
                                ? "bg-[#7EC8D3] text-white"
                                : "bg-card border shadow-sm"
                        )}
                    >
                        <div className="text-sm whitespace-pre-wrap break-words">
                            {message.message}
                        </div>
                        <div className={cn(
                            "text-xs mt-2",
                            message.type === 'USER'
                                ? "text-white/70"
                                : "text-muted-foreground"
                        )}>
                            {format(new Date(message.timestamp), 'h:mm a')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 