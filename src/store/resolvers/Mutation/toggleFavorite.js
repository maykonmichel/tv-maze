import fragment from '../../gql/fragment/FAVORITE';
import query from '../../gql/query/FAVORITES';

export default async (parent, {id}, {cache, client}) => {
  const {favorite} = cache.readFragment({
    id: `Show:${id}`,
    fragment,
  });

  const {
    data: {favorites},
  } = await client.query({query});

  cache.writeQuery({
    query,
    data: {
      favorites: favorite
        ? favorites.filter((show) => show !== id)
        : [...favorites, id],
    },
  });

  return {__typename: 'Show', id, favorite: !favorite};
};
