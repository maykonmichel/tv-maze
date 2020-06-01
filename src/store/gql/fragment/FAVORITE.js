import gql from 'graphql-tag';

export default gql`
  fragment favorite on Show {
    id
    favorite
  }
`;
