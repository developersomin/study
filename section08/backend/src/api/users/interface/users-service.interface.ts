export interface IUserServiceCreate{
    email: string;
    password: string;
    name: string;
    age: number;
}

export interface IUserServiceFindByEmail{
    email: string;
}