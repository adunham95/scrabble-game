import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Student {
    _id: ID!
    icon: String!
    color: String!
    points: Int
    tiles: [Tile]
    name: String!
}

type StudentColor{
    name: String!
    color: String!
}

input StudentInput{
    icon: String!
    color: StudentColorInput!
}

input StudentColorInput{
    name: String!
    color: String!
}
#     `;
