import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { compare } from 'bcrypt';
import { AuthPayload } from "./auth.resolver";
import { User } from '../users/user.model';
import { JwtPayload } from "./jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(payload: JwtPayload): Promise<User> {
    // Example implementation
    console.log(payload);
    const userId = payload.id; // Assuming the payload contains a "sub" field for the user ID

    // Implement your own logic to fetch and validate the user
    // For example, you can fetch the user from a database
    return await this.userService.findById(userId);
  }

  async login(username: string, password: string): Promise<AuthPayload> {
    try {
      const user = await this.userService.findByUsername(username);

      if (!user) {
        throw new UnauthorizedException();
      }

      const { passwordHash, ...userWithoutPassword } = user;
      const success = await compare(password, passwordHash);
      
      if (!success) throw new UnauthorizedException();
      else return {
        access_token: await this.jwtService.signAsync(userWithoutPassword),
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}