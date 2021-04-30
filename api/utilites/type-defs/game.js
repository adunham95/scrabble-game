import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Game {
    _id: ID!
    name: String
    users: [Student]
    adminID: String
    password: String
    rounds: Int
    tiles: [Tile]
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
    _id: String!
    point: Int
    letter: String!
    weight: Int
}

input SingleTileInput {
    _id: String
    point: Int
    letter: String!
    gameID: ID
    weight: Int
}

input GroupTileInput {
    _id: String
    point: Int
    letter: String!
    weight: Int
}
`;
