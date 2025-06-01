import React from 'react'
import {Bell, Brain, Moon, Search, Sun} from "lucide-react";
import {Badge} from "./ui/badge.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "./ui/tooltip.jsx";
import {Button} from "./ui/button.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar.jsx";
import {useState} from "react";

const DashboardHeader = () => {


    const [theme, setTheme] = useState("dark");

    return (
        <>
            {/* Header */}
            <header className="flex items-center justify-between py-4 px-4 border-b border-slate-700/50 mb-6">
                <div className="flex items-center space-x-2">
                    <Brain className="h-8 w-8 text-cyan-500"/>
                    <span
                        className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DeepNexora
            </span>
                    <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs ml-2">
                        AI Platform
                    </Badge>
                </div>

                <div className="flex items-center space-x-6">
                    <div
                        className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
                        <Search className="h-4 w-4 text-slate-400"/>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon"
                                            className="relative text-slate-400 hover:text-slate-100">
                                        <Bell className="h-5 w-5"/>
                                        <span
                                            className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Notifications</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-slate-400 hover:text-slate-100"
                                    >
                                        {theme === "dark" ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5"/>}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Toggle theme</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User"/>
                            <AvatarFallback className="bg-slate-700 text-cyan-500">DN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
        </>
    );
}
export default DashboardHeader
