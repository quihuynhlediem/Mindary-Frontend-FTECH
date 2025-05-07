"use client";
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { conversationsAtom, currentConversationAtom, loadingAtom, messagesAtom } from '@/store/chatStore';
import { chatService } from '@/services/chatService';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatArea } from '@/components/chat/ChatArea';
import { EmptyState } from '@/components/chat/EmptyState';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { MessageInput } from '@/components/chat/MessageInput';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Conversation, ChatMessage } from '@/app/types/chat';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function ChatPage() {
    const [loading, setLoading] = useAtom(loadingAtom);
    const [conversations, setConversations] = useAtom(conversationsAtom);
    const [currentConversation, setCurrentConversation] = useAtom(currentConversationAtom);
    const [messages, setMessages] = useAtom(messagesAtom);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                router.push('/login');
                return false;
            }
            return true;
        };

        const fetchConversations = async () => {
            if (!checkAuth()) return;

            try {
                setLoading(true);
                const userId = localStorage.getItem('userId')!;
                const conversations = await chatService.getUserConversations(userId);
                setConversations(conversations);
            } catch (error: any) {
                console.error('Error fetching conversations:', error);
                if (error.response?.status === 401) {
                    router.push('/login');
                } else {
                    handleError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const handleError = (error: any) => {
        console.error('Error:', error);
        toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data?.message || "Something went wrong"
        });
    };

    const handleNewChat = () => {
        setIsCreatingChat(true);
        setCurrentConversation(null);
    };

    const handleInitialMessage = async (message: string) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            const response = await chatService.createConversation({
                userId,
                message
            });

            const { conversation: newConversation, messages: initialMessages } = response;

            setConversations(prev => [...prev, newConversation]);
            setCurrentConversation(newConversation);

            const messagesWithResponses = initialMessages.flatMap((msg: ChatMessage) => [
                {
                    ...msg,
                    type: 'USER'
                },
                ...(msg.response ? [{
                    ...msg,
                    id: msg.id + '_response',
                    message: msg.response,
                    type: 'AI'
                }] : [])
            ]);

            setMessages(messagesWithResponses);
            setIsCreatingChat(false);
        } catch (error: any) {
            console.error('Error creating conversation:', error);
            if (error.response?.status === 401) {
                router.push('/login');
            } else {
                handleError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConversation = async (conversation: Conversation) => {
        try {
            setLoading(true);
            await chatService.deleteConversation(conversation.id);

            setConversations(prev => prev.filter(conv => conv.id !== conversation.id));

            if (currentConversation?.id === conversation.id) {
                setCurrentConversation(null);
                setMessages([]);
            }

            toast({
                title: "Success",
                description: "Conversation deleted successfully",
                style: {
                    backgroundColor: '#7EC8D3',
                    color: 'white'
                }
            });
        } catch (error) {
            console.error('Error deleting conversation:', error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBackToList = () => {
        setCurrentConversation(null);
    };

    if (loading) {
        return (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow">Loading...</div>
            </div>
        );
    }

    // On mobile, show either conversation list or chat area
    if (isMobile) {
        if (!currentConversation && !isCreatingChat) {
            // Show conversation list on mobile
            return (
                <div className="flex flex-col h-screen p-4 bg-background">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Chat</h1>
                        <Button
                            onClick={handleNewChat}
                            disabled={loading || isCreatingChat}
                            variant="secondary"
                        >
                            New Chat
                        </Button>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <ConversationList
                            conversations={filteredConversations}
                            currentConversation={currentConversation}
                            onSelect={(conv) => {
                                setIsCreatingChat(false);
                                setCurrentConversation(conv);
                            }}
                            onDelete={handleDeleteConversation}
                        />
                    </div>
                </div>
            );
        }

        // Show chat area on mobile
        return (
            <div className="flex flex-col h-screen bg-background">
                <div className="flex items-center px-4 py-3 border-b bg-card/50 backdrop-blur">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBackToList}
                        className="mr-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold">
                        {isCreatingChat ? "New Chat" : currentConversation?.title}
                    </h1>
                </div>

                {isCreatingChat ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <div className="w-full max-w-md space-y-4">
                            <h2 className="text-xl font-semibold text-center">Start a New Chat</h2>
                            <p className="text-gray-500 text-center">
                                What would you like to talk about?
                            </p>
                            <MessageInput
                                onSend={handleInitialMessage}
                                disabled={loading}
                                placeholder="Type your first message..."
                                autoFocus
                            />
                        </div>
                    </div>
                ) : currentConversation ? (
                    <ChatArea
                        conversation={currentConversation}
                        isMobile={true}
                    />
                ) : (
                    <EmptyState />
                )}
            </div>
        );
    }

    // Desktop view remains unchanged
    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Chat</h1>
                        <Button
                            onClick={handleNewChat}
                            disabled={loading || isCreatingChat}
                            variant="secondary"
                        >
                            New Chat
                        </Button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    <ConversationList
                        conversations={filteredConversations}
                        currentConversation={currentConversation}
                        onSelect={(conv) => {
                            setIsCreatingChat(false);
                            setCurrentConversation(conv);
                        }}
                        onDelete={handleDeleteConversation}
                    />
                </div>
            </div>

            <div className="chat-main">
                {isCreatingChat ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <div className="w-full max-w-md space-y-4">
                            <h2 className="text-xl font-semibold text-center">Start a New Chat</h2>
                            <p className="text-gray-500 text-center">
                                What would you like to talk about?
                            </p>
                            <MessageInput
                                onSend={handleInitialMessage}
                                disabled={loading}
                                placeholder="Type your first message..."
                                autoFocus
                            />
                        </div>
                    </div>
                ) : currentConversation ? (
                    <ChatArea
                        conversation={currentConversation}
                    />
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
} 