import { Routes, Route } from "react-router-dom"
import App from "./App.tsx";
import {ProjectCreate} from "./components/project-create/ProjectCreate.tsx";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<ProjectCreate />} />
            <Route path="/app" element={<App />} />
        </Routes>
    )
}