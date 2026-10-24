"use client";

import React, { useState, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle2, Gauge, RefreshCw, Zap } from "lucide-react";

export const DigitalTwinVisual: React.FC = () => {
  const [tankLevel, setTankLevel] = useState(72);
  const [temperature, setTemperature] = useState(64.5);
  const [pumpPressure, setPumpPressure] = useState(4.2);
  const [valveOpen, setValveOpen] = useState(true);
  const [heaterActive, setHeaterActive] = useState(false);
  const [isSimulatingFault, setIsSimulatingFault] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSimulatingFault) {
        setTankLevel((prev) => Math.min(Math.max(prev + (Math.random() * 2 - 1), 60), 85));
        setTemperature((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
        setPumpPressure((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      } else {
        // Simulated fault behavior
        setTankLevel((prev) => Math.min(prev + 0.6, 96));
        setTemperature((prev) => +(prev + 0.8).toFixed(1));
        setPumpPressure((prev) => +(prev + 0.3).toFixed(1));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulatingFault]);

  const faultConfidence = isSimulatingFault ? 93.6 : 1.4;
  const systemStatus = isSimulatingFault ? "Anomaly Warning" : "Optimal (Nominal)";

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-950/80 p-5 font-mono text-xs text-slate-300">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider">TWINSYNC // INDUSTRIAL TWIN SIMULATOR</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSimulatingFault(!isSimulatingFault)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              isSimulatingFault
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-800 text-slate-300 border border-white/10 hover:border-cyan-400"
            }`}
          >
            <RefreshCw size={12} className={isSimulatingFault ? "animate-spin" : ""} />
            {isSimulatingFault ? "Reset to Normal" : "Simulate Anomaly"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Visual Tank Simulation */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-[11px] font-medium text-slate-400 mb-2 uppercase tracking-wider">
            Liquid Storage Chamber #04
          </div>
          {/* Tank Graphic */}
          <div className="relative w-28 h-44 rounded-2xl border-2 border-slate-600/80 bg-slate-950 overflow-hidden flex flex-col justify-end shadow-inner">
            {/* Level markers */}
            <div className="absolute top-4 right-1 text-[9px] text-slate-500">100%</div>
            <div className="absolute top-1/2 right-1 text-[9px] text-slate-500">50%</div>
            <div className="absolute bottom-4 right-1 text-[9px] text-slate-500">0%</div>

            {/* Liquid Fill */}
            <div
              style={{ height: `${tankLevel}%` }}
              className={`w-full transition-all duration-700 ease-out relative ${
                isSimulatingFault
                  ? "bg-gradient-to-t from-rose-600 to-amber-500"
                  : "bg-gradient-to-t from-cyan-600 to-indigo-500"
              }`}
            >
              {/* Wave surface */}
              <div className="absolute -top-1 left-0 right-0 h-2 bg-white/20 blur-[1px] animate-pulse" />
            </div>

            {/* Float readout overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-bold text-white text-sm drop-shadow-md">
                {tankLevel.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              <Zap size={12} className={heaterActive ? "text-amber-400" : "text-slate-500"} />
              Heater: {heaterActive ? "ON" : "OFF"}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Activity size={12} className={valveOpen ? "text-emerald-400" : "text-slate-500"} />
              Valve: {valveOpen ? "OPEN" : "CLOSED"}
            </span>
          </div>
        </div>

        {/* Live Telemetry & Predictive AI Gauge */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Gauge size={12} className="text-cyan-400" />
                Temperature
              </div>
              <div className={`text-lg font-bold mt-1 ${temperature > 75 ? "text-rose-400" : "text-white"}`}>
                {temperature}°C
              </div>
              <div className="text-[10px] text-slate-500">Nominal: 55°C – 70°C</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Activity size={12} className="text-indigo-400" />
                Pump Pressure
              </div>
              <div className={`text-lg font-bold mt-1 ${pumpPressure > 5.2 ? "text-amber-400" : "text-white"}`}>
                {pumpPressure} bar
              </div>
              <div className="text-[10px] text-slate-500">Nominal: 3.8 – 4.6 bar</div>
            </div>
          </div>

          {/* Fault Confidence Engine */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-300 ${
              isSimulatingFault
                ? "border-rose-500/40 bg-rose-950/20"
                : "border-emerald-500/30 bg-emerald-950/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">
                Predictive AI Confidence Score
              </span>
              <span
                className={`flex items-center gap-1 text-[11px] font-bold ${
                  isSimulatingFault ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {isSimulatingFault ? (
                  <AlertTriangle size={13} />
                ) : (
                  <CheckCircle2 size={13} />
                )}
                {systemStatus}
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                style={{ width: `${faultConfidence}%` }}
                className={`h-full transition-all duration-500 ${
                  isSimulatingFault ? "bg-rose-500" : "bg-emerald-500"
                }`}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
              <span>Risk Metric: {faultConfidence}%</span>
              <span>Replay: 120Hz sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
