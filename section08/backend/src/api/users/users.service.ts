import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {IUserServiceCreate, IUserServiceFindByEmail} from "./interface/users-service.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository : Repository<User>) {
    }
    async create({email, password, name, age}: IUserServiceCreate) : Promise<User>{
        const user = await this.findByEmail({email});
        if(user){
            throw new HttpException('이미 등록된 이메일입니다', HttpStatus.CONFLICT);
        }
        const hashPassword = await bcrypt.hash(password,10);
        return this.usersRepository.save({
            email,
            password: hashPassword,
            name,
            age,
        });
    }

    findByEmail({email}: IUserServiceFindByEmail) {
        return this.usersRepository.findOne({where: {email}});
    }

}