const { GraphQLScalarType, GraphQLError } = require('graphql')
const AllowRoles = require('../Config/AllowRoles');
var roles = Object.keys(AllowRoles)
// check if roles is valid
const validRole = (value) =>{
    const capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1);
    if(typeof capitalizeValue !== 'string'){
        throw new GraphQLError("Value must be a string")
    }
    if(!roles.includes(capitalizeValue)){
        throw new GraphQLError(`${value} Role not valid`)
    }
    return value
}


const GraphQRole = new GraphQLScalarType({
    name: 'role',
    description: "Valid Role types" + roles,
    serialize: validRole,
    parseValue: (value) => value,
    parseLiteral: ast => ast.value
})
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


module.exports = GraphQRole



// const customScalarResolver = {
//     Date: GraphQLDateTime
//   };


// export default [customScalarResolver, GraphQRole]