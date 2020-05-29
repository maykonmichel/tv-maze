import fragment from '../../gql/fragment/EPISODE';

export default (parent, {id}, {cache}) => {
  return cache.readFragment({id: `Episode:${id}`, fragment});
};
