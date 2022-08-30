const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Query {
    getItemsExternal: [DataExternalExample]
  }

  type DataExternalExample {
    id: ID
    label: String
  }

  type Mutation {
    updateDataExternal(label: String!): DataExternalExample!
  }
`;
