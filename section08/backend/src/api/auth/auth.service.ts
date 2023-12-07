import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {
    IAuthServiceGetAccessToken, IAuthServiceGetRefreshToken,
    IAuthServiceLogin,
    IAuthServiceRestoreAccessToken
} from "./interface/auth-service.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService) {
    }

    async login({email,password,context}:IAuthServiceLogin):Promise<string>{
        const user = await this.usersService.findByEmail({email});
        if (!user) {
            throw new HttpException('이메일이 없습니다.', 422);
        }

        const isAuth = await bcrypt.compare(password, user.password);
        if(!isAuth){
            throw new HttpException('암호가 틀렸습니다.', 422);
        }
        this.setRefreshToken({user, context});

        return this.getAccessToken({user}); //body
    }

    getAccessToken({user}:IAuthServiceGetAccessToken):string{
        return this.jwtService.sign(
            {sub: user.id},
            {secret: '나의비밀번호', expiresIn: '10h'},
        );
    }

    setRefreshToken({user,context}:IAuthServiceGetRefreshToken){
        const refreshToken = this.jwtService.sign(
            {sub: user.id},
            {secret: '나의리프레쉬토큰', expiresIn: '2w'}
        );

        context.res.setHeader(
            'set-Cookie',
            `refreshToken=${refreshToken}; path=/;`,
        ); //body 나갈때 같이 나감
    }

    restoreAccessToken({user}:IAuthServiceRestoreAccessToken){
        return this.getAccessToken({user});
    }
}