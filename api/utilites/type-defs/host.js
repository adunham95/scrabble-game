import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Host {
    _id: ID!
    email: String!
    games: [Game]
    firstName: String
    lastName: String
    invite: String
}

input HostInput{
    email: String!
    password: String!
    invite: String
    firstName: String
    lastName: String
}

`;
