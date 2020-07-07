import { gql } from 'apollo-server-express'

export default gql`
  type AuthPayload {
    user: User
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`
