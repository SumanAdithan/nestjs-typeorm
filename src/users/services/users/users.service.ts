import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({ ...userDetails });
    return this.userRepository.save(newUser);
  }

  async updateUser(userId: number, updateUserDetails: UpdateUserParams) {
    const result = await this.userRepository.update(
      { id: userId },
      { ...updateUserDetails },
    );

    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User updated successfully' };
  }

  async deleteUser(userId: number) {
    const result = await this.userRepository.delete({ id: userId });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User deleted successfully' };
  }
}
