import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux" 
import { logout } from "../redux/modules/users"

const Navbar = ({users: { isAuthenticated}, logout}) => {
    
    const authLinks = (
        <ul>
            <li>
                <Link onClick={logout} to="/">Logout</Link>
            </li>
        </ul>
    )

    const links = (
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar bg-navbar">
            <h1>
                <Link className="logo-navbar" to="/">
                    TawaSol
                </Link>
            </h1>
            <Fragment>
                {isAuthenticated ? authLinks : links}                
            </Fragment>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    users: state.users
})

export default connect(mapStateToProps, {logout})(Navbar);