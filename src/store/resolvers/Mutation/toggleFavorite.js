import fragment from '../../gql/fragment/FAVORITE';
import query from '../../gql/query/FAVORITES_IDS';

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
        ? favorites.filter((show) => show.id !== id)
        : [...favorites, {__typename: 'Show', id}],
    },
  });

  return {__typename: 'Show', id, favorite: !favorite};
};
