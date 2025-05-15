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
import { Menu, X, Edit2, Info } from 'lucide-react';
import { LoadingDots } from './LoadingDots';
import Cookies from 'js-cookie';

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
    const [mode, setMode] = useState<'therapist' | 'homie'>('therapist');
    const [showInfo, setShowInfo] = useState(false);

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

        const userId = Cookies.get('userId');
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

            setConversations(prev => prev.map(conv =>
                conv.id === conversation.id
                    ? {
                        ...conv,
                        lastMessage: content,
                        lastMessageAt: new Date().toISOString()
                    }
                    : conv
            ));

            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }

            const response = await chatService.sendMessage(conversation.id, {
                userId,
                message: content,
                mode
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
        <div className={"flex flex-col min-h-0 w-full bg-background/80" + (isMobile ? '' : ' p-0') + " rounded-xl shadow-lg overflow-hidden"} style={{ height: 'calc(100vh - 4rem)' }}>
            <div className={isMobile ? "flex items-center justify-between flex-shrink-0 h-[56px] px-4 border-b bg-white/90" : "flex items-center justify-between flex-shrink-0 h-[72px] px-8 border-b"} style={{ minHeight: isMobile ? '56px' : '72px' }}>
                <div className="flex items-center gap-2 flex-1">
                    {isEditingTitle ? (
                        <Input
                            ref={titleInputRef}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={handleTitleKeyDown}
                            onBlur={handleTitleBlur}
                            className={isMobile ? "max-w-xs text-lg font-semibold" : "max-w-md text-xl font-semibold"}
                            autoFocus
                        />
                    ) : (
                        <h2 className={isMobile ? "text-lg font-bold text-[#212429] truncate max-w-[140px]" : "text-2xl font-bold text-[#212429]"}>{conversation.title}</h2>
                    )}
                    {isEditingTitle ? null : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditingTitle(true)}
                            className="hover:bg-[#7EC8D3]/10"
                        >
                            <Edit2 className="h-4 w-4 text-[#7EC8D3]" />
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#f4f8fa] rounded-full px-2 py-1 shadow border">
                        <button
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${mode === 'therapist' ? 'bg-[#7EC8D3] text-white shadow' : 'text-[#212429]'}`}
                            onClick={() => setMode('therapist')}
                        >
                            Therapist
                        </button>
                        <button
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ml-1 ${mode === 'homie' ? 'bg-[#7EC8D3] text-white shadow' : 'text-[#212429]'}`}
                            onClick={() => setMode('homie')}
                        >
                            Homie
                        </button>
                    </div>
                    <div className="relative">
                        <button
                            className="ml-2 p-1 rounded-full hover:bg-[#7EC8D3]/20 transition-colors"
                            onClick={() => setShowInfo(v => !v)}
                            aria-label="Mode info"
                            type="button"
                        >
                            <Info className="w-5 h-5 text-[#7EC8D3]" />
                        </button>
                        {showInfo && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 text-sm text-gray-700" onMouseLeave={() => setShowInfo(false)}>
                                <div className="font-semibold mb-1">What does this do?</div>
                                <div className="mb-2"><span className="font-bold">Therapist Mode:</span> Professional, warm, supportive, evidence-based advice. Slightly longer, more structured responses if you ask for details.</div>
                                <div><span className="font-bold">Homie Mode:</span> Super casual, friendly, uses slang/emojis, short and relatable. Feels like chatting with a best friend.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Message List fills available space */}
            <div ref={messageContainerRef} className="flex-1 min-h-0 overflow-y-auto px-8 py-6 custom-scrollbar bg-transparent">
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

            {/* Input fixed at bottom */}
            <div className="sticky bottom-0 left-0 w-full bg-background/80 pt-2 pb-4 px-8 z-10 border-t">
                <MessageInput onSend={handleSendMessage} disabled={sending} />
            </div>
        </div>
    );
} 
