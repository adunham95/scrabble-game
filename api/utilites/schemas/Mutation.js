import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type Mutation{
        createGame(input: GameInput): Game
        updateGame(id: ID, input: GameInput): Game
        loginGame(game: GameLogin, input:StudentInput): Game

        createTile(input: TileInput): Tile

        createStudent(input: StudentInput): Student
        # updateStudent(id: ID!, input: StudentInput): Student
    }
    `;
