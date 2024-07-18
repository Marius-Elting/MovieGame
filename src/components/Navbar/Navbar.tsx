import { Link } from 'react-router-dom'
import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav className='navbar_wrapper'>
        <ul>
            <Link to={"/"}>Search</Link>
            <Link to={"/quiz"}>Game</Link>
        </ul>
    </nav>
  )
}

export default Navbar