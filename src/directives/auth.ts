import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { GraphQLField, defaultFieldResolver } from 'graphql'
import { AuthenticationError } from 'apollo-server-express'

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args

      if (!context.isAuthenticated()) {
        throw new AuthenticationError('You must be signed in')
      }

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
