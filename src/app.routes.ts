import { Routes } from 'nest-router';

import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },

      { path: '/upload', module: UploadModule },

      { path: '/users', module: UsersModule },
    ],
  },
];
