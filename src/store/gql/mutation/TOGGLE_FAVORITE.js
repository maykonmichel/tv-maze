import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    toggleFavorite(id: $id) @client {
      id
      favorite
    }
  }
`;
