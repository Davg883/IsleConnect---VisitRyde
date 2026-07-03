"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function Showcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const seek = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = (value / 100) * video.duration;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="history-hub" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">History Hub</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Dover Street, <span className="italic text-gold">1862</span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            A cinematic time-slip through Ryde&apos;s imperial transformation —
            the season the town became the Solent&apos;s front door. Each trail
            stop unlocks a chapter of this film on location.
          </p>
        </div>

        <div className="signal-divider mt-10" aria-hidden>
          <span /> <span /> <span />
        </div>

        {/* --- Player --- */}
        <div className="group relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-gold/20 shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            src="/media/intro.mp4"
            poster="/media/intro-poster.jpg"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onClick={togglePlay}
          />

          {/* Big center play affordance when paused */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play the Dover Street film"
              className="absolute inset-0 flex items-center justify-center bg-ink-950/40 transition-colors hover:bg-ink-950/25"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-ink-950/70 text-gold shadow-glow-sm transition-transform hover:scale-110">
                <Play size={30} className="ml-1" />
              </span>
            </button>
          )}

          {/* Control bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-transparent px-5 pb-4 pt-10">
            <input
              type="range"
              className="player-range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              style={{ "--progress": `${progress}%` } as React.CSSProperties}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Seek through the film"
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="text-cream transition-colors hover:text-gold"
                >
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="text-cream transition-colors hover:text-gold"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <p className="font-mono text-xs tracking-wider text-cream/70">
                {formatTime(currentTime)}{" "}
                <span className="text-mutedwarm">/ {formatTime(duration)}</span>
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs uppercase tracking-[0.25em] text-mutedwarm">
          Excerpt · Full Appley Time-Slip sequence renders per stop via the
          Remotion pipeline
        </p>
      </div>
    </section>
  );
}
