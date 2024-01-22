export interface Image {
    id: string;
    filename: string;
    name: string;
    description: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    user: User;
}

export interface SigninInput {
    email: string;
    password: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    profilePicture: string;
    createdAt: Date;
}
