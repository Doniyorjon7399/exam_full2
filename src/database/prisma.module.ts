import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SeederServica } from './seeders/seeder.service';
@Global()
@Module({
  imports: [],
  providers: [PrismaService, SeederServica],
  exports: [PrismaService],
})
export class PrismaModule {}
