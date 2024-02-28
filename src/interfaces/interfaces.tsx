export interface Image {
    id: string;
    filename: string;
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
    coverImage: string;
    createdAt: Date;
}

export interface Post {
    id: string;
    postText: string;
    totalComments: number;
    createdAt: Date;
    updatedAt: Date;
    images: Image[];
    user: User;
}
