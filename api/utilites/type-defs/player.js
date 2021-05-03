import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Player {
    _id: ID!
    icon: String!
    color: String!
    points: Int
    tiles: [Tile]
    name: String!
}

type PlayerColor{
    name: String!
    color: String!
}

input PlayerInput{
    icon: String!
    color: PlayerColorInput!
}

input PlayerColorInput{
    name: String!
    color: String!
}
#     `;
