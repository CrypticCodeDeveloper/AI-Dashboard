import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import ModelRow from "@/components/dashboard/ui/model-row.jsx";
import ProjectItem from "@/components/dashboard/ui/project-item.jsx";
import UsageChart from "@/components/dashboard/ui/usage-chart.jsx";

const OverviewTabs = () => {
    return (
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
                            className="text-lg font-mono text-cyan-400">{5434}</div>
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
    )
}
export default OverviewTabs
