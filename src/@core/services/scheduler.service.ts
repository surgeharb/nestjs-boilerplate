import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule, ScheduleModule, Interval } from 'nest-schedule';
import { noop } from 'rxjs';

ScheduleModule.register({
  enable: true,
  maxRetry: -1,
  retryInterval: 5000,
});

@Injectable()
export class ScheduleService extends NestSchedule {

  private isCronServer = true;

  constructor() {
    super();
  }

  // // every hour per day
  // @Cron('0 0-23 * * *')
  // doJob1() {
  //   this.isCronServer ? console.info('EVERY HOUR') : noop();
  // }

  // // every sunday
  // @Cron('0 * * * 0')
  // doJob2() {
  //   this.isCronServer ? console.info('EVERY SUNDAY') : noop();
  // }

  // // every month
  // @Cron('1 * 2 * *')
  // doJob3() {
  //   this.isCronServer ? console.info('EVERY MONTH') : noop();
  // }

}
