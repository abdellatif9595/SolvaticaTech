import { useState, useCallback, useRef } from 'react';

interface WebRTCState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnected: boolean;
  error: Error | null;
}

export function useWebRTC() {
  const [state, setState] = useState<WebRTCState>({
    localStream: null,
    remoteStream: null,
    isConnected: false,
    error: null,
  });

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const createPeerConnection = useCallback(async () => {
    try {
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      };

      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the candidate to the remote peer
          console.log('New ICE candidate:', event.candidate);
        }
      };

      peerConnection.ontrack = (event) => {
        setState((prev) => ({
          ...prev,
          remoteStream: event.streams[0],
        }));
      };

      peerConnection.onconnectionstatechange = () => {
        setState((prev) => ({
          ...prev,
          isConnected: peerConnection.connectionState === 'connected',
        }));
      };

      return peerConnection;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
      }));
      throw error;
    }
  }, []);

  const startCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setState((prev) => ({ ...prev, localStream: stream }));

      const peerConnection = await createPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer
      console.log('Local offer:', offer);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
      }));
    }
  }, [createPeerConnection]);

  const answerCall = useCallback(async (offer: RTCSessionDescriptionInit) => {
    try {
      const peerConnection = await createPeerConnection();
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      // Send the answer to the remote peer
      console.log('Local answer:', answer);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
      }));
    }
  }, [createPeerConnection]);

  const endCall = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (state.localStream) {
      state.localStream.getTracks().forEach((track) => track.stop());
    }

    setState({
      localStream: null,
      remoteStream: null,
      isConnected: false,
      error: null,
    });
  }, [state.localStream]);

  const createDataChannel = useCallback((label: string) => {
    if (peerConnectionRef.current) {
      const dataChannel = peerConnectionRef.current.createDataChannel(label);
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => {
        console.log('Data channel opened');
      };

      dataChannel.onclose = () => {
        console.log('Data channel closed');
      };

      dataChannel.onmessage = (event) => {
        console.log('Received message:', event.data);
      };

      return dataChannel;
    }
    return null;
  }, []);

  const sendData = useCallback((data: string) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      dataChannelRef.current.send(data);
    }
  }, []);

  return {
    ...state,
    startCall,
    answerCall,
    endCall,
    createDataChannel,
    sendData,
  };
} 