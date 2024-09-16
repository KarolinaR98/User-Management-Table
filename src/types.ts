export enum FilterType {
    name = "name",
    username = "username",
    email = "email",
    phone = "phone",
}

export type User = {
    id: number;
} & Record<FilterType, string>

