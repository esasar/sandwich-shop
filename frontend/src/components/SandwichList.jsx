import { useState, useEffect } from "react";
import axios from 'axios';
import SandwichCard from "./SandwichCard"

const SandwichList = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSandwiches = async() => {
      try {
        const response = await axios.get('http://localhost:8080/v1/sandwich');
        setSandwiches(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
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