import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Student {
    id: ID!
    color: String!
    icon: String!
    points: Int!
    tiles: [Tile]
}

input StudentInput{
    color: String!
    icon: String!
}

type Admin {
    id: ID!
    username: String!
    password: String!
}

input AdminInput {
    username: String!
    password: String!
}
    `;
