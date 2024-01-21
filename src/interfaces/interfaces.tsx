export interface Image {
    id: string;
    filename: string;
    name: string;
    description: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SigninInput {
    email: string;
    password: string;
}
