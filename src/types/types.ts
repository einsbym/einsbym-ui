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
    role: string;
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

export interface BlogPostBlocks {
    id: string;
    data: {
        level: string;
        text: string;
    };
    type: string;
}

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    filename: string;
    body: {
        time: string;
        version: string;
        blocks: BlogPostBlocks[];
    };
    views: number;
    isPublished: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
