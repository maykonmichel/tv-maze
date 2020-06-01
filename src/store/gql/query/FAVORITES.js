import gql from 'graphql-tag';

export default gql`
  query {
    favorites @client {
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
      favorite
    }
  }
`;
