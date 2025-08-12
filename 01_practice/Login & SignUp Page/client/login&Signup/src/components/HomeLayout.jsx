import { Outlet } from "react-router-dom"
import { Navbar } from "./Layout/Navbar"


export const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}