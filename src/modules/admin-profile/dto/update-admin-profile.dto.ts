import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminProfileDto } from './create-admin-profile.dto';

export class UpdateAdminProfileDto extends PartialType(CreateAdminProfileDto) {}
