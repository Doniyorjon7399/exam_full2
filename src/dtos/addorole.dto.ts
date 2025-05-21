import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRoleDto {
  @IsUUID()
  userId: string;
}
