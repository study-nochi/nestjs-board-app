import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager); // 변경
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create(authCredentialsDto);
    await this.save(user);
  }
}
