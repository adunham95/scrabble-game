import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Game {
    _id: ID!
    name: String
    tiles: [Tile]
    users: [Student]
    admin: Admin!
}

input GameInput {
    password: String!
    users: [String]
    adminID: String!
    name: String!
}

input GameLogin {
    name: String!
    password: String!,
    userID: String
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
