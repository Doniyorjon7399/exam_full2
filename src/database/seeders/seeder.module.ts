import { Module } from '@nestjs/common';
import { SeederServica } from './seeder.service';

@Module({
  providers: [SeederServica],
  exports: [SeederServica],
})
export class SeederModule {}
