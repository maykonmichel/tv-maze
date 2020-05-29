import gql from 'graphql-tag';

export default gql`
  fragment show on Show {
    id
    name
    image @type(name: "Image") {
      medium
    }
    rating @type(name: "Rating") {
      average
    }
  }
`;
