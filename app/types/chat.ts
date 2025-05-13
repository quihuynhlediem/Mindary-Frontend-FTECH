export interface ChatRequest {
    userId: string;     // UUID format
    message: string;    // Non-empty string
    mode?: 'therapist' | 'homie'; // Optional mode for therapist/homie
}

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    lastMessageAt: string;
    lastMessage: string;
    status: 'ACTIVE' | 'ARCHIVED';
    followUpType: 'HEALTH_CHECK' | 'ANXIETY_CHECK' | 'SLEEP_CHECK' | 'MOOD_CHECK' | 'GENERAL_CHECK';
    followUpDue: string;
    followedUp: boolean;
}

export interface ChatMessage {
    id: string;
    userId: string;
    conversationId: string;
    message: string;
    response: string;
    timestamp: string;
    diaryInsight: string;
    tokenCount: number;
    type: 'USER' | 'AI';
}

export interface ApiErrorResponse {
    status: number;
    message: string;
}

export interface CreateConversationResponse {
    messages: ChatMessage[];
    conversation: Conversation;
}