import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutbuttonclicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <div className="header-nav">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websitelogo-in-home"
          />
        </Link>
        <ul className="aligninglines-in-navbar">
          <li className="list-of-Items">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="list-of-Items">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <li>
          <button className="logoutbutton" onClick={logoutbuttonclicked}>
            Logout
          </button>
        </li>
      </div>
    </div>
  )
}

export default withRouter(Header)
