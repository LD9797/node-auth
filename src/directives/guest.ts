import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express'
import { GraphQLField, defaultFieldResolver } from 'graphql'

class GuestDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args

      if (context.isAuthenticated()) {
        throw new AuthenticationError('You are already signed in')
      }

      return resolve.apply(this, args)
    }
  }
}

export default GuestDirective
