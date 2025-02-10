import express from 'express';
import { ApolloServer } from '@apollo/server'
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4'


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User{
            id:ID!
            name:String!
            username:String!
            email:String!
            phone:String!
            website:String!
        }
            type Todo {
                id:ID!
                title:String!
                completed:Boolean!
                user:User
            }

            type Query {
                getTodos: [Todo]
                getUser: [User]
                getUserId(id:ID!): User
    }
                `,
        resolvers: {

            Todo: {
                user: async (todo) => await fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                    .then(response => response.json())
                    .catch(err => console.log(err))
            },

            Query: {
                getTodos: async () => await fetch(`https://jsonplaceholder.typicode.com/todos`)
                    .then(response => response.json())
                    .catch(err => console.log(err)),


                getUser: async () => await fetch(`https://jsonplaceholder.typicode.com/users`)
                    .then(response => response.json())
                    .catch(err => console.log(err)),

                getUserId: async (_, { id }) => await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                    .then(response => response.json())
                    .catch(err => console.log(err))

            }
        }
    });

    app.use(express.json());
    app.use(cors())

    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen({ port: 8000 }, () => {
        console.log(`Server ready at http://localhost:8000`);
    });
}

startServer()

