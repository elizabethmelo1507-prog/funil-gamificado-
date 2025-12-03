export enum GamePhase {
    INTRO = 0,
    CHAT = 1,
    EVIDENCE_BOARD = 2,
    INCOMING_CALL = 3,
    ACTIVE_CALL = 4,
    RECORDINGS = 5,
    REPORT = 6,
    OFFER = 7
}

export interface TapeData {
    id: string;
    title: string;
    description: string;
    insight: string;
    visualDesc: string;
    type: 'problem' | 'solution';
}