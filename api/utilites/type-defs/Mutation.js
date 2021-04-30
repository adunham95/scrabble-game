import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    type Mutation{

        createAdmin(admin: AdminInput): Admin
        loginAdmin(admin: AdminInput): Admin

        createGame(input: GameInput): Game
        updateGame(id: ID, game: GameInput): Game
        loginGame(password: String!, user:StudentInput!): GameLogin

        createTile(input: SingleTileInput): Tile

        createStudent(input: StudentInput): Student
        # updateStudent(id: ID!, input: StudentInput): Student
    }
    `;
