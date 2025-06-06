import {Badge} from "@/components/ui/badge.jsx";

// Model row component
function ModelRow({
                      name,
                      provider,
                      requests,
                      tokens,
                      avgTime,
                      status,
                  }) {
    return (
        <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
            <div className="col-span-3 text-slate-300">{name}</div>
            <div className="col-span-2 text-slate-400">{provider}</div>
            <div className="col-span-2 text-cyan-400">{requests.toLocaleString()}</div>
            <div className="col-span-2 text-purple-400">{tokens}</div>
            <div className="col-span-2 text-blue-400">{avgTime}</div>
            <div className="col-span-1">
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                    {status}
                </Badge>
            </div>
        </div>
    );
}

export default ModelRow