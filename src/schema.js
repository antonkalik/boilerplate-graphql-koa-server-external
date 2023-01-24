module.exports = `
#graphql
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
