import { Llama } from './llama.model';

export class Post {
    user_id: string;
    text: string;
    createdAt: number;
    _id: string;
}

export class UserPost extends Post {
    user: Llama;
    canDelete: boolean;
}
