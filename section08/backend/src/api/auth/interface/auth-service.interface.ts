import {User} from "../../users/entities/user.entity";
import {IAuthUser, IContext} from "../../../commons/interface/common.interface";

export interface IAuthServiceLogin{
    email: string;
    password: string;
    context: IContext;
}

export interface IAuthServiceGetAccessToken{
    user: User | IAuthUser['user'];
}

export interface IAuthServiceGetRefreshToken{
    user: User;
    context: IContext;
}

export interface IAuthServiceRestoreAccessToken{
    user: IAuthUser['user'];
}