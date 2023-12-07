import {PassportStrategy} from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access'){
    constructor() {
        super({
            /*jwtFromRequest: (req)=>{
                const temp = req.header.Authorization;
                const accessToken = temp.toLowerCase().replace('bearer ', '');
                return accessToken;
            },*/
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '나의비밀번호',
        });
    }

    validate(payload){
        console.log(payload);
        return {
            id: payload.sub,
        }
    }

}