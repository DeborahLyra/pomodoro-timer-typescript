import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { History } from "./pages/history/History"
import { DefaultLayout } from "./layouts/defaultLayout/DefaultLayout"

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
