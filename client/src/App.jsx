/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const query = gql`
query GetTodosWithUser {   
  getTodos {
    id
    title
    completed
    user {
      name
      id
    }
  }
}
`;

function App() {
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <h1 className="text-center text-2xl font-bold text-blue-600 mt-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 py-4 px-8 rounded-lg shadow-lg">
        Welcome to GraphQL
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 mt-4">Here is your requested data:</h2>

      <div className="mt-6 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.getTodos.map(todo => (
          <div key={todo.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
            <p className="mt-2">
              <span className="font-medium text-gray-700">Completed: </span>
              <span className={todo.completed ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                {todo.completed ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="mt-1 text-gray-700">
              <span className="font-medium">User:</span> {todo.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
