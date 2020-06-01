import fragment from '../../gql/fragment/FAVORITE';

export default async (parent, {id}, {cache}) => {
  const {favorite} = await cache.readFragment({
    id: `Show:${id}`,
    fragment,
  });

  return {__typename: 'Show', id, favorite: !favorite};
};
