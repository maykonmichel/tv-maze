import fragment from '../../gql/fragment/SHOW';

export default (parent, {id}, {cache}) => {
  return cache.readFragment({id: `Show:${id}`, fragment});
};
