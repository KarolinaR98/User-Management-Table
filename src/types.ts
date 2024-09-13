export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export enum Filter {
    name = "name",
    username = "username",
    email = "email",
    phone = "phone"
}