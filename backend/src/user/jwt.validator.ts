import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.model";
import { Repository } from "typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DecodedToken } from "./decoded-token.dto";


@Injectable()
export class JwtValidator extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super({
            jwtFromRecuest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'admin'
        });
    }
    async validate(payload: DecodedToken) {
        const user = await this.userRepository.findOne({
            where: {id: payload.sub}
        });
        if(!user)
            throw new UnauthorizedException('Usuario incorrecto');
        return user;
    }
}