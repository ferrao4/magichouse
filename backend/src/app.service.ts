import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'ok',
      message: 'Magic House API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
