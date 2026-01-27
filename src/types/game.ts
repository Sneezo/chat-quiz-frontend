export type RoomState = "waiting" | "active" | "finished";

export type Question = {
    id: string;
    text: string;
};

export type Message = {
    id: string;
    userId: string;
    username: string;
    content: string;
    timestamp: number;
    isCorrect?: boolean;
};

export type Player = {
    userId: string;
    username: string;
    points: number;
}

export type RoomSnapshot = {
    roomId: string;
    state: RoomState;
    question: Question | null;
    players: Player[];
    messages: Message[];
    winnerUserId?: string;
}