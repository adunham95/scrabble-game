import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

type Query{
    #Games
    getGame(id: ID!): Game
    getGamesByHost(hostID: String!): [Game]
    getTiles(gameID: ID): [Tile]
    getHost(id: ID!): Host!
}
`;
