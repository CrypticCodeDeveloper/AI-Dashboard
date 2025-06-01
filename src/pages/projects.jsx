"use client"

import { useState } from "react"
import {
    Activity,
    Code,
    Copy,
    Edit,
    Eye,
    EyeOff,
    Globe,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    Trash2,
    Zap,
} from "lucide-react"

import { Button } from "../components/ui/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Input } from "../components/ui/input.jsx"
import { Label } from "../components/ui/label.jsx"
import { Textarea } from "../components/ui/textarea.jsx"
import { Switch } from "../components/ui/switch.jsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog.jsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx"
import { Progress } from "../components/ui/progress.jsx"

export default function ProjectsPage() {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "E-commerce Chatbot",
            description: "AI-powered customer support chatbot for online retail platform",
            status: "active",
            apiKey: "dk_live_sk_1a2b3c4d5e6f7g8h9i0j",
            apiKeyVisible: false,
            model: "GPT-4 Turbo",
            requests: 12847,
            tokens: 2400000,
            lastUsed: "2 minutes ago",
            createdAt: "2024-01-15",
            environment: "production",
            rateLimitRpm: 1000,
            rateLimitTpm: 50000,
            usage: 68,
            cost: 245.67,
        },
        {
            id: 2,
            name: "Content Generator",
            description: "Automated blog post and marketing content generation system",
            status: "active",
            apiKey: "dk_live_sk_2b3c4d5e6f7g8h9i0j1k",
            apiKeyVisible: false,
            model: "Claude 3.5 Sonnet",
            requests: 8564,
            tokens: 1800000,
            lastUsed: "5 minutes ago",
            createdAt: "2024-01-10",
            environment: "production",
            rateLimitRpm: 500,
            rateLimitTpm: 30000,
            usage: 45,
            cost: 189.23,
        },
        {
            id: 3,
            name: "Code Assistant",
            description: "AI coding companion for development teams",
            status: "development",
            apiKey: "dk_test_sk_3c4d5e6f7g8h9i0j1k2l",
            apiKeyVisible: false,
            model: "GPT-4 Turbo",
            requests: 4321,
            tokens: 890000,
            lastUsed: "1 hour ago",
            createdAt: "2024-01-08",
            environment: "development",
            rateLimitRpm: 200,
            rateLimitTpm: 20000,
            usage: 23,
            cost: 67.89,
        },
        {
            id: 4,
            name: "Data Analyzer",
            description: "Intelligent data analysis and insights generation",
            status: "active",
            apiKey: "dk_live_sk_4d5e6f7g8h9i0j1k2l3m",
            apiKeyVisible: false,
            model: "Gemini Pro",
            requests: 2987,
            tokens: 654000,
            lastUsed: "15 minutes ago",
            createdAt: "2024-01-05",
            environment: "production",
            rateLimitRpm: 300,
            rateLimitTpm: 25000,
            usage: 31,
            cost: 45.12,
        },
        {
            id: 5,
            name: "Translation Service",
            description: "Multi-language translation API for global applications",
            status: "paused",
            apiKey: "dk_live_sk_5e6f7g8h9i0j1k2l3m4n",
            apiKeyVisible: false,
            model: "GPT-3.5 Turbo",
            requests: 1567,
            tokens: 320000,
            lastUsed: "2 days ago",
            createdAt: "2023-12-28",
            environment: "production",
            rateLimitRpm: 150,
            rateLimitTpm: 15000,
            usage: 12,
            cost: 23.45,
        },
        {
            id: 6,
            name: "Image Recognition",
            description: "Computer vision API for image classification and analysis",
            status: "active",
            apiKey: "dk_live_sk_6f7g8h9i0j1k2l3m4n5o",
            apiKeyVisible: false,
            model: "GPT-4 Vision",
            requests: 987,
            tokens: 156000,
            lastUsed: "30 minutes ago",
            createdAt: "2023-12-20",
            environment: "production",
            rateLimitRpm: 100,
            rateLimitTpm: 10000,
            usage: 8,
            cost: 34.56,
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [environmentFilter, setEnvironmentFilter] = useState("all")
    const [viewMode, setViewMode] = useState("grid") // grid or list
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false)

    // New project form state
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        model: "GPT-4 Turbo",
        environment: "development",
        rateLimitRpm: 100,
        rateLimitTpm: 10000,
    })

    // Filter projects based on search and filters
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || project.status === statusFilter
        const matchesEnvironment = environmentFilter === "all" || project.environment === environmentFilter

        return matchesSearch && matchesStatus && matchesEnvironment
    })

    // Toggle API key visibility
    const toggleApiKeyVisibility = (projectId) => {
        setProjects(
            projects.map((project) =>
                project.id === projectId ? { ...project, apiKeyVisible: !project.apiKeyVisible } : project,
            ),
        )
    }

    // Copy API key to clipboard
    const copyApiKey = async (apiKey) => {
        try {
            await navigator.clipboard.writeText(apiKey)
            // You could add a toast notification here
        } catch (err) {
            console.error("Failed to copy API key:", err)
        }
    }

    // Create new project
    const createProject = () => {
        const project = {
            id: projects.length + 1,
            ...newProject,
            apiKey: `dk_${newProject.environment}_sk_${Math.random().toString(36).substring(2, 15)}`,
            apiKeyVisible: false,
            requests: 0,
            tokens: 0,
            lastUsed: "Never",
            createdAt: new Date().toISOString().split("T")[0],
            usage: 0,
            cost: 0,
            status: "active",
        }

        setProjects([...projects, project])
        setIsCreateModalOpen(false)
        setNewProject({
            name: "",
            description: "",
            model: "GPT-4 Turbo",
            environment: "development",
            rateLimitRpm: 100,
            rateLimitTpm: 10000,
        })
    }

    // Delete project
    const deleteProject = (projectId) => {
        setProjects(projects.filter((project) => project.id !== projectId))
    }

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-500/10 text-green-400 border-green-500/30"
            case "development":
                return "bg-amber-500/10 text-amber-400 border-amber-500/30"
            case "paused":
                return "bg-slate-500/10 text-slate-400 border-slate-500/30"
            default:
                return "bg-green-500/10 text-green-400 border-green-500/30"
        }
    }

    // Get environment color
    const getEnvironmentColor = (environment) => {
        switch (environment) {
            case "production":
                return "bg-blue-500/10 text-blue-400 border-blue-500/30"
            case "development":
                return "bg-purple-500/10 text-purple-400 border-purple-500/30"
            case "staging":
                return "bg-orange-500/10 text-orange-400 border-orange-500/30"
            default:
                return "bg-blue-500/10 text-blue-400 border-blue-500/30"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 page-layout">
            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Projects
                        </h1>
                        <p className="text-slate-400 mt-2">Manage your AI projects and API integrations</p>
                    </div>

                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">
                                <Plus className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-cyan-400">Create New Project</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Set up a new AI project with custom configuration
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name" className="text-slate-300">
                                        Project Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        className="bg-slate-800 border-slate-700 text-slate-100"
                                        placeholder="My AI Project"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-slate-300">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        className="bg-slate-800 border-slate-700 text-slate-100"
                                        placeholder="Describe your project..."
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="model" className="text-slate-300">
                                        AI Model
                                    </Label>
                                    <Select
                                        value={newProject.model}
                                        onValueChange={(value) => setNewProject({ ...newProject, model: value })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="GPT-4 Turbo">GPT-4 Turbo</SelectItem>
                                            <SelectItem value="GPT-4">GPT-4</SelectItem>
                                            <SelectItem value="GPT-3.5 Turbo">GPT-3.5 Turbo</SelectItem>
                                            <SelectItem value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</SelectItem>
                                            <SelectItem value="Claude 3 Haiku">Claude 3 Haiku</SelectItem>
                                            <SelectItem value="Gemini Pro">Gemini Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="environment" className="text-slate-300">
                                        Environment
                                    </Label>
                                    <Select
                                        value={newProject.environment}
                                        onValueChange={(value) => setNewProject({ ...newProject, environment: value })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="development">Development</SelectItem>
                                            <SelectItem value="staging">Staging</SelectItem>
                                            <SelectItem value="production">Production</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="rateLimitRpm" className="text-slate-300">
                                            Rate Limit (RPM)
                                        </Label>
                                        <Input
                                            id="rateLimitRpm"
                                            type="number"
                                            value={newProject.rateLimitRpm}
                                            onChange={(e) => setNewProject({ ...newProject, rateLimitRpm: Number.parseInt(e.target.value) })}
                                            className="bg-slate-800 border-slate-700 text-slate-100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rateLimitTpm" className="text-slate-300">
                                            Token Limit (TPM)
                                        </Label>
                                        <Input
                                            id="rateLimitTpm"
                                            type="number"
                                            value={newProject.rateLimitTpm}
                                            onChange={(e) => setNewProject({ ...newProject, rateLimitTpm: Number.parseInt(e.target.value) })}
                                            className="bg-slate-800 border-slate-700 text-slate-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="border-slate-700">
                                    Cancel
                                </Button>
                                <Button onClick={createProject} className="bg-cyan-600 hover:bg-cyan-700">
                                    Create Project
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Total Projects</p>
                                    <p className="text-2xl font-bold text-cyan-400">{projects.length}</p>
                                </div>
                                <Code className="h-8 w-8 text-cyan-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Active Projects</p>
                                    <p className="text-2xl font-bold text-green-400">
                                        {projects.filter((p) => p.status === "active").length}
                                    </p>
                                </div>
                                <Activity className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Total Requests</p>
                                    <p className="text-2xl font-bold text-purple-400">
                                        {projects.reduce((sum, p) => sum + p.requests, 0).toLocaleString()}
                                    </p>
                                </div>
                                <Globe className="h-8 w-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Monthly Cost</p>
                                    <p className="text-2xl font-bold text-blue-400">
                                        ${projects.reduce((sum, p) => sum + p.cost, 0).toFixed(2)}
                                    </p>
                                </div>
                                <Zap className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col md:flex-row gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
                                    />
                                </div>

                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-slate-100">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="paused">Paused</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                                    <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-slate-100">
                                        <SelectValue placeholder="Environment" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="all">All Environments</SelectItem>
                                        <SelectItem value="production">Production</SelectItem>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="staging">Staging</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="border-slate-700"
                                >
                                    Grid
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="border-slate-700"
                                >
                                    List
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Grid/List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onToggleApiKey={() => toggleApiKeyVisibility(project.id)}
                                onCopyApiKey={() => copyApiKey(project.apiKey)}
                                onViewDetails={() => {
                                    setSelectedProject(project)
                                    setIsProjectDetailOpen(true)
                                }}
                                onDelete={() => deleteProject(project.id)}
                                getStatusColor={getStatusColor}
                                getEnvironmentColor={getEnvironmentColor}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-slate-700/50">
                                    <tr className="text-left">
                                        <th className="p-4 text-slate-400 font-medium">Project</th>
                                        <th className="p-4 text-slate-400 font-medium">Status</th>
                                        <th className="p-4 text-slate-400 font-medium">Environment</th>
                                        <th className="p-4 text-slate-400 font-medium">Model</th>
                                        <th className="p-4 text-slate-400 font-medium">Requests</th>
                                        <th className="p-4 text-slate-400 font-medium">Last Used</th>
                                        <th className="p-4 text-slate-400 font-medium">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredProjects.map((project) => (
                                        <ProjectRow
                                            key={project.id}
                                            project={project}
                                            onViewDetails={() => {
                                                setSelectedProject(project)
                                                setIsProjectDetailOpen(true)
                                            }}
                                            onDelete={() => deleteProject(project.id)}
                                            getStatusColor={getStatusColor}
                                            getEnvironmentColor={getEnvironmentColor}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Project Detail Modal */}
                <Dialog open={isProjectDetailOpen} onOpenChange={setIsProjectDetailOpen}>
                    <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-4xl max-h-[90vh] overflow-y-auto">
                        {selectedProject && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-cyan-400 text-xl">{selectedProject.name}</DialogTitle>
                                    <DialogDescription className="text-slate-400">{selectedProject.description}</DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="overview" className="w-full">
                                    <TabsList className="bg-slate-800/50 p-1 mb-6">
                                        <TabsTrigger
                                            value="overview"
                                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                        >
                                            Overview
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="api"
                                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                        >
                                            API Configuration
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="usage"
                                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                        >
                                            Usage Analytics
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="settings"
                                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                        >
                                            Settings
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Total Requests</div>
                                                <div className="text-xl font-bold text-cyan-400">
                                                    {selectedProject.requests.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Tokens Used</div>
                                                <div className="text-xl font-bold text-purple-400">
                                                    {(selectedProject.tokens / 1000000).toFixed(1)}M
                                                </div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Monthly Cost</div>
                                                <div className="text-xl font-bold text-blue-400">${selectedProject.cost.toFixed(2)}</div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Usage</div>
                                                <div className="text-xl font-bold text-green-400">{selectedProject.usage}%</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h3 className="text-slate-200 font-medium mb-3">Project Details</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Status:</span>
                                                        <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Environment:</span>
                                                        <Badge className={getEnvironmentColor(selectedProject.environment)}>
                                                            {selectedProject.environment}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Model:</span>
                                                        <span className="text-slate-200">{selectedProject.model}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Created:</span>
                                                        <span className="text-slate-200">{selectedProject.createdAt}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Last Used:</span>
                                                        <span className="text-slate-200">{selectedProject.lastUsed}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h3 className="text-slate-200 font-medium mb-3">Rate Limits</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-slate-400">Requests per minute</span>
                                                            <span className="text-slate-200">{selectedProject.rateLimitRpm}</span>
                                                        </div>
                                                        <Progress value={45} className="h-2 bg-slate-700">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                                                style={{ width: "45%" }}
                                                            />
                                                        </Progress>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-slate-400">Tokens per minute</span>
                                                            <span className="text-slate-200">{selectedProject.rateLimitTpm.toLocaleString()}</span>
                                                        </div>
                                                        <Progress value={62} className="h-2 bg-slate-700">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                                style={{ width: "62%" }}
                                                            />
                                                        </Progress>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="api" className="space-y-6">
                                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                            <h3 className="text-slate-200 font-medium mb-3">API Key</h3>
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    value={
                                                        selectedProject.apiKeyVisible ? selectedProject.apiKey : "••••••••••••••••••••••••••••••••"
                                                    }
                                                    readOnly
                                                    className="bg-slate-900 border-slate-700 text-slate-100 font-mono"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => toggleApiKeyVisibility(selectedProject.id)}
                                                    className="border-slate-700"
                                                >
                                                    {selectedProject.apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => copyApiKey(selectedProject.apiKey)}
                                                    className="border-slate-700"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                            <h3 className="text-slate-200 font-medium mb-3">API Endpoint</h3>
                                            <div className="bg-slate-900 rounded p-3 border border-slate-700/50">
                                                <code className="text-cyan-400 text-sm">https://api.deepnexora.com/v1/chat/completions</code>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                            <h3 className="text-slate-200 font-medium mb-3">Example Request</h3>
                                            <div className="bg-slate-900 rounded p-3 border border-slate-700/50">
                        <pre className="text-sm text-slate-300 overflow-x-auto">
                          {`curl -X POST https://api.deepnexora.com/v1/chat/completions \\
  -H "Authorization: Bearer ${selectedProject.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${selectedProject.model}",
    "messages": [
      {"role": "user", "content": "Hello, world!"}
    ]
  }'`}
                        </pre>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="usage" className="space-y-6">
                                        <div className="h-64 bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                                            <h3 className="text-slate-200 font-medium mb-3">Usage Over Time</h3>
                                            <div className="h-48 flex items-center justify-center text-slate-400">
                                                <div className="text-center">
                                                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>Usage analytics chart would go here</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Peak Usage</div>
                                                <div className="text-xl font-bold text-cyan-400">1,247 RPM</div>
                                                <div className="text-xs text-slate-500">Yesterday at 2:30 PM</div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Avg Response Time</div>
                                                <div className="text-xl font-bold text-purple-400">142ms</div>
                                                <div className="text-xs text-slate-500">Last 24 hours</div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <div className="text-slate-400 text-sm">Error Rate</div>
                                                <div className="text-xl font-bold text-green-400">0.02%</div>
                                                <div className="text-xs text-slate-500">Last 7 days</div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="settings" className="space-y-6">
                                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                            <h3 className="text-slate-200 font-medium mb-3">Project Settings</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-slate-200">Auto-scaling</div>
                                                        <div className="text-slate-400 text-sm">Automatically scale based on demand</div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-slate-200">Rate limiting</div>
                                                        <div className="text-slate-400 text-sm">Enable rate limiting protection</div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-slate-200">Usage alerts</div>
                                                        <div className="text-slate-400 text-sm">Get notified when approaching limits</div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                            <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
                                            <p className="text-slate-400 text-sm mb-4">
                                                These actions cannot be undone. Please proceed with caution.
                                            </p>
                                            <div className="space-y-2">
                                                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                                                    Regenerate API Key
                                                </Button>
                                                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                                                    Delete Project
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

// Project Card Component
function ProjectCard({
                         project,
                         onToggleApiKey,
                         onCopyApiKey,
                         onViewDetails,
                         onDelete,
                         getStatusColor,
                         getEnvironmentColor,
                     }) {
    return (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-slate-100 text-lg mb-2">{project.name}</CardTitle>
                        <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                            <DropdownMenuItem onClick={onViewDetails} className="text-slate-300 hover:bg-slate-700">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge className={getEnvironmentColor(project.environment)}>{project.environment}</Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Model:</span>
                        <span className="text-slate-200">{project.model}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Requests:</span>
                        <span className="text-cyan-400">{project.requests.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Last used:</span>
                        <span className="text-slate-200">{project.lastUsed}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Usage:</span>
                        <span className="text-slate-200">{project.usage}%</span>
                    </div>
                    <Progress value={project.usage} className="h-2 bg-slate-700">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                            style={{ width: `${project.usage}%` }}
                        />
                    </Progress>
                </div>

                <div className="pt-2 border-t border-slate-700/50">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={project.apiKeyVisible ? project.apiKey : "••••••••••••••••••••••••••••••••"}
                            readOnly
                            className="bg-slate-800 border-slate-700 text-slate-100 font-mono text-xs"
                        />
                        <Button variant="outline" size="icon" onClick={onToggleApiKey} className="h-8 w-8 border-slate-700">
                            {project.apiKeyVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button variant="outline" size="icon" onClick={onCopyApiKey} className="h-8 w-8 border-slate-700">
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Project Row Component for List View
function ProjectRow({ project, onViewDetails, onDelete, getStatusColor, getEnvironmentColor }) {
    return (
        <tr className="border-b border-slate-700/30 hover:bg-slate-800/30">
            <td className="p-4">
                <div>
                    <div className="font-medium text-slate-200">{project.name}</div>
                    <div className="text-sm text-slate-400 truncate max-w-xs">{project.description}</div>
                </div>
            </td>
            <td className="p-4">
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            </td>
            <td className="p-4">
                <Badge className={getEnvironmentColor(project.environment)}>{project.environment}</Badge>
            </td>
            <td className="p-4 text-slate-200">{project.model}</td>
            <td className="p-4 text-cyan-400">{project.requests.toLocaleString()}</td>
            <td className="p-4 text-slate-400">{project.lastUsed}</td>
            <td className="p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                        <DropdownMenuItem onClick={onViewDetails} className="text-slate-300 hover:bg-slate-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </tr>
    )
}
