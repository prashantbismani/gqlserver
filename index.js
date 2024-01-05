const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the schema
const schema = buildSchema(`
  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`);

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
];

// Resolvers
const root = {
  getUser: ({ id }) => users.find(user => user.id === id),
  getAllUsers: () => users
};

const app = express()

app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(3000, () => {
    console.log('Running a GraphQL API server at http://localhost:3000/graphql');
});