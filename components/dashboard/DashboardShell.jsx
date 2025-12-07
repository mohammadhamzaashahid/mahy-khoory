"use client";

import { useState } from "react";
import TileGrid from "./TileGrid";
import ReportViewer from "./ReportViewer";
import { FiBarChart2 } from "react-icons/fi";
import { TILE_CONFIG } from "./tiles.config";

export default function DashboardShell() {
    const [activeTileId, setActiveTileId] = useState(null);

    const selectedTile =
        TILE_CONFIG.find((t) => t.id === activeTileId) ?? null;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">

            {/* HEADER */}
            <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold">
                        MAHY Khoory Analytics
                    </h1>
                    <p className="text-xs md:text-sm text-slate-300">
                        One-click access to strategic Power BI insights
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
                    <FiBarChart2 className="h-4 w-4" />
                    <span>Live · Connected to Power BI Service</span>
                </div>
            </header>

            {/* MAIN BODY */}
            <main className="flex-1 flex flex-col">

                {/* If no tile selected → show tiles */}
                {!selectedTile && (
                    <section className="flex-1 bg-slate-50/80 border-t border-slate-200">
                        <TileGrid
                            tiles={TILE_CONFIG}
                            activeTileId={activeTileId}
                            onSelectTile={setActiveTileId}
                        />
                    </section>
                )}

                {/* If tile selected → show full-screen report viewer */}
                {selectedTile && (
                    <section className="flex-1 bg-white animate-fade-in">
                        <ReportViewer
                            tile={selectedTile}
                            onBack={() => setActiveTileId(null)}
                        />
                    </section>
                )}

            </main>
        </div>
    );
}
