import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
}

export function MessageInput({
    onSend,
    disabled,
    placeholder = "Type a message...",
    autoFocus = false
}: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-container">
            <div className="flex gap-2 items-end max-w-5xl mx-auto">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className="flex-1 min-h-[48px] max-h-[200px] resize-none rounded-lg"
                    disabled={disabled}
                />
                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    variant="default"
                    size="icon"
                    className="h-12 w-12"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </form>
    );
} 