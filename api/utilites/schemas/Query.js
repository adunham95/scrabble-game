import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

type Query{
    #Games
    getGame(id: ID!): Game
    getGamesByAdmin(adminID: String!): [Game]
    getTiles(gameID: ID): [Tile]
    getAdmin(id: ID!): Admin!
}
`;
