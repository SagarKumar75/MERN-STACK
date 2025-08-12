import { NavLink } from "react-router-dom"
import "./Headers.css"

export const Headers = () => {
    return (
        <header className="main-header">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Signup
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}