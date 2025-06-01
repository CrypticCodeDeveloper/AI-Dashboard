import {useEffect, useState} from "react";
import {
    Activity,
    AlertCircle,
    BarChart3,
    Bot,
    Brain,
    Download,
    Eye,
    Globe,
    Key,
    LineChart,
    Plus,
    RefreshCw,
    Shield,
    Terminal,
    Zap,
} from "lucide-react";

import {Button} from "../components/ui/button.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../components/ui/card.jsx";
import {Progress} from "../components/ui/progress.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs.jsx";
import {Badge} from "../components/ui/badge.jsx";
import {Switch} from "../components/ui/switch.jsx";

export default function Dashboard() {

    const [apiCalls, setApiCalls] = useState(1247);
    const [modelUsage, setModelUsage] = useState(68);
    const [tokenConsumption, setTokenConsumption] = useState(85);
    const [responseTime, setResponseTime] = useState(142);
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
                        <CardContent className="p-6">
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

                            <div className="mt-8">
                                <Tabs defaultValue="usage" className="w-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <TabsList className="bg-slate-800/50 p-1">
                                            <TabsTrigger
                                                value="usage"
                                                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                            >
                                                Usage Analytics
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="models"
                                                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                            >
                                                AI Models
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="projects"
                                                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                            >
                                                Projects
                                            </TabsTrigger>
                                        </TabsList>

                                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                                                API Calls
                                            </div>
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                                                Tokens
                                            </div>
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                                                Response Time
                                            </div>
                                        </div>
                                    </div>

                                    <TabsContent value="usage" className="mt-0">
                                        <div
                                            className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                                            <UsageChart/>
                                            <div
                                                className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                                                <div className="text-xs text-slate-400">Total Requests</div>
                                                <div
                                                    className="text-lg font-mono text-cyan-400">{apiCalls.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="models" className="mt-0">
                                        <div
                                            className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                                            <div
                                                className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                                                <div className="col-span-3">Model</div>
                                                <div className="col-span-2">Provider</div>
                                                <div className="col-span-2">Requests</div>
                                                <div className="col-span-2">Tokens</div>
                                                <div className="col-span-2">Avg Time</div>
                                                <div className="col-span-1">Status</div>
                                            </div>

                                            <div className="divide-y divide-slate-700/30">
                                                <ModelRow
                                                    name="GPT-4 Turbo"
                                                    provider="OpenAI"
                                                    requests={456}
                                                    tokens="2.4M"
                                                    avgTime="145ms"
                                                    status="active"
                                                />
                                                <ModelRow
                                                    name="Claude 3.5 Sonnet"
                                                    provider="Anthropic"
                                                    requests={324}
                                                    tokens="1.8M"
                                                    avgTime="132ms"
                                                    status="active"
                                                />
                                                <ModelRow
                                                    name="Gemini Pro"
                                                    provider="Google"
                                                    requests={267}
                                                    tokens="1.2M"
                                                    avgTime="156ms"
                                                    status="active"
                                                />
                                                <ModelRow
                                                    name="GPT-3.5 Turbo"
                                                    provider="OpenAI"
                                                    requests={189}
                                                    tokens="890K"
                                                    avgTime="98ms"
                                                    status="active"
                                                />
                                                <ModelRow
                                                    name="Claude 3 Haiku"
                                                    provider="Anthropic"
                                                    requests={156}
                                                    tokens="654K"
                                                    avgTime="87ms"
                                                    status="active"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="projects" className="mt-0">
                                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <ProjectItem
                                                    name="E-commerce Chatbot"
                                                    apiKey="dk_live_..."
                                                    requests={1247}
                                                    status="active"
                                                    lastUsed="2 min ago"
                                                />
                                                <ProjectItem
                                                    name="Content Generator"
                                                    apiKey="dk_live_..."
                                                    requests={856}
                                                    status="active"
                                                    lastUsed="5 min ago"
                                                />
                                                <ProjectItem
                                                    name="Code Assistant"
                                                    apiKey="dk_test_..."
                                                    requests={432}
                                                    status="development"
                                                    lastUsed="1 hour ago"
                                                />
                                                <ProjectItem
                                                    name="Data Analyzer"
                                                    apiKey="dk_live_..."
                                                    requests={298}
                                                    status="active"
                                                    lastUsed="15 min ago"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security & Alerts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-slate-100 flex items-center text-base">
                                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500"/>
                                    Service Alerts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <AlertItem
                                        title="High API Usage Detected"
                                        time="14:32:12"
                                        description="Project 'E-commerce Bot' approaching rate limit"
                                        type="warning"
                                    />
                                    <AlertItem
                                        title="New Model Available"
                                        time="13:45:06"
                                        description="GPT-4 Turbo Vision now available in your region"
                                        type="update"
                                    />
                                    <AlertItem
                                        title="Token Limit Reached"
                                        time="12:15:33"
                                        description="Project 'Content Gen' has reached monthly token limit"
                                        type="error"
                                    />
                                    <AlertItem
                                        title="Backup Completed"
                                        time="09:12:45"
                                        description="All project data successfully backed up"
                                        type="success"
                                    />
                                </div>
                            </CardContent>
                        </Card>
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
                    {/* System time */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-0">
                            <div
                                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                                    <div
                                        className="text-3xl font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                                    <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                                        <div className="text-xs text-slate-500 mb-1">Uptime</div>
                                        <div className="text-sm font-mono text-slate-200">99.99%</div>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                                        <div className="text-xs text-slate-500 mb-1">Region</div>
                                        <div className="text-sm font-mono text-slate-200">US-East</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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

// Usage chart component
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

// Project item component
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

// Alert item component
function AlertItem({
                       title,
                       time,
                       description,
                       type,
                   }) {
    const getTypeStyles = () => {
        switch (type) {
            case "info":
                return {icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30"};
            case "warning":
                return {icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30"};
            case "error":
                return {icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30"};
            case "success":
                return {icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30"};
            case "update":
                return {icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"};
            default:
                return {icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30"};
        }
    };

    const {icon: Icon, color} = getTypeStyles();

    return (
        <div className="flex items-start space-x-3">
            <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                <Icon className={`h-3 w-3 ${color.split(" ")[0]}`}/>
            </div>
            <div>
                <div className="flex items-center">
                    <div className="text-sm font-medium text-slate-200">{title}</div>
                    <div className="ml-2 text-xs text-slate-500">{time}</div>
                </div>
                <div className="text-xs text-slate-400">{description}</div>
            </div>
        </div>
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

