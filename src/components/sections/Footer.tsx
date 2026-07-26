import React, { useEffect, useState } from 'react';
import { ChevronUp, Radio, Wifi, Users, Activity, Heart, Globe, Zap, Cpu, CheckCircle2 } from 'lucide-react';
import { useSound } from '../ui/SoundManager';

const SIMULATED_CITIES = [
  'San Francisco, US', 'Tokyo, JP', 'London, UK', 'Berlin, DE', 'Bengaluru, IN',
  'Singapore, SG', 'New York, US', 'Toronto, CA', 'Sydney, AU', 'Amsterdam, NL'
];

export const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(1248);
  const [liveVisitors, setLiveVisitors] = useState(4);
  const [latency, setLatency] = useState(21);
  const [socketConnected, setSocketConnected] = useState(false);
  const [recentEvent, setRecentEvent] = useState<string>('Initializing WSS channel...');
  const [packetsRx, setPacketsRx] = useState(128);
  const [showSocketDetails, setShowSocketDetails] = useState(false);

  const { playClick } = useSound();

  // Fetch initial visitor analytics & simulate connection handshake
  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.visitors) setVisitorCount(data.visitors);
      })
      .catch(() => {});

    const handshake = setTimeout(() => {
      setSocketConnected(true);
      setRecentEvent('wss://telemetry.akshayjain.dev connected');
    }, 1000);

    return () => clearTimeout(handshake);
  }, []);

  // Simulated WebSocket packet stream & visitor activity
  useEffect(() => {
    if (!socketConnected) return;

    const interval = setInterval(() => {
      // Jitter latency slightly
      setLatency(Math.floor(15 + Math.random() * 16));
      
      // Increment packet counter
      setPacketsRx((prev) => prev + Math.floor(1 + Math.random() * 4));

      // Occasional visitor movement event
      const rand = Math.random();
      if (rand > 0.55) {
        const city = SIMULATED_CITIES[Math.floor(Math.random() * SIMULATED_CITIES.length)];
        const isJoin = Math.random() > 0.45;
        
        setLiveVisitors((prev) => {
          const delta = isJoin ? 1 : -1;
          const updated = Math.min(12, Math.max(2, prev + delta));
          return updated;
        });

        setRecentEvent(`[WSS] Visitor in ${city} ${isJoin ? 'connected' : 'pinged'}`);
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [socketConnected]);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#030305] text-gray-400 py-12 px-4 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                AJ
              </div>
            </div>
            <span className="text-sm font-extrabold text-white tracking-wider">AKSHAY JAIN</span>
          </div>

          <p className="text-[11px] text-gray-400 max-w-md text-center md:text-left">
            B.Tech Undergrad at Walchand Institute of Technology • AI Engineer & Full Stack Developer
          </p>

          {/* Futuristic Live Socket Indicator */}
          <div className="relative">
            <button
              onClick={() => {
                playClick();
                setShowSocketDetails(!showSocketDetails);
              }}
              className="flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all cursor-pointer group shadow-lg text-[10px]"
              title="Click for WebSocket telemetry details"
            >
              {/* Pulsing Signal Beacon */}
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${socketConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${socketConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>

              {/* Socket Status Text */}
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                {socketConnected ? 'SOCKET: CONNECTED' : 'SOCKET: CONNECTING...'}
              </span>

              <span className="text-gray-600">|</span>

              {/* Live Active Visitor Counter */}
              <span className="text-cyan-300 font-bold flex items-center gap-1">
                <Users className="w-3 h-3 text-cyan-400" />
                {liveVisitors} Live {liveVisitors === 1 ? 'Visitor' : 'Visitors'}
              </span>

              <span className="text-gray-600 hidden sm:inline">•</span>

              {/* Latency badge */}
              <span className="text-purple-400 font-mono hidden sm:flex items-center gap-1">
                <Wifi className="w-3 h-3 text-purple-400" />
                {latency}ms
              </span>

              <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors ml-1">⚙</span>
            </button>

            {/* Interactive WebSocket Telemetry Popover */}
            {showSocketDetails && (
              <div className="absolute left-0 bottom-full mb-2 w-72 p-3.5 rounded-2xl bg-[#080812]/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md z-50 text-[10px] space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Websocket Telemetry
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    WSS v2.4
                  </span>
                </div>

                <div className="space-y-1.5 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Endpoint:</span>
                    <span className="text-cyan-300 font-mono">wss://feed.akshayjain.dev</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ping Latency:</span>
                    <span className="text-emerald-400 font-bold">{latency} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Packets Rx:</span>
                    <span className="text-purple-300">{packetsRx} frames</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Node:</span>
                    <span className="text-amber-300">AP-SOUTH-1 (Solapur/Mumbai)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Unique Visits:</span>
                    <span className="text-white font-bold">#{visitorCount}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-[9px] text-gray-400 mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Real-Time Socket Stream Log:</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-black/80 font-mono text-[9px] text-cyan-300 truncate border border-white/5">
                    {recentEvent}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-300">
          <a href="#about" onClick={playClick} className="hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#education" onClick={playClick} className="hover:text-cyan-400 transition-colors">
            Education
          </a>
          <a href="#skills" onClick={playClick} className="hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#projects" onClick={playClick} className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#contact" onClick={playClick} className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
          title="Back to Top"
        >
          <span>TOP</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 gap-2">
        <p>© {new Date().getFullYear()} Akshay Jain. Built with React, Three.js & Gemini AI.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Excellence
        </p>
      </div>
    </footer>
  );
};

