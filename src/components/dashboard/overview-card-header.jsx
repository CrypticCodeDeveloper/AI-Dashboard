import {CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Brain, RefreshCw} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import {Button} from "@/components/ui/button.jsx";

const OverviewCardHeader = () => {
    return (
        <CardHeader className="border-b border-slate-700/50 pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-cyan-500"/>
                    AI Service Overview
                </CardTitle>
                <div className="flex items-center space-x-2">
                    <Badge variant="outline"
                           className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        LIVE
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <RefreshCw className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </CardHeader>
    )
}
export default OverviewCardHeader
