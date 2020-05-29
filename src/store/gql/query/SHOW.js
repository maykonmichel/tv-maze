import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    show(id: $id) @client {
      id
      name
      image @type(name: "Image") {
        medium
      }
      rating @type(name: "Rating") {
        average
      }
    }
    episodes(show: $id)
      @rest(type: "Episode", path: "/shows/{args.show}/episodes") {
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
