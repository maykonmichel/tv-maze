import gql from 'graphql-tag';

import FAVORITES from '../../gql/query/FAVORITES';

const SEARCH = gql`
  query($q: String) {
    search(q: $q) @rest(type: "Search", path: "/search/shows?{args}") {
      show @type(name: "Show") {
        id
        name
        image @type(name: "Image") {
          medium
        }
        rating @type(name: "Rating") {
          average
        }
        summary
        genres
        schedule {
          time
          days
        }
      }
    }
  }
`;

const SHOWS = gql`
  query($page: Int!) {
    shows(page: $page) @rest(type: "Show", path: "/shows?{args}") {
      id
      name
      image @type(name: "Image") {
        medium
      }
      rating @type(name: "Rating") {
        average
      }
      summary
      genres
      schedule {
        time
        days
      }
    }
  }
`;

export default async (parent, args, {client}) => {
  const {
    data: {search, shows},
  } = await client.query({query: args.q ? SEARCH : SHOWS, variables: args});

  const {
    data: {favorites},
  } = await client.query({query: FAVORITES});

  const addFavoriteField = ({id, ...show}) => ({
    id,
    ...show,
    favorite: favorites.some((favorite) => favorite.id === id),
  });

  return shows
    ? shows.map(addFavoriteField)
    : search.map(({show}) => addFavoriteField(show));
};
