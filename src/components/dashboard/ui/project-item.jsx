import {Badge} from "@/components/ui/badge.jsx";

function ProjectItem({
                         name,
                         apiKey,
                         requests,
                         status,
                         lastUsed,
                     }) {
    const getStatusColor = () => {
        switch (status) {
            case "active":
                return "bg-green-500/10 text-green-400 border-green-500/30";
            case "development":
                return "bg-amber-500/10 text-amber-400 border-amber-500/30";
            case "paused":
                return "bg-slate-500/10 text-slate-400 border-slate-500/30";
            default:
                return "bg-green-500/10 text-green-400 border-green-500/30";
        }
    };

    return (
        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-slate-300">{name}</div>
                <Badge variant="outline" className={`${getStatusColor()} text-xs`}>
                    {status}
                </Badge>
            </div>
            <div className="mb-2">
                <div className="text-xs text-slate-500 mb-1">API Key</div>
                <div
                    className="text-xs font-mono text-slate-400 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/30">
                    {apiKey}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs">
                <div className="text-slate-500">
                    <span className="text-cyan-400">{requests.toLocaleString()}</span> requests
                </div>
                <div className="text-slate-500">Last used: {lastUsed}</div>
            </div>
        </div>
    );
}

export default ProjectItem