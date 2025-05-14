import { Injectable } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

@Injectable()
export class AdminProfileService {
  create(createAdminProfileDto: CreateAdminProfileDto) {
    return 'This action adds a new adminProfile';
  }

  findAll() {
    return `This action returns all adminProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminProfile`;
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return `This action updates a #${id} adminProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminProfile`;
  }
}
