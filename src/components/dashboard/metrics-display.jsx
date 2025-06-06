import React, {useState, useEffect} from 'react'
import {Bot, Globe, Zap} from "lucide-react";
import {BarChart3, LineChart} from "lucide-react"

const MetricsDisplay = () => {

    const [apiCalls, setApiCalls] = useState(1247);
    const [modelUsage, setModelUsage] = useState(68);
    const [responseTime, setResponseTime] = useState(142);
    const [tokenConsumption, setTokenConsumption] = useState(85);

    // Simulate changing data
    useEffect(() => {
        const interval = setInterval(() => {
            setApiCalls((prev) => prev + Math.floor(Math.random() * 10) + 1);
            setModelUsage(Math.floor(Math.random() * 20) + 60);
            setTokenConsumption(Math.floor(Math.random() * 15) + 75);
            setResponseTime(Math.floor(Math.random() * 50) + 120);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
                title="API Calls"
                value={apiCalls}
                icon={Globe}
                trend="up"
                color="cyan"
                detail="Today | +12% vs yesterday"
                isNumber
            />
            <MetricCard
                title="Model Usage"
                value={modelUsage}
                icon={Bot}
                trend="stable"
                color="purple"
                detail="GPT-4 | Claude | Gemini"
            />
            <MetricCard
                title="Avg Response"
                value={responseTime}
                icon={Zap}
                trend="down"
                color="blue"
                detail="142ms | 99.9% uptime"
                isNumber
                suffix="ms"
            />
        </div>
    )
}
export default MetricsDisplay

// Component for metric cards
function MetricCard({
                        title,
                        value,
                        icon: Icon,
                        trend,
                        color,
                        detail,
                        isNumber = false,
                        suffix = "%",
                    }) {
    const getColor = () => {
        switch (color) {
            case "cyan":
                return "from-cyan-500 to-blue-500 border-cyan-500/30";
            case "green":
                return "from-green-500 to-emerald-500 border-green-500/30";
            case "blue":
                return "from-blue-500 to-indigo-500 border-blue-500/30";
            case "purple":
                return "from-purple-500 to-pink-500 border-purple-500/30";
            default:
                return "from-cyan-500 to-blue-500 border-cyan-500/30";
        }
    };

    const getTrendIcon = () => {
        switch (trend) {
            case "up":
                return <BarChart3 className="h-4 w-4 text-green-500"/>;
            case "down":
                return <BarChart3 className="h-4 w-4 rotate-180 text-green-500"/>;
            case "stable":
                return <LineChart className="h-4 w-4 text-blue-500"/>;
            default:
                return null;
        }
    };

    return (
        <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">{title}</div>
                <Icon className={`h-5 w-5 text-${color}-500`}/>
            </div>
            <div
                className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
                {isNumber ? value.toLocaleString() : value}
                {!isNumber ? suffix : ""}
            </div>
            <div className="text-xs text-slate-500">{detail}</div>
            <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
            <div
                className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
        </div>
    );
}