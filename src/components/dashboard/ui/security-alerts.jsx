import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {AlertCircle, Info, Check, Download} from "lucide-react";

const SecurityAlerts = () => {
    return (
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
    )
}
export default SecurityAlerts

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
