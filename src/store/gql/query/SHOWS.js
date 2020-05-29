import gql from 'graphql-tag';

export default gql`
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
