import { useState, useEffect, useRef } from 'react';
import { Conversation, ChatMessage } from '@/app/types/chat';
import { useAtom } from 'jotai';
import { messagesAtom, currentConversationAtom, conversationsAtom } from '@/store/chatStore';
import { chatService } from '@/services/chatService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Edit2 } from 'lucide-react';
import { LoadingDots } from './LoadingDots';

interface ChatAreaProps {
    conversation: Conversation;
    isMobile?: boolean;
}

export function ChatArea({ conversation, isMobile }: ChatAreaProps) {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [currentConversation, setCurrentConversation] = useAtom(currentConversationAtom);
    const [conversations, setConversations] = useAtom(conversationsAtom);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(conversation.title);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const [isAiResponding, setIsAiResponding] = useState(false);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        setNewTitle(conversation.title);
    }, [conversation.title]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const messages = await chatService.getConversationMessages(conversation.id);
                const messagesWithResponses = messages.flatMap(msg => [
                    { ...msg, type: 'USER' as const },
                    { ...msg, id: msg.id + '_response', message: msg.response, type: 'AI' as const }
                ]);
                setMessages(messagesWithResponses);
            } catch (error) {
                console.error('Error fetching messages:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load messages"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [conversation.id]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userId = localStorage.getItem('userId');
        if (!userId) {
            window.location.href = '/login';
            return;
        }

        try {
            setSending(true);
            setIsAiResponding(true);

            // Add user message immediately
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                conversationId: conversation.id,
                userId,
                message: content,
                type: 'USER' as const,
                timestamp: new Date().toISOString(),
                response: '',
                diaryInsight: '',
                tokenCount: 0
            };

            setMessages(prev => [...prev, userMessage]);

            // Update conversation list immediately with user's message
            setConversations(prev => prev.map(conv =>
                conv.id === conversation.id
                    ? {
                        ...conv,
                        lastMessage: content,
                        lastMessageAt: new Date().toISOString()
                    }
                    : conv
            ));

            // Scroll to bottom after adding user message
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }

            const response = await chatService.sendMessage(conversation.id, {
                userId,
                message: content
            });

            setMessages((prev) => [
                ...prev.filter(msg => msg.id !== userMessage.id), // Remove temporary user message
                response,
                {
                    ...response,
                    id: response.id + '_response',
                    message: response.response,
                    type: 'AI',
                    timestamp: response.timestamp
                }
            ]);

            // Update conversation list with AI's response
            setConversations(prev => prev.map(conv =>
                conv.id === conversation.id
                    ? {
                        ...conv,
                        lastMessage: response.response,
                        lastMessageAt: response.timestamp
                    }
                    : conv
            ));

        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send message"
            });
        } finally {
            setSending(false);
            setIsAiResponding(false);
        }
    };

    const handleTitleUpdate = async () => {
        if (newTitle === conversation.title) {
            setIsEditingTitle(false);
            return;
        }

        try {
            console.log('Starting title update for conversation:', conversation.id);
            const updatedConversation = await chatService.updateConversationTitle(conversation.id, newTitle);

            if (updatedConversation) {
                setCurrentConversation(updatedConversation);
                setConversations(prev => prev.map(conv =>
                    conv.id === updatedConversation.id ? updatedConversation : conv
                ));
                setIsEditingTitle(false);
                toast({
                    title: "Success",
                    description: "Title updated successfully",
                    style: { backgroundColor: '#7EC8D3', color: 'white' }
                });
            }
        } catch (error: any) {
            console.error('Error updating title:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || "Failed to update title"
            });
            setNewTitle(conversation.title); // Reset to original title on error
        }
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleUpdate();
        } else if (e.key === 'Escape') {
            setNewTitle(conversation.title);
            setIsEditingTitle(false);
        }
    };

    const handleTitleBlur = () => {
        handleTitleUpdate();
    };

    return (
        <div className="chat-container">
            <div className="chat-main">
                {!isMobile && (
                    <div className="chat-header">
                        <div className="flex items-center gap-4 flex-1">
                            {isEditingTitle ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <Input
                                        ref={titleInputRef}
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        onKeyDown={handleTitleKeyDown}
                                        onBlur={handleTitleBlur}
                                        className="max-w-md text-xl font-semibold"
                                        autoFocus
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 flex-1">
                                    <h2 className="text-xl font-semibold">{conversation.title}</h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsEditingTitle(true)}
                                        className="hover:bg-[#7EC8D3]/10"
                                    >
                                        <Edit2 className="h-4 w-4 text-[#7EC8D3]" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div ref={messageContainerRef} className="chat-messages custom-scrollbar">
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-gray-500">Loading messages...</div>
                        </div>
                    ) : (
                        <>
                            <MessageList messages={messages} />
                            {isAiResponding && (
                                <div className="flex justify-start">
                                    <div className="max-w-[70%] rounded-lg p-4 bg-card border shadow-sm">
                                        <LoadingDots />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="chat-input-container">
                    <MessageInput onSend={handleSendMessage} disabled={sending} />
                </div>
            </div>
        </div>
    );
} 