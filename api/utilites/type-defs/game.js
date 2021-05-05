import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Game {
    _id: ID!
    name: String
    players: [Player]
    hostID: String
    password: String
    rounds: Int
    tiles: [Tile]
    gameTiles: [GameTile]
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
}

input GameInput {
    players: [String]
    hostID: String!
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

type GameTile{
    _id: String!
    point: Int
    letter: String!
    position: TilePosition
    playerID: String
}

type TilePosition {
    x: String
    y: String
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
