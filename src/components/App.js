import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query';
import Navbar from './Navbar';
import Planets from './Planets';
import People from './People';

const queryClient = new QueryClient()

function App() {
  let [page, setPage] = useState('planets');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <h1>Star Wars Info</h1>
      <Navbar setPage={setPage}/>
      <div className="content">
        { page === 'planets' ? <Planets /> : <People /> }
      </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
