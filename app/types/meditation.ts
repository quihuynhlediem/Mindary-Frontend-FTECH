export interface MeditationProp {
    _id: string;
    title: string;
    author: string;
    tags: string[];
    media_length: number;
    description: string;
    transcripts: string;
    picture_url: string;
    media_url: string;
}

export interface Prop {
    meditation: MeditationProp;
    index: number;
}

