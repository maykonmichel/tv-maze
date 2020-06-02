import gql from 'graphql-tag';

export default gql`
  query {
    favorites @client {
      id
    }
  }
`;
