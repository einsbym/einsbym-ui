export interface PostFileType {
    id: string;
    filename: string;
    fileType: string;
    post: PostType;
}

export interface SignInType {
    email: string;
    password: string;
}

export interface SignUpType {
    email: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    profilePicture: string;
    coverImage: string;
    isPrivate: boolean;
    createdAt: Date;
}

export interface PostType {
    id: string;
    postText: string;
    totalComments: number;
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
    files: PostFileType[];
    user: UserType;
    likes: UserType[];
}

export interface CommentType {
    id: string;
    comment: string;
    createdAt: Date;
    user: UserType;
    totalReplies: number;
}

export interface ReplyType {
    id: string;
    reply: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserType;
}
