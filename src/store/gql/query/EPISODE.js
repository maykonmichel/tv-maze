import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    episode(id: $id) @client {
      id
      name
      number
      season
      summary
      image @type(name: "Image") {
        medium
      }
    }
  }
`;
