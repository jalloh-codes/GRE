// const { GraphQLScalarType } = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')

// const ScalarEmailConfig = {
//     name: 'Email',
//     description: 'A valid Email address',
//     serialize: value => value,
//     parseValue: value => value,
//     parseLiteral: ast => ast.value
// }

// const GraphQlEmail = new GraphQLScalarType(ScalarEmailConfig)

// const ScalarDateConfig = {
//     name: 'Email',
//     description: 'A valid Date',
//     serialize: value => value,
//     parseValue: value => value,
//     parseLiteral: ast => ast.value
// }

// const GraphQlDate= new GraphQLScalarType(ScalarDateConfig)


// module.exports = {GraphQlEmail, GraphQlDate}



const customScalarResolver = {
    Date: GraphQLDateTime
  };


export default [customScalarResolver]