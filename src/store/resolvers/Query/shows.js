import gql from 'graphql-tag';

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

  const addFavoriteField = (show) => ({
    ...show,
    favorite: false,
  });

  return shows.map(addFavoriteField) || search.map(({show}) => show);
};
