import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
  
    const handleStartCall = () => {
        navigate('/call');
    };
  
    return (
      <div className="home-container">
        <h1>Simple Call</h1>
        <button className="start-call-button" onClick={handleStartCall}>
          Start Call
        </button>
      </div>
    );
  };

export default Home;