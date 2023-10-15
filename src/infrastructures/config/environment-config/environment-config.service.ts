import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../../../domains/config/database.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseUri(): string {
    return this.configService.get<string>('DATABASE_URI');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
}
