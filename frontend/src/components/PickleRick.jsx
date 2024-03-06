import React, { Component } from "react";
import { useQuery, gql } from '@apollo/client';

import "./PickleRick.css";

const QUERY_FOR_PICKLE_RICK = gql`
  query PickleRick { 
    characters(filter: {
      name: "Pickle Rick"
    }) {
      results {
        name
        image
      }
    }
  }`;

const PickleRick = () => {
  const { loading, error, data } = useQuery(QUERY_FOR_PICKLE_RICK);

  if (loading) 
    return <p>Loading...</p>;

  if (error || !data || !data.characters || !data.characters.results.length > 0)
    return <p>Error :(</p>;

  const { characters: { results } } = data;
  const { name, image } = results[0];

  return <div className='PickleRick'>
    <div className="container">
      <img className='avatar' src={image} />
      <h2 className='name'>{name}!</h2>
    </div>
  </div>;
}

export default PickleRick;
