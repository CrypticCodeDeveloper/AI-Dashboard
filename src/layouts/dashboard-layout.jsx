import DashboardHeader from "../components/dashboard-header.jsx";
import {useEffect, useRef, useState} from "react";
import {particleAnimate} from "../constants/functions.js";
import AppSideBar from "../components/sidebar.jsx";
import {Outlet} from "react-router-dom"

const DashboardLayout = () => {
    const canvasRef = useRef(null);

    const [theme, setTheme] = useState("dark");

    // Toggle theme
    // const toggleTheme = () => {
    //     setTheme(theme === "dark" ? "light" : "dark");
    // };

    // Particle effect
    useEffect(() => {
        particleAnimate(canvasRef)
    }, []);

    return (
        <main
            className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
        >

            <DashboardHeader/>
            {/* Background particle effect */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30"/>
            <div className="container mx-auto p-4 relative z-10">

                {/* Main content */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <AppSideBar/>


                    {/*  Outlet  */}
                    {/*<div className="col-span-12 md:col-span-9 lg:col-span-7">*/}
                        {<Outlet />}
                    {/*</div>*/}
                </div>

            </div>

        </main>
    );
}
export default DashboardLayout
