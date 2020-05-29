import gql from 'graphql-tag';

export default gql`
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
