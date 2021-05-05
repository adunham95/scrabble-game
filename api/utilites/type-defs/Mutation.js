import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type Mutation{

        createHost(host: HostInput): Host
        loginHost(host: HostInput): Host

        createGame(input: GameInput): Game
        updateGame(id: ID, game: GameInput): Game
        loginGame(password: String!, player:PlayerInput!): GameLogin
        startGame(id: ID!): Game
        resetGame(id: ID!): Game

        createTile(input: SingleTileInput): Tile

        createPlayer(input: PlayerInput): Player
        # updatePlayer(id: ID!, input: PlayerInput): Player
    }
    `;
