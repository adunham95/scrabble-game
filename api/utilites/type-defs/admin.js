import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Admin {
    _id: ID!
    email: String!
    games: [Game]
    firstName: String
    lastName: String
    invite: String
}

input AdminInput{
    email: String!
    password: String!
    invite: String
    firstName: String
    lastName: String
}

`;
