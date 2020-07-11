import { gql } from 'apollo-server-express'

export default gql`
  type AuthPayload {
    user: User @auth
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload @guest
    logout(email: String!): AuthPayload @auth
  }
`
