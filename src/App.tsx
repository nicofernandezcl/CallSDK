import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Call from './Components/Call';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import { MicrosoftTeamsUserIdentifier } from '@azure/communication-common';
import { fromFlatCommunicationIdentifier, StartCallIdentifier } from '@azure/communication-react';
import { fetchTokenResponse } from './Utils/AppUtils';

const App: React.FC = () => {
  
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<CommunicationUserIdentifier | MicrosoftTeamsUserIdentifier>();
  const [userCredentialFetchError, setUserCredentialFetchError] = useState<boolean>(false);

  const myUserId: CommunicationUserIdentifier = { communicationUserId: "nico" };

  useEffect(() => {
    (async () => {
      try {
        const { token, user } = await fetchTokenResponse();
        setToken(token);
        setUserId(user);
      } catch (e) {
        console.error(e);
        setUserCredentialFetchError(true);
      }
    })();
  }, []);

  //setUserId(fromFlatCommunicationIdentifier("") as MicrosoftTeamsUserIdentifier);

  return (
    <Router>
      <Routes>
        <Route path="/call" element={<Call token={''} userId={myUserId} displayName={'hola'} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
