export interface PostFile {
    id: string;
    filename: string;
    fileType: string;
    post: Post;
}

export interface SigninInput {
    email: string;
    password: string;
}

export interface SignUpInput {
    email: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
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
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
    files: PostFile[];
    user: User;
    likes: User[];
}

export interface PostComment {
    id: string;
    comment: string;
    createdAt: Date;
    user: User;
}
