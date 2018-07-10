import { Llama } from './llama.model';

export class Post {
    user_id: string;
    text: string;
    createdAt: number;
    user?: Llama;
    _id: string;
}
