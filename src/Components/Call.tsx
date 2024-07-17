import React, { useMemo, useState } from 'react';
import { CallAgent } from '@azure/communication-calling';
import { useNavigate } from 'react-router-dom';
import { CallAdapterLocator, CallComposite, CallCompositeOptions, CommonCallAdapter } from '@azure/communication-react';
import { CommunicationUserIdentifier, MicrosoftTeamsUserIdentifier } from '@azure/communication-common';
import type { StartCallIdentifier } from '@azure/communication-react';
import { Spinner } from '@fluentui/react';

export interface CallScreenProps {
  token: string;
  userId: CommunicationUserIdentifier | MicrosoftTeamsUserIdentifier;
  callLocator?: CallAdapterLocator;
  targetCallees?: StartCallIdentifier[];
  displayName: string;
  isTeamsIdentityCall?: boolean;
  adapter?: CommonCallAdapter;
}

export const Call = (props: CallScreenProps): JSX.Element => {
  const [name, setName] = useState('');
  const [camera, setCamera] = useState('Camera 1');
  const [callAgent, setCallAgent] = useState<CallAgent>();
  const [call, setCall] = useState<any>(); // Adjust as per SDK typings
  const cameras = ['Camera 1', 'Camera 2', 'Camera 3'];
  const navigate = useNavigate();

  const { adapter } = props;

  const options: CallCompositeOptions = useMemo(
    () => ({
      callControls: {
        screenShareButton: false,
        endCallButton: {
          hangUpForEveryone: 'endCallOptions'
        }
      },
      autoShowDtmfDialer: true
    }),
    []
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCamera(event.target.value);
  };

  let callInvitationUrl: string | undefined = window.location.href;

  if (call && !adapter) {
    return <Spinner label={'Creating adapter'} ariaLive="assertive" labelPosition="top" />;
  }

  return (
    <div className="call-container">
      <h1>Call View</h1>
      
      <div className="form-group">
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} className="input-field" />
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Select Camera:
          <select value={camera} onChange={handleCameraChange} className="dropdown">
            {cameras.map((cam, index) => (
              <option key={index} value={cam}>
                {cam}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <button onClick={() => setCall(true)} className="start-button">Start Call</button>

      {call && (
        <div className="call-composite-wrapper">
          <CallComposite
            adapter={adapter!}
            fluentTheme={undefined}
            rtl={true}
            callInvitationUrl={callInvitationUrl}
            formFactor={'desktop'}
            options={options}
          />
        </div>
      )}

      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
    </div>
  );
};

export default Call;
