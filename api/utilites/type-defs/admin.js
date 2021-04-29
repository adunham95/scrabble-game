import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Admin {
    _id: ID!
    email: String!
    games: [Game]
}

input AdminInput{
    email: String!
    password: String!
    invite: String
}

`;
