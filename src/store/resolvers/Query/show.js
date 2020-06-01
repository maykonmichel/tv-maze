import fragment from '../../gql/fragment/SHOW';

export default (parent, {id}, {cache}) =>
  cache.readFragment({id: `Show:${id}`, fragment});
