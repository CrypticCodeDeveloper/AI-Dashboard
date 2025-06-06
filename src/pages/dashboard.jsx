import {useEffect, useState} from "react";
import {Activity, AlertCircle, Bot, Download, Eye, Key, Plus, Shield, Terminal,} from "lucide-react";

import {Button} from "../components/ui/button.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../components/ui/card.jsx";
import {Progress} from "../components/ui/progress.jsx";
import {Badge} from "../components/ui/badge.jsx";
import {Switch} from "../components/ui/switch.jsx";
import OverviewCardHeader from "@/components/dashboard/overview-card-header.jsx";
import MetricsDisplay from "@/components/dashboard/metrics-display.jsx";
import OverviewTabs from "@/components/dashboard/overview-tabs.jsx";
import SecurityCompliance from "@/components/dashboard/ui/security-compliance.jsx";
import SecurityAlerts from "@/components/dashboard/ui/security-alerts.jsx";

export default function Dashboard() {


    const [activeProjects, setActiveProjects] = useState(12);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);


    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Update time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);




    // Format time
    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    // Format date
    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const [theme, setTheme] = useState("dark");
    return (
        <>
            {/* Main dashboard */}
            <div className="col-span-12 md:col-span-9 lg:col-span-7">
                <div className="grid gap-6">
                    {/* AI Service overview */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">

                        <OverviewCardHeader />

                        <CardContent className="p-6">

                            <MetricsDisplay />


                            <div className="mt-8">
                                <OverviewTabs />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security & Alerts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SecurityCompliance />

                        <SecurityAlerts />
                    </div>

                    {/* API Activity Log */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-slate-100 flex items-center text-base">
                                <Activity className="mr-2 h-5 w-5 text-blue-500"/>
                                Recent API Activity
                            </CardTitle>
                            <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                                Live Feed
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <ActivityItem
                                    project="E-commerce Chatbot"
                                    time="15:42:12"
                                    action="POST /v1/chat/completions"
                                    model="GPT-4 Turbo"
                                    tokens={245}
                                    status="success"
                                />
                                <ActivityItem
                                    project="Content Generator"
                                    time="15:41:58"
                                    action="POST /v1/completions"
                                    model="Claude 3.5"
                                    tokens={1024}
                                    status="success"
                                />
                                <ActivityItem
                                    project="Code Assistant"
                                    time="15:41:45"
                                    action="POST /v1/chat/completions"
                                    model="GPT-4 Turbo"
                                    tokens={512}
                                    status="success"
                                />
                                <ActivityItem
                                    project="Data Analyzer"
                                    time="15:41:32"
                                    action="POST /v1/embeddings"
                                    model="text-embedding-3"
                                    tokens={128}
                                    status="success"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-slate-700/50 pt-4">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-sm text-slate-400">
                                    Showing last 4 requests • <span className="text-cyan-400">View all activity</span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
                                >
                                    <Eye className="h-4 w-4 mr-2"/>
                                    View Logs
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-12 lg:col-span-3">
                <div className="grid gap-6">

                    {/* Quick actions */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <ActionButton icon={Plus} label="New Project"/>
                                <ActionButton icon={Key} label="Generate Key"/>
                                <ActionButton icon={Bot} label="Test Model"/>
                                <ActionButton icon={Terminal} label="API Docs"/>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resource allocation */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 text-base">AI Resource Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-sm text-slate-400">GPU Compute</div>
                                        <div className="text-xs text-cyan-400">68% utilized</div>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                            style={{width: "68%"}}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-sm text-slate-400">Token Processing</div>
                                        <div className="text-xs text-purple-400">85% capacity</div>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            style={{width: "85%"}}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-sm text-slate-400">Model Loading</div>
                                        <div className="text-xs text-blue-400">42% memory</div>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                            style={{width: "42%"}}
                                        ></div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-700/50">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-slate-400">Auto Scaling</div>
                                        <div className="flex items-center">
                                            <Switch defaultChecked className="mr-2"/>
                                            <span className="text-cyan-400">Enabled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project stats */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 text-base">Project Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-400">Active Projects</div>
                                    <div className="text-lg font-mono text-cyan-400">{activeProjects}</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-400">Total API Keys</div>
                                    <div className="text-lg font-mono text-purple-400">24</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-400">Monthly Requests</div>
                                    <div className="text-lg font-mono text-blue-400">2.4M</div>
                                </div>

                                <div className="pt-2 border-t border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-slate-400">Plan Usage</div>
                                        <div className="text-sm text-cyan-400">Pro Plan</div>
                                    </div>
                                    <div className="mt-2">
                                        <Progress value={72} className="h-1.5 bg-slate-700">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                style={{width: "72%"}}
                                            />
                                        </Progress>
                                        <div className="text-xs text-slate-500 mt-1">72% of monthly quota used</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}



// Activity item component
function ActivityItem({
                          project,
                          time,
                          action,
                          model,
                          tokens,
                          status,
                      }) {
    return (
        <div className="flex items-center space-x-3 p-2 rounded-md bg-slate-800/30 border border-slate-700/30">
            <div className="flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-200 truncate">{project}</div>
                    <div className="text-xs text-slate-500">{time}</div>
                </div>
                <div className="text-xs text-slate-400">{action}</div>
                <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                        {model}
                    </Badge>
                    <span className="text-xs text-slate-500">{tokens} tokens</span>
                </div>
            </div>
        </div>
    );
}

// Action button component
function ActionButton({icon: Icon, label}) {
    return (
        <Button
            variant="outline"
            className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
        >
            <Icon className="h-5 w-5 text-cyan-500"/>
            <span className="text-xs">{label}</span>
        </Button>
    );
}

// Add missing imports
function Info(props) {
    return <AlertCircle {...props} />;
}

function Check(props) {
    return <Shield {...props} />;
}

