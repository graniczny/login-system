import _ from 'lodash';

import { userResolves } from './user';

export const resolvers = _.merge(userResolves);
