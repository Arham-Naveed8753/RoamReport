import { useEffect, useRef, useState } from "react";

const JOURNEY_DURATION = 4500;
const EXIT_DURATION = 600;

export default function RoomReportLoader({ ready, onComplete }) {
  const [finishing, setFinishing] = useState(false);

  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!ready) return;

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, JOURNEY_DURATION - elapsed);

    const finishTimer = setTimeout(() => {
      setFinishing(true);
    }, remaining);

    const removeTimer = setTimeout(() => {
      onComplete?.();
    }, remaining + EXIT_DURATION);

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(removeTimer);
    };
  }, [ready, onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-hidden
        bg-[#c9dcff]
        transition-all duration-600 ease-out
        ${
          finishing
            ? "pointer-events-none scale-[1.02] opacity-0"
            : "scale-100 opacity-100"
        }
      `}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-[8%] top-[12%]
            h-48 w-48 rounded-full
            bg-white/40 blur-3xl
          "
        />

        <div
          className="
            absolute bottom-[5%] right-[5%]
            h-64 w-64 rounded-full
            bg-[#0057d9]/10 blur-3xl
          "
        />

        <div className="loader-grain absolute inset-0" />
      </div>

      {/* Main */}
      <main className="relative flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8">

        {/* Brand */}
        <div className="loader-brand">
          <p
            className="
              mb-3
              text-[9px] font-medium uppercase
              tracking-[0.35em]
              text-[#0057d9]/70
              sm:text-[10px] md:text-xs
            "
          >
            A little journey
          </p>

          <h1
            className="
              text-5xl font-black uppercase
              leading-[0.82]
              tracking-[-0.07em]
              text-[#0057d9]
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            The Room
            <br />
            Report
          </h1>
        </div>

        {/* JOURNEY */}
        <div
          className="
            relative
            mt-8
            h-[190px]
            w-full
            max-w-[600px]
            sm:mt-10
            sm:h-[230px]
            md:mt-12
            md:h-[250px]
          "
        >
          <svg
            viewBox="0 0 600 240"
            className="h-full w-full overflow-visible"
            fill="none"
          >
            <defs>

              {/* THE SINGLE SOURCE OF TRUTH */}
              <path
                id="room-report-journey"
                d="
                  M 35 195
                  C 80 180,
                    70 125,
                    135 130

                  C 195 135,
                    170 75,
                    235 78

                  C 300 80,
                    290 165,
                    365 145

                  C 430 128,
                    405 65,
                    520 40
                "
              />

            </defs>

            {/* Very subtle base path */}
            <use
              href="#room-report-journey"
              stroke="#0057D9"
              strokeOpacity=".12"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Animated path */}
            <use
              href="#room-report-journey"
              className="journey-path"
              stroke="#0057D9"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Starting point */}
            <circle
              cx="35"
              cy="195"
              r="6"
              fill="#f8f5ed"
              stroke="#0057D9"
              strokeWidth="2.5"
            />

            {/* Wrong turn */}
            <path
              d="
                M235 78
                C260 50,
                290 58,
                320 28
              "
              className="wrong-turn-path"
              stroke="#0057D9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 7"
            />

            {/* Destination */}
            <g className="destination-marker">
              <circle
                cx="520"
                cy="40"
                r="19"
                fill="#f8f5ed"
                stroke="#0057D9"
                strokeWidth="2"
              />

              <path
                d="
                  M520 31
                  L523 37
                  L529 40
                  L523 43
                  L520 49
                  L517 43
                  L511 40
                  L517 37
                  Z
                "
                fill="#0057D9"
              />
            </g>

            {/* =================================================
                TRAVELER
                ================================================= */}

            <g className="traveler-motion">

              {/* Motion path */}
              <animateMotion
                dur="3.8s"
                begin="0.7s"
                fill="freeze"
                rotate="0"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.25 0.1 0.25 1"
              >
                <mpath href="#room-report-journey" />
              </animateMotion>

              {/* Walking animation is isolated from movement */}
              <g className="traveler-walk">

                {/* Backpack */}
                <rect
                  x="-13"
                  y="-13"
                  width="10"
                  height="17"
                  rx="3"
                  fill="#f8f5ed"
                  stroke="#0057D9"
                  strokeWidth="2.3"
                />

                <path
                  d="M-12 -8 Q-17 -5 -12 0"
                  stroke="#0057D9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Head */}
                <circle
                  cx="0"
                  cy="-17"
                  r="5.5"
                  fill="#0057D9"
                />

                {/* Body */}
                <path
                  d="M0 -10 L0 5"
                  stroke="#0057D9"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Left arm */}
                <g className="traveler-arm-left">
                  <path
                    d="M0 -7 L-7 -1"
                    stroke="#0057D9"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* Right arm */}
                <g className="traveler-arm-right">
                  <path
                    d="M0 -7 L7 -1"
                    stroke="#0057D9"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* Left leg */}
                <g className="traveler-leg-left">
                  <path
                    d="M0 5 L-6 15"
                    stroke="#0057D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

                {/* Right leg */}
                <g className="traveler-leg-right">
                  <path
                    d="M0 5 L6 15"
                    stroke="#0057D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

              </g>
            </g>
          </svg>
        </div>

        {/* Message */}
        <div className="loader-message mt-2">
          <p
            className="
              text-sm font-medium
              text-[#0057d9]
              sm:text-base
              md:text-lg
            "
          >
            Finding a story
            <span className="loading-dots">...</span>
          </p>

          <div
            className="
              mx-auto mt-3
              h-px w-16
              bg-[#0057d9]/30
              sm:w-20
            "
          />
        </div>
      </main>

      {/* Footer */}
      <div
        className="
          absolute bottom-4 left-0
          flex w-full items-center justify-center
          gap-2 overflow-hidden
          whitespace-nowrap px-3
          text-[8px] uppercase
          tracking-[0.14em]
          text-[#0057d9]/55
          sm:gap-3
          sm:text-[9px]
          sm:tracking-[0.18em]
        "
      >
        <span>Long walks</span>
        <span>·</span>
        <span>Wrong turns</span>
        <span>·</span>
        <span>Everyday discoveries</span>
      </div>
    </div>
  );
}