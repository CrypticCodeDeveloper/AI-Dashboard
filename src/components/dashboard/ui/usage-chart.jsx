function UsageChart() {
    return (
        <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
                <div className="text-xs text-slate-500">2K</div>
                <div className="text-xs text-slate-500">1.5K</div>
                <div className="text-xs text-slate-500">1K</div>
                <div className="text-xs text-slate-500">500</div>
                <div className="text-xs text-slate-500">0</div>
            </div>

            {/* X-axis grid lines */}
            <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
                <div className="border-b border-slate-700/30 w-full"></div>
                <div className="border-b border-slate-700/30 w-full"></div>
                <div className="border-b border-slate-700/30 w-full"></div>
                <div className="border-b border-slate-700/30 w-full"></div>
                <div className="border-b border-slate-700/30 w-full"></div>
            </div>

            {/* Chart bars */}
            <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
                {Array.from({length: 24}).map((_, i) => {
                    const apiHeight = Math.floor(Math.random() * 60) + 20;
                    const tokenHeight = Math.floor(Math.random() * 40) + 40;
                    const responseHeight = Math.floor(Math.random() * 30) + 30;

                    return (
                        <div key={i} className="flex space-x-0.5">
                            <div
                                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                                style={{height: `${apiHeight}%`}}
                            ></div>
                            <div
                                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                                style={{height: `${tokenHeight}%`}}
                            ></div>
                            <div
                                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                                style={{height: `${responseHeight}%`}}
                            ></div>
                        </div>
                    );
                })}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
                <div className="text-xs text-slate-500">00:00</div>
                <div className="text-xs text-slate-500">06:00</div>
                <div className="text-xs text-slate-500">12:00</div>
                <div className="text-xs text-slate-500">18:00</div>
                <div className="text-xs text-slate-500">24:00</div>
            </div>
        </div>
    );
}


export default UsageChart