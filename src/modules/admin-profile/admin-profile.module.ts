import { Module } from '@nestjs/common';
import { AdminProfileService } from './admin-profile.service';
import { AdminProfileController } from './admin-profile.controller';

@Module({
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
})
export class AdminProfileModule {}
