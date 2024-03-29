import { Injectable } from "@nestjs/common";
import { CreateUserDTO, User } from "src/users/user.model";
import { hash } from 'bcrypt';
import { pgKnex } from "src/configs/db.config";
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "src/auth/auth.resolver";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService
  ) { }
    
  async findById(id: string) {
    try {
      return await pgKnex<User>('Users')
        .leftJoin('UserRoles', 'UserRoles.userId', 'Users.id')
        .first('Users.id', 'Users.name', 'Users.username', pgKnex.raw('JSON_AGG("UserRoles".role) as roles'))
        .where({ 'Users.id': id })
        .groupBy('Users.id', 'UserRoles.userId');

    } catch (err) {
      console.error(err);
      throw new Error(`Can't find User by Id...`);
    }
  }
  async findByUsername(username: string) {
    try {
      return await pgKnex<User>('Users')
        .leftJoin('UserRoles', 'UserRoles.userId', 'Users.id')
        .first('Users.*', pgKnex.raw('JSON_AGG("UserRoles".role) as roles'))
        .where({ 'Users.username': username })
        .groupBy('Users.id', 'UserRoles.userId');
    } catch (err) {
      console.error(err);
      throw new Error(`Can't find User by username...`);
    }
  }

  async createUser({ password: plainTextPassword, ...userData }: CreateUserDTO): Promise<AuthPayload> {
    const trx = await pgKnex.transaction();
    try {
      const saltRounds = 10;
      const passwordHash = await hash(plainTextPassword, saltRounds);

      const [userWithoutPassword] = await trx<User>('Users').insert({
        passwordHash,
        ...userData
      })
        .returning(['id', 'name', 'username']);

      await trx.commit();

      return {
        access_token: await this.jwtService.signAsync(userWithoutPassword)
      };
    } catch (err) {
      await trx.rollback();
      console.error(err);
      throw new Error(`Couldn't Create User`)
    }

  }
}