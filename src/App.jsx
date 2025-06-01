import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"

import Dashboard from "./pages/dashboard.jsx";
import DashboardLayout from "./layouts/dashboard-layout.jsx";
import ProjectsPage from "./pages/projects.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard/overview" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<ProjectsPage />} />
        </Route>
    )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
