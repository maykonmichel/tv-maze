import gql from 'graphql-tag';

export default gql`
  query($page: Int, $q: String) {
    shows(page: $page, q: $q) @client {
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
