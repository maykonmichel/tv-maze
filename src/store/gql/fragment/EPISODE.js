import gql from 'graphql-tag';

export default gql`
  fragment episode on Episode {
    id
    name
    number
    season
    summary
    image @type(name: "Image") {
      medium
    }
  }
`;
