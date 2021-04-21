import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type Mutation{
        createGame(input: GameInput): Game
        updateGame(id: ID, input: GameInput): Game
        loginGame(password: String!, user:StudentInput!): Game

        createTile(input: TileInput): Tile

        createStudent(input: StudentInput): Student
        # updateStudent(id: ID!, input: StudentInput): Student
    }
    `;
