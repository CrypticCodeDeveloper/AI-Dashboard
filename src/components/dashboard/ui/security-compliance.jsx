import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Shield} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import {Progress} from "@/components/ui/progress.jsx";

const SecurityCompliance = () => {
    return (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center text-base">
                    <Shield className="mr-2 h-5 w-5 text-green-500"/>
                    Security & Compliance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">API Authentication</div>
                        <Badge
                            className="bg-green-500/20 text-green-400 border-green-500/50">Secure</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Rate Limiting</div>
                        <Badge
                            className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Data Encryption</div>
                        <Badge
                            className="bg-green-500/20 text-green-400 border-green-500/50">AES-256</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Compliance</div>
                        <div className="text-sm text-cyan-400">
                            SOC 2 <span className="text-slate-500">| GDPR</span>
                        </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Security Score</div>
                            <div className="text-sm text-cyan-400">98%</div>
                        </div>
                        <Progress value={98} className="h-2 bg-slate-700">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                                style={{width: "98%"}}
                            />
                        </Progress>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default SecurityCompliance
