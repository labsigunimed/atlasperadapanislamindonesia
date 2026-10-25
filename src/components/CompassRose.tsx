import React from 'react';

interface CompassRoseProps {
  onResetNorth?: () => void;
  className?: string;
}

/**
 * Ornamen Kompas Kartografi Nusantara (Wind Rose / Orientasi Mata Angin)
 * Menampilkan 8 arah mata angin berbahasa Indonesia:
 * U (Utara), TL (Timur Laut), T (Timur), TG (Tenggara),
 * S (Selatan), BD (Barat Daya), B (Barat), BL (Barat Laut)
 */
export const CompassRose: React.FC<CompassRoseProps> = ({
  onResetNorth,
  className = '',
}) => {
  return (
    <div
      className={`select-none group ${className}`}
      title="Orientasi Mata Angin (Utara di Atas) — Klik untuk mereset pandangan peta Nusantara"
    >
      <button
        type="button"
        onClick={onResetNorth}
        aria-label="Kompas Orientasi Mata Angin — Klik untuk kembali ke pandangan Nusantara"
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F4F0E6]/95 backdrop-blur-md border-2 border-[#B58B4D] shadow-xl flex items-center justify-center p-1 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Outer degree ring */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full overflow-visible"
          role="img"
          aria-hidden="true"
        >
          {/* Subtle parchment inner circle & degree ticks */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="#F4F0E6"
            stroke="#B58B4D"
            strokeWidth="1.5"
          />
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="#172B36"
            strokeWidth="0.75"
            strokeDasharray="2 2"
            opacity="0.55"
          />
          <circle
            cx="60"
            cy="60"
            r="32"
            fill="none"
            stroke="#B58B4D"
            strokeWidth="0.75"
            opacity="0.6"
          />

          {/* Ordinal Points (TL, TG, BD, BL) */}
          <g transform="rotate(45 60 60)">
            {/* North-East / South-West */}
            <polygon points="60,22 64,56 60,60" fill="#B58B4D" />
            <polygon points="60,22 56,56 60,60" fill="#8e6d38" />
            <polygon points="60,98 64,64 60,60" fill="#8e6d38" />
            <polygon points="60,98 56,64 60,60" fill="#B58B4D" />
            {/* North-West / South-East */}
            <polygon points="98,60 64,64 60,60" fill="#B58B4D" />
            <polygon points="98,60 64,56 60,60" fill="#8e6d38" />
            <polygon points="22,60 56,64 60,60" fill="#8e6d38" />
            <polygon points="22,60 56,56 60,60" fill="#B58B4D" />
          </g>

          {/* Cardinal Points (U, T, S, B) */}
          {/* UTARA (North) - Highlighted with Gold & Deep Crimson/Emerald tip */}
          <polygon points="60,14 66,54 60,60" fill="#172B36" />
          <polygon points="60,14 54,54 60,60" fill="#426B60" />
          {/* North pointer fleur / arrowhead */}
          <polygon points="60,11 63.5,19 60,17 56.5,19" fill="#B58B4D" />

          {/* SELATAN (South) */}
          <polygon points="60,104 65,66 60,60" fill="#426B60" />
          <polygon points="60,104 55,66 60,60" fill="#172B36" />

          {/* TIMUR (East) */}
          <polygon points="104,60 66,65 60,60" fill="#172B36" />
          <polygon points="104,60 66,55 60,60" fill="#426B60" />

          {/* BARAT (West) */}
          <polygon points="16,60 54,65 60,60" fill="#426B60" />
          <polygon points="16,60 54,55 60,60" fill="#172B36" />

          {/* Center Nusantara Medallion */}
          <circle
            cx="60"
            cy="60"
            r="6"
            fill="#B58B4D"
            stroke="#172B36"
            strokeWidth="1.5"
          />
          <circle cx="60" cy="60" r="2.2" fill="#F4F0E6" />

          {/* Cardinal Direction Labels (U, T, S, B) */}
          <text
            x="60"
            y="10.5"
            textAnchor="middle"
            fill="#172B36"
            fontSize="9.5"
            fontWeight="800"
            fontFamily="Georgia, serif"
          >
            U
          </text>
          <text
            x="110.5"
            y="63"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            T
          </text>
          <text
            x="60"
            y="113.5"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            S
          </text>
          <text
            x="9.5"
            y="63"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="Georgia, serif"
          >
            B
          </text>

          {/* Ordinal Direction Labels (TL, TG, BD, BL) */}
          <text
            x="92"
            y="29"
            textAnchor="middle"
            fill="#8e6d38"
            fontSize="6"
            fontWeight="700"
          >
            TL
          </text>
          <text
            x="92"
            y="95"
            textAnchor="middle"
            fill="#8e6d38"
            fontSize="6"
            fontWeight="700"
          >
            TG
          </text>
          <text
            x="28"
            y="95"
            textAnchor="middle"
            fill="#8e6d38"
            fontSize="6"
            fontWeight="700"
          >
            BD
          </text>
          <text
            x="28"
            y="29"
            textAnchor="middle"
            fill="#8e6d38"
            fontSize="6"
            fontWeight="700"
          >
            BL
          </text>
        </svg>
      </button>
      <div className="mt-1 text-center">
        <span className="inline-block px-2 py-0.5 rounded bg-[#172B36]/90 text-[#F4F0E6] border border-[#B58B4D]/50 text-[9px] font-semibold tracking-wider uppercase shadow">
          Mata Angin
        </span>
      </div>
    </div>
  );
};
