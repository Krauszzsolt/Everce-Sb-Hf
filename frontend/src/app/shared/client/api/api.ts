export * from './test.service';
import { TestService } from './test.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [TestService, UsersService];
