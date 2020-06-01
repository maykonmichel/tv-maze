import gql from 'graphql-tag';

const SEARCH = gql`
  query($q: String) {
    search(q: $q) @rest(type: "Show", path: "/search/shows?{args}") {
      show {
        id
        name
        image @type(name: "Image") {
          medium
        }
        rating @type(name: "Rating") {
          average
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
    }
  }
`;

export default async (parent, args, {client}) => {
  const {
    data: {search, shows},
  } = await client.query({query: args.q ? SEARCH : SHOWS, variables: args});
  return shows || search.map(({show}) => show);
};
