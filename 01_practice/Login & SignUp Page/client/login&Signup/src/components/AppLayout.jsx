import { Outlet } from "react-router-dom"
import { Headers } from "./Layout/Headers"

export const AppLayout = () => {
    return (
        <>
            <Headers />
            <Outlet />
        </>
    )
}