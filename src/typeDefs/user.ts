import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User]
  }

  extend type Mutation {
    signUp(
      name: String!
      first_last_name: String!
      second_last_name: String
      email: String!
      password: String!
    ): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    first_last_name: String!
    second_last_name: String
    created_at: String!
    updated_at: String!
  }
`
