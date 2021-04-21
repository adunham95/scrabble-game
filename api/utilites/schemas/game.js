import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Game {
    _id: ID!
    name: String
    tiles: [Tile]
    users: [Student]
    admin: Admin!
    password: String!
    active: Boolean
}

input GameInput {
    users: [String]
    adminID: String!
    name: String
}

type Tile {
    id: ID!
    pointValue: Int
    letter: String!
    game: Game
}

input TileInput {
    pointValue: Int
    letter: String!
    gameID: ID
}
`;
