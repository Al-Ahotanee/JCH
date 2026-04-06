"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface VideoCallProps {
  roomId: string;
  onEnd: () => void;
}

export function VideoCall({ roomId, onEnd }: VideoCallProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const initializeMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsConnected(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }, []);

  useEffect(() => {
    initializeMedia();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [initializeMedia]);

  const toggleMute = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getVideoTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    onEnd();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative bg-slate-900">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-48 h-36 bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-600">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-4 left-4 bg-slate-800/80 px-4 py-2 rounded-lg">
          <span className="text-white text-sm">Room: {roomId}</span>
          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${isConnected ? "bg-green-500" : "bg-yellow-500"}`}>
            {isConnected ? "Connected" : "Connecting..."}
          </span>
        </div>
      </div>

      <div className="bg-slate-800 py-4 px-6 flex justify-center items-center gap-4">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full ${isMuted ? "bg-red-500" : "bg-slate-700"} hover:bg-slate-600 transition-colors`}
        >
          <i className={`fas fa-microphone${isMuted ? "-slash" : ""} text-white text-xl`}></i>
        </button>
        
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full ${isVideoOff ? "bg-red-500" : "bg-slate-700"} hover:bg-slate-600 transition-colors`}
        >
          <i className={`fas fa-video${isVideoOff ? "-slash" : ""} text-white text-xl`}></i>
        </button>

        <button
          onClick={endCall}
          className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
        >
          <i className="fas fa-phone-slash text-white text-xl"></i>
        </button>
      </div>
    </div>
  );
}

interface VideoCallButtonProps {
  sessionId: number;
  mentorName: string;
}

export function VideoCallButton({ sessionId, mentorName }: VideoCallButtonProps) {
  const [showCall, setShowCall] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const startCall = async () => {
    try {
      const res = await fetch("/api/video-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorshipSessionId: sessionId }),
      });
      const data = await res.json();
      if (data.success) {
        setRoomId(data.session.roomId);
        setShowCall(true);
      }
    } catch (err) {
      console.error("Failed to start call:", err);
    }
  };

  if (showCall && roomId) {
    return <VideoCall roomId={roomId} onEnd={() => setShowCall(false)} />;
  }

  return (
    <button
      onClick={startCall}
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
    >
      <i className="fas fa-video mr-2"></i>
      Start Video Call
    </button>
  );
}