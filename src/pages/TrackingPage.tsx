import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import {
  ShieldCheck,
  Navigation,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
  Lock,
  RotateCcw,
  Play,
  Pause,
  FastForward,
  Package,
  KeyRound,
  Sparkles,
  ChevronRight,
  Car
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../data/products';

// City definitions with coordinate paths
interface CityRoute {
  id: string;
  name: string;
  destinationLabel: string;
  center: [number, number];
  zoom: number;
  vaultCoord: [number, number];
  destCoord: [number, number];
  waypoints: [number, number][];
  distanceKm: number;
  initialMinutes: number;
}

const CITIES: CityRoute[] = [
  {
    id: 'jaipur',
    name: 'Jaipur • Civil Lines',
    destinationLabel: 'The Rathore Villa, Jacob Road, Civil Lines',
    center: [26.8836, 75.8058],
    zoom: 13,
    vaultCoord: [26.9124, 75.7873],
    destCoord: [26.8549, 75.8243],
    distanceKm: 3.8,
    initialMinutes: 11,
    waypoints: [
      [26.9124, 75.7873],
      [26.9095, 75.7890],
      [26.9065, 75.7915],
      [26.9030, 75.7945],
      [26.8995, 75.7980],
      [26.8955, 75.8020],
      [26.8915, 75.8060],
      [26.8875, 75.8095],
      [26.8835, 75.8130],
      [26.8795, 75.8155],
      [26.8755, 75.8175],
      [26.8715, 75.8195],
      [26.8675, 75.8212],
      [26.8635, 75.8225],
      [26.8595, 75.8235],
      [26.8549, 75.8243]
    ]
  },
  {
    id: 'delhi',
    name: "New Delhi • Lutyens' Zone",
    destinationLabel: "The Manor, Golf Links, Lutyens' Delhi",
    center: [28.6149, 77.2254],
    zoom: 13,
    vaultCoord: [28.6315, 77.2167],
    destCoord: [28.5983, 77.2341],
    distanceKm: 4.6,
    initialMinutes: 14,
    waypoints: [
      [28.6315, 77.2167],
      [28.6280, 77.2185],
      [28.6245, 77.2205],
      [28.6210, 77.2225],
      [28.6175, 77.2245],
      [28.6140, 77.2265],
      [28.6105, 77.2285],
      [28.6070, 77.2305],
      [28.6035, 77.2325],
      [28.6000, 77.2335],
      [28.5983, 77.2341]
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai • Malabar Hill',
    destinationLabel: 'Ridge Road Manor, Malabar Hill',
    center: [19.0102, 72.8336],
    zoom: 12,
    vaultCoord: [19.0657, 72.8687],
    destCoord: [18.9548, 72.7985],
    distanceKm: 6.2,
    initialMinutes: 18,
    waypoints: [
      [19.0657, 72.8687],
      [19.0520, 72.8580],
      [19.0380, 72.8450],
      [19.0220, 72.8350],
      [19.0050, 72.8250],
      [18.9880, 72.8180],
      [18.9720, 72.8100],
      [18.9590, 72.8030],
      [18.9548, 72.7985]
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru • Lavelle Road',
    destinationLabel: 'Skyline Residence, Lavelle Road',
    center: [12.9751, 77.6184],
    zoom: 13,
    vaultCoord: [12.9719, 77.5960],
    destCoord: [12.9784, 77.6408],
    distanceKm: 4.1,
    initialMinutes: 12,
    waypoints: [
      [12.9719, 77.5960],
      [12.9728, 77.6030],
      [12.9738, 77.6110],
      [12.9748, 77.6190],
      [12.9758, 77.6270],
      [12.9768, 77.6340],
      [12.9784, 77.6408]
    ]
  }
];

export const TrackingPage: React.FC = () => {
  const { getActiveTrackingOrder } = useCart();
  const order = getActiveTrackingOrder();

  const [selectedCityId, setSelectedCityId] = useState<string>('jaipur');
  const currentCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  // Simulation state
  const [progress, setProgress] = useState<number>(0.2); // Starts 20% on the route
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1x or 5x
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Map DOM and instance references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const traveledPolylineRef = useRef<L.Polyline | null>(null);
  const vaultMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);

  // Real-time calculated metrics
  const remainingKm = Math.max(0, parseFloat(((1 - progress) * currentCity.distanceKm).toFixed(1)));
  const etaMinutes = Math.max(0, Math.ceil((1 - progress) * currentCity.initialMinutes));
  const isArrived = progress >= 0.99;

  // Compute interpolated coordinate along waypoints based on progress (0 to 1)
  const getCurrentCoord = (prog: number, waypoints: [number, number][]): [number, number] => {
    if (waypoints.length === 0) return [0, 0];
    if (prog <= 0) return waypoints[0];
    if (prog >= 1) return waypoints[waypoints.length - 1];

    const totalSegments = waypoints.length - 1;
    const scaledProg = prog * totalSegments;
    const index = Math.floor(scaledProg);
    const fraction = scaledProg - index;

    if (index >= totalSegments) return waypoints[waypoints.length - 1];

    const p1 = waypoints[index];
    const p2 = waypoints[index + 1];

    const lat = p1[0] + (p2[0] - p1[0]) * fraction;
    const lng = p1[1] + (p2[1] - p1[1]) * fraction;

    return [lat, lng];
  };

  // Get traversed coordinate slice for the traveled polyline
  const getTraveledCoordinates = (prog: number, waypoints: [number, number][]): [number, number][] => {
    if (waypoints.length === 0) return [];
    if (prog <= 0) return [waypoints[0]];
    const totalSegments = waypoints.length - 1;
    const scaledProg = prog * totalSegments;
    const index = Math.floor(scaledProg);

    const slice = waypoints.slice(0, index + 1);
    const curr = getCurrentCoord(prog, waypoints);
    slice.push(curr);
    return slice;
  };

  // 1. Initialize Leaflet Map (Vanilla Leaflet via React useRef - NO react-leaflet)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create new Leaflet Map instance
      const map = L.map(mapContainerRef.current, {
        center: currentCity.center,
        zoom: currentCity.zoom,
        zoomControl: false,
        attributionControl: false
      });

      // Add CartoDB Voyager tiles (clean, beautiful street geography)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Invalidate map size after container rendering
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // 2. Render / Update Markers and Polylines when city or route changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Reset view to current city
    map.setView(currentCity.center, currentCity.zoom);

    // Remove existing layers if any
    if (vaultMarkerRef.current) map.removeLayer(vaultMarkerRef.current);
    if (destMarkerRef.current) map.removeLayer(destMarkerRef.current);
    if (courierMarkerRef.current) map.removeLayer(courierMarkerRef.current);
    if (routePolylineRef.current) map.removeLayer(routePolylineRef.current);
    if (traveledPolylineRef.current) map.removeLayer(traveledPolylineRef.current);

    // Custom SVG DivIcons (Prevents any Leaflet missing PNG image bugs)
    const vaultIcon = L.divIcon({
      className: 'custom-vault-icon',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="w-10 h-10 rounded-full bg-[#0B0C10] border-2 border-[#B89653] flex items-center justify-center text-[#B89653] shadow-2xl">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <div class="absolute -bottom-6 whitespace-nowrap bg-[#0B0C10] text-[#B89653] border border-[#B89653]/40 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">
            Aurelia Atelier Vault
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const destIcon = L.divIcon({
      className: 'custom-dest-icon',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="absolute w-12 h-12 rounded-full bg-emerald-500/20 animate-ping"></div>
          <div class="w-10 h-10 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-600 shadow-2xl z-10">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <div class="absolute -bottom-6 whitespace-nowrap bg-white text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider z-20">
            Collector Residence
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const courierIcon = L.divIcon({
      className: 'custom-courier-icon',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <!-- Pulsing Radar Halo -->
          <div class="absolute w-16 h-16 rounded-full bg-[#B89653]/30 animate-radar pointer-events-none"></div>
          <div class="absolute w-10 h-10 rounded-full bg-[#B89653]/20 animate-ping pointer-events-none"></div>
          
          <!-- Obsidian & Gold Maybach Vehicle Badge -->
          <div class="w-12 h-12 rounded-2xl bg-[#0B0C10] border-2 border-[#B89653] flex items-center justify-center text-white shadow-2xl z-10 transform transition-transform group-hover:scale-110">
            <svg class="w-6 h-6 text-[#D9C39B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          
          <!-- Live Telemetry Pill -->
          <div class="absolute -top-7 whitespace-nowrap bg-[#0B0C10] text-[#D9C39B] border border-[#B89653] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1.5 z-20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Maybach GLS • RJ-14-AU-0001</span>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    // 1. Vault marker
    vaultMarkerRef.current = L.marker(currentCity.vaultCoord, { icon: vaultIcon }).addTo(map);

    // 2. Destination marker
    destMarkerRef.current = L.marker(currentCity.destCoord, { icon: destIcon }).addTo(map);

    // 3. Planned Route polyline (subtle dashed champagne gold)
    routePolylineRef.current = L.polyline(currentCity.waypoints, {
      color: '#D9C39B',
      weight: 4,
      opacity: 0.6,
      dashArray: '6, 8',
      lineCap: 'round'
    }).addTo(map);

    // 4. Traveled Route polyline (solid obsidian & gold)
    traveledPolylineRef.current = L.polyline(
      getTraveledCoordinates(progress, currentCity.waypoints),
      {
        color: '#B89653',
        weight: 5,
        opacity: 0.95,
        lineCap: 'round'
      }
    ).addTo(map);

    // 5. Courier moving marker
    const initialCoord = getCurrentCoord(progress, currentCity.waypoints);
    courierMarkerRef.current = L.marker(initialCoord, { icon: courierIcon }).addTo(map);

    // Fit map bounds slightly to encompass both points
    const bounds = L.latLngBounds([currentCity.vaultCoord, currentCity.destCoord]);
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [selectedCityId]);

  // 3. Live Simulation Loop (Animation tick)
  useEffect(() => {
    if (!isPlaying || isArrived) return;

    const intervalTime = 120; // 120ms tick
    // Base step: 1x moves ~0.003 per tick, 5x moves ~0.015 per tick
    const step = 0.003 * speedMultiplier;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          clearInterval(timer);
          return 1;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speedMultiplier, isArrived]);

  // 4. Update Marker Position & Traveled Path when progress updates
  useEffect(() => {
    const currentCoord = getCurrentCoord(progress, currentCity.waypoints);

    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng(currentCoord);
    }

    if (traveledPolylineRef.current) {
      traveledPolylineRef.current.setLatLngs(
        getTraveledCoordinates(progress, currentCity.waypoints)
      );
    }
  }, [progress, currentCity]);

  // Handler to recenter on Maybach
  const handleRecenter = () => {
    const currentCoord = getCurrentCoord(progress, currentCity.waypoints);
    mapInstanceRef.current?.setView(currentCoord, 14, { animate: true });
    showToast('Map centered on Maybach GLS • RJ-14-AU-0001');
  };

  // Handler to restart run
  const handleRestart = () => {
    setProgress(0.05);
    setIsPlaying(true);
    showToast('Handover simulation restarted from Atelier Vault');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-8 pb-20 selection:bg-aurelia-gold selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0B0C10] text-aurelia-gold px-6 py-2.5 rounded-full border border-aurelia-gold/40 text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-aurelia-gold" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Exclusivity Banner */}
        <div className="bg-[#0B0C10] text-[#D9C39B] rounded-2xl p-3.5 mb-6 border border-aurelia-gold/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
            <Lock className="w-4 h-4 text-aurelia-gold" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              EXCLUSIVE TO AURELIAPRIVE.COM • NEVER SOLD ON ANY OTHER APP OR MARKETPLACE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TRANSPONDER ID: AU-GPS-8842-MAYBACH</span>
          </div>
        </div>

        {/* Header & City Selector Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-aurelia-goldLight text-aurelia-goldDark text-[10px] font-bold border border-aurelia-goldBorder uppercase tracking-widest">
                Direct Atelier Dispatch
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Order #{order.orderId}
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-aurelia-obsidian mt-1">
              Live White-Glove Handover Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Real-time encrypted GPS feed connecting the Atelier Vault to your private estate.
            </p>
          </div>

          {/* City / Sector Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-aurelia-border shadow-soft">
            <MapPin className="w-4 h-4 text-aurelia-gold ml-2" />
            <span className="text-xs font-bold text-stone-500 hidden sm:inline">Active Sector:</span>
            <select
              value={selectedCityId}
              onChange={(e) => {
                setSelectedCityId(e.target.value);
                setProgress(0.2);
                setIsPlaying(true);
              }}
              className="bg-transparent text-xs font-bold text-aurelia-obsidian outline-none cursor-pointer pr-4 py-1"
            >
              {CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Status Hero Card */}
        <div
          className={`rounded-2xl p-6 mb-6 border transition-all duration-500 shadow-luxury ${
            isArrived
              ? 'bg-emerald-950/90 text-white border-emerald-500/50'
              : 'bg-[#0B0C10] text-white border-aurelia-gold/30'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isArrived ? 'bg-emerald-400 animate-ping' : 'bg-aurelia-gold animate-pulse'
                  }`}
                />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-aurelia-gold">
                  {isArrived
                    ? 'SECURITY PROTOCOL: ARRIVED AT PRIVATE RESIDENCE'
                    : 'LIVE SATELLITE TELEMETRY • FINAL SECTOR TRANSIT'}
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-4xl tracking-tight text-white">
                {isArrived ? (
                  <span className="text-emerald-300">
                    Mercedes-Maybach Courier Has Arrived At Your Residence
                  </span>
                ) : (
                  <>
                    Arriving in <span className="text-aurelia-gold">{etaMinutes} minutes</span>
                    <span className="text-stone-400 font-sans text-base font-normal ml-3">
                      ({remainingKm} km away)
                    </span>
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {isArrived
                  ? `Senior Concierge Devraj Singhania is awaiting at your reception gate with your tamper-proof biometric casing. Inspect the wax seal and share your 4-digit code.`
                  : `Your serialized creation is under armed escort in temperature-controlled Maybach GLS #01. Next status update in 45 seconds.`}
              </p>
            </div>

            {/* Handover OTP Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-aurelia-gold mb-0.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>BIOMETRIC HANDOVER OTP</span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Inspect wax seal before reciting code
                </p>
              </div>

              <div className="bg-[#0B0C10] border border-aurelia-gold/60 px-5 py-2.5 rounded-xl">
                <span className="font-mono text-2xl sm:text-3xl font-black text-aurelia-gold tracking-[0.25em]">
                  {order.otpCode || '7391'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Map + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Leaflet Interactive Map Container */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury overflow-hidden relative">
              {/* Simulation Map Controls Toolbar */}
              <div className="bg-[#0B0C10] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white z-20 relative border-b border-aurelia-gold/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-bold text-[#D9C39B]">CartoDB Voyager GPS</span>
                  <span className="text-stone-400 hidden sm:inline">|</span>
                  <span className="text-stone-400 text-[11px] hidden sm:inline font-mono">
                    {currentCity.name}
                  </span>
                </div>

                {/* Simulation Control Buttons */}
                <div className="flex items-center gap-2">
                  {/* Play / Pause */}
                  <button
                    onClick={() => {
                      if (isArrived) handleRestart();
                      else setIsPlaying(!isPlaying);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-bold text-[11px]"
                    title={isPlaying ? 'Pause GPS Simulation' : 'Resume GPS Simulation'}
                  >
                    {isPlaying && !isArrived ? (
                      <>
                        <Pause className="w-3 h-3 text-amber-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-emerald-400" />
                        <span>{isArrived ? 'Replay' : 'Play'}</span>
                      </>
                    )}
                  </button>

                  {/* 1x / 5x Speed Toggle */}
                  <button
                    onClick={() => {
                      const next = speedMultiplier === 1 ? 5 : 1;
                      setSpeedMultiplier(next);
                      showToast(`Simulation speed set to ${next}x`);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded transition-colors font-bold text-[11px] ${
                      speedMultiplier === 5
                        ? 'bg-aurelia-gold text-[#0B0C10]'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                    title="Toggle Simulation Speed (1x Live vs 5x Demo)"
                  >
                    <FastForward className="w-3 h-3" />
                    <span>{speedMultiplier}x Demo</span>
                  </button>

                  {/* Recenter Map */}
                  <button
                    onClick={handleRecenter}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                    title="Center on Maybach"
                  >
                    <Navigation className="w-3.5 h-3.5 text-aurelia-gold" />
                  </button>

                  {/* Restart */}
                  <button
                    onClick={handleRestart}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                    title="Restart Simulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* The Map Div Container with strict 520px height */}
              <div
                ref={mapContainerRef}
                className="w-full h-[480px] sm:h-[540px] relative z-10 bg-stone-100"
              />

              {/* Bottom Map Info Strip */}
              <div className="bg-white px-4 py-3 border-t border-aurelia-border flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0B0C10] border border-aurelia-gold flex-shrink-0" />
                    <span className="text-[11px]">Aurelia Vault</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white flex-shrink-0" />
                    <span className="text-[11px]">Your Residence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-aurelia-gold rounded flex-shrink-0" />
                    <span className="text-[11px]">Transponder Track</span>
                  </div>
                </div>

                <div className="font-mono text-[11px] text-stone-400">
                  GPS: 26.8836° N, 75.8058° E • SatLock-04
                </div>
              </div>
            </div>

            {/* Officer & Transport Card */}
            <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-aurelia-borderSubtle">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"
                      alt="Concierge Officer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-aurelia-gold"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-aurelia-obsidian">
                        Devraj Singhania
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        Senior Officer
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Chief Private Handover Specialist • 5.0 ★ (420+ Deliveries)
                    </p>
                    <p className="text-[11px] font-mono text-aurelia-gold mt-0.5">
                      Clearance: Biometric Level-IV
                    </p>
                  </div>
                </div>

                {/* Direct Concierge Communications */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      showToast('Connecting encrypted voice call to Officer Singhania…');
                      window.open('tel:+919829073910');
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-aurelia-obsidian text-white text-xs font-bold hover:bg-black transition-colors shadow-soft"
                  >
                    <Phone className="w-3.5 h-3.5 text-aurelia-gold" />
                    <span>Call Concierge</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('Dispatch priority radio message sent to Maybach Unit #01.');
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-aurelia-obsidian text-xs font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-stone-600" />
                    <span>Dispatch Radio</span>
                  </button>
                </div>
              </div>

              {/* Armored Vehicle Specifications */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">
                    Transport Vehicle
                  </span>
                  <span className="font-bold text-aurelia-obsidian">Mercedes-Maybach GLS 600</span>
                  <span className="text-[11px] text-stone-400 block">Grade-B6 Armored Hull</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">
                    Registration & Tag
                  </span>
                  <span className="font-mono font-bold text-aurelia-obsidian">RJ-14-AU-0001</span>
                  <span className="text-[11px] text-emerald-600 block font-medium">GPS Transponder Active</span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">
                    Security Protocols
                  </span>
                  <span className="font-bold text-aurelia-obsidian">Dual Biometric Lock</span>
                  <span className="text-[11px] text-stone-400 block">Temperature Controlled (21°C)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Handover Steps Timeline & Order Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 4-Step Handover Timeline */}
            <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-aurelia-borderSubtle">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-aurelia-gold" />
                  <h3 className="font-serif font-bold text-base text-aurelia-obsidian">
                    White-Glove Handover Sequence
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  Protocol #AU-409
                </span>
              </div>

              <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-stone-200">
                
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 z-10 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-aurelia-obsidian">
                        Vault Allocation & Serial Verification
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">13:45 IST</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Piece retrieved from climate vault. Physical serial number cross-referenced with Master Ledger.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 z-10 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-aurelia-obsidian">
                        Tamper-Proof Wax Seal Applied
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">14:02 IST</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Atelier casing sealed with 18K gold wax seal under dual-custody verification.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-md transition-colors ${
                      isArrived
                        ? 'bg-emerald-500 text-white'
                        : 'bg-aurelia-obsidian text-aurelia-gold border-2 border-aurelia-gold'
                    }`}
                  >
                    {isArrived ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Car className="w-4 h-4 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-aurelia-obsidian">
                        Armored Transit In Final Sector
                      </h4>
                      <span className="text-[10px] text-aurelia-gold font-bold font-mono">
                        {isArrived ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Mercedes-Maybach GLS en route via GPS-monitored corridor. Biometric transponder active.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-md transition-colors ${
                      isArrived
                        ? 'bg-aurelia-gold text-aurelia-obsidian border-2 border-[#0B0C10] animate-bounce'
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}
                  >
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-bold text-xs ${
                          isArrived ? 'text-aurelia-goldDark' : 'text-stone-400'
                        }`}
                      >
                        Recipient Identity Verification & Handover
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {isArrived ? 'READY' : 'PENDING'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Recipient inspects wax seal, presents identification, and recites OTP <strong className="font-mono text-aurelia-gold">#{order.otpCode || '7391'}</strong> to complete handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Address Card */}
            <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-6">
              <div className="flex items-center gap-2 pb-3 border-b border-aurelia-borderSubtle mb-4">
                <MapPin className="w-4 h-4 text-aurelia-gold" />
                <h3 className="font-serif font-bold text-base text-aurelia-obsidian">
                  Handover Residence Details
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Recipient:</span>
                  <span className="font-bold text-aurelia-obsidian">
                    {order.address?.fullName || 'Devraj S. Rathore'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Contact:</span>
                  <span className="font-mono text-stone-600">
                    {order.address?.mobile || '+91 98290 73910'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Destination:</span>
                  <span className="font-medium text-stone-700 text-right max-w-[220px]">
                    {order.address?.fullAddress || currentCity.destinationLabel}
                  </span>
                </div>
                {order.address?.orderNote && (
                  <div className="mt-3 pt-3 border-t border-aurelia-borderSubtle bg-stone-50 p-2.5 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                      Security Gate Instruction:
                    </span>
                    <p className="text-[11px] text-stone-600 italic">
                      "{order.address.orderNote}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Ordered Allocation Summary */}
            <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-6">
              <div className="flex items-center justify-between pb-3 border-b border-aurelia-borderSubtle mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-aurelia-gold" />
                  <h3 className="font-serif font-bold text-base text-aurelia-obsidian">
                    Allocated Creation
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-600">
                  Paid: ₹{(order.total || 130500).toLocaleString('en-IN')}
                </span>
              </div>

              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-14 h-14 rounded-xl object-cover border border-aurelia-border bg-stone-50"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-aurelia-gold font-bold uppercase tracking-wider block">
                          {item.product.category} • {item.product.edition}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-aurelia-obsidian truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-400">
                          Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                        </p>
                      </div>
                      <span className="font-serif font-bold text-xs text-aurelia-obsidian">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400">
                  Maison Aurelia Tourbillon Squelette (x1) • ₹1,45,000
                </p>
              )}

              {/* Atelier Exclusivity Notice */}
              <div className="mt-5 pt-4 border-t border-aurelia-borderSubtle flex items-center justify-between text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-aurelia-gold" />
                  <span>Complimentary White-Glove Handover Included</span>
                </div>
                <Link
                  to="/shop"
                  className="font-bold text-aurelia-obsidian hover:text-aurelia-gold transition-colors flex items-center gap-0.5"
                >
                  <span>Explore Vault</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TrackingPage;
