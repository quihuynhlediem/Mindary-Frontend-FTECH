import { atom } from 'jotai';
import { Conversation, ChatMessage } from '@/app/types/chat';

export const conversationsAtom = atom<Conversation[]>([]);
export const currentConversationAtom = atom<Conversation | null>(null);
export const messagesAtom = atom<ChatMessage[]>([]);
export const loadingAtom = atom(false); 