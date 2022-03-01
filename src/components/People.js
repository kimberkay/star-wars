import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (page) => {
  console.log(page)
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
}

const People = () => {
  const [ page, setPage ] = useState(1);
  const { 
    data,  
    status 
  } = useQuery(['People', page], () => fetchPeople(page));

  console.log(data);

  return (
    <div>
      <h2>People</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <button 
            onClick={() => setPage(old => Math.max(old - 1, 1))} 
            disabled={page === 1}>
            Previous Page
          </button>
          <span>{ page }</span>
          <button 
            onClick={() => setPage(old => (!data || !data.next ? old : old + 1))} 
            disabled={ page === 9 }>
            Next page
          </button>
          <div>
            { data.results.map(person => <Person key={person.name} person={person} /> ) }
          </div>
        </>
      )} 
    </div>
  );
}

export default People;