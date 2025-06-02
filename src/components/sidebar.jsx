import React from 'react'
import {Card, CardContent} from "./ui/card.jsx";
import {Activity, Bot, Code, Command, Database, Key, Settings, Shield, Users, Book} from "lucide-react";
import {Button} from "./ui/button.jsx";
import {useNavigate} from "react-router-dom";

const AppSideBar = () => {

    return (
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
                <CardContent className="p-4">
                    <nav className="space-y-2">
                        <NavItem icon={Command} href="/dashboard/overview" label="Dashboard" active />
                        <NavItem icon={Code} href="/dashboard/projects" label="Projects" />
                        <NavItem icon={Book} href="/documentation" label="Documentation" />
                        <NavItem icon={Bot} label="AI Models" />
                        {/*<NavItem icon={Key} label="API Keys" />*/}
                        <NavItem icon={Activity} label="Analytics" />
                        {/*<NavItem icon={Users} label="Usage" />*/}
                        {/*<NavItem icon={Database} label="Data" />*/}
                        {/*<NavItem icon={Shield} label="Security" />*/}
                        <NavItem icon={Settings} label="Settings" />
                    </nav>

                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-2 font-mono">SERVICE STATUS</div>
                        <div className="space-y-3">
                            <StatusItem label="AI Models" value={95} color="cyan" />
                            <StatusItem label="API Gateway" value={98} color="green" />
                            <StatusItem label="Data Pipeline" value={87} color="blue" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default AppSideBar

// Component for nav items
function NavItem({ icon: Icon, label, href, active }) {

    const navigate = useNavigate();

    return (
        <Button
            variant="ghost"
            className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
            onClick={() => {
                navigate(href);
            }}
        >
            <Icon className="mr-2 h-4 w-4" />
            {label}
        </Button>
    );
}

// Component for status items
function StatusItem({ label, value, color }) {
    const getColor = () => {
        switch (color) {
            case "cyan":
                return "from-cyan-500 to-blue-500";
            case "green":
                return "from-green-500 to-emerald-500";
            case "blue":
                return "from-blue-500 to-indigo-500";
            case "purple":
                return "from-purple-500 to-pink-500";
            default:
                return "from-cyan-500 to-blue-500";
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="text-xs text-slate-400">{value}%</div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}
