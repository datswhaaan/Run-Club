export type Member = {
    "id": number;
    "name": string;
    "email": string;
    "gender": string;
    "age": number;
    "pace": string;
    "paceMin": number;
    "paceSec": number;
}

export type MemberFormValues = Omit<Member, 'id' | 'pace'>