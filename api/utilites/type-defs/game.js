import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Game {
    _id: ID!
    name: String
    users: [Student]
    adminID: String
    password: String
    settings: GameSettings
}

type GameSettings{
    rounds: Int
    tiles: [Tile]
}

type GameLogin {
    _id: ID!
    name: String
    tiles: [Tile]
    password: String!
    userID: ID!
}

input GameInput {
    users: [String]
    adminID: String!
    name: String
    rounds: Int
    color: String
    tiles: [GroupTileInput]
}

type Tile {
    pointValue: Int
    letter: String!
    weight: Int
}

input SingleTileInput {
    pointValue: Int
    letter: String!
    gameID: ID
    weight: Int
}

input GroupTileInput {
    pointValue: Int
    letter: String!
    weight: Int
}
`;
