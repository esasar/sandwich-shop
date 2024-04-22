import { useState, useEffect } from "react";
import axios from 'axios';
import SandwichCard from "./SandwichCard"
import sandwichService from '../services/sandwich';

const SandwichList = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAllSandwiches = async () => {
      const sandwiches = await sandwichService.getAllSandwiches();
      setSandwiches(sandwiches);
    };
    fetchAllSandwiches();
  }, [])

  return (
    <div className='sandwichlist'>
      {error && <p>Error: {error}</p>}
      {sandwiches.map(sandwich => (
        <SandwichCard key={sandwich.id} sandwich={sandwich} />
      ))}
    </div>
  )
}

export default SandwichList