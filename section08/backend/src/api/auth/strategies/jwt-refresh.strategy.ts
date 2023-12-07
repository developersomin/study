import {PassportStrategy} from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh'){
    constructor() {
        super({
            jwtFromRequest: (req)=>{
                console.log(req.headers.cookie);
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('Webstorm-55941cca=39281e1b-d7ae-4ffc-bb3c-a69c2f1c2cd2; refreshToken=', '');
                return refreshToken;
            },
            secretOrKey: '나의리프레쉬토큰',
        });
    }

    validate(payload){
        console.log(payload);
        return {
            id: payload.sub,
        }
    }

}