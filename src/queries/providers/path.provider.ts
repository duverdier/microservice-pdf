import { Paths } from '../models';

export const PATH_REPOSITORY = 'PATH_REPOSITORY';

export const pathProviders = [
  {
    provide: PATH_REPOSITORY,
    useValue: Paths,
  },
];
