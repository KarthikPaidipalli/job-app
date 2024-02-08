import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  useridtrig = event => {
    this.setState({username: event.target.value})
  }

  passwordtrig = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwttoken => {
    Cookies.set('jwt_token', jwttoken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = message => {
    this.setState({
      errorMsg: message,
      showSubmitError: true,
    })
  }

  submitingformlogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container-login">
        <form className="card-login" onSubmit={this.submitingformlogin}>
          <div className="aligning-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo-job"
            />
          </div>
          <label htmlFor="users" className="logincaed-label">
            USERNAME
          </label>
          <input
            type="text"
            id="users"
            placeholder="Username"
            className="logincaed-input"
            onChange={this.useridtrig}
            value={username}
          />
          <label htmlFor="passwordsof" className="logincaed-label">
            PASSWORD
          </label>

          <input
            type="password"
            id="passwordsof"
            placeholder="Password"
            className="logincaed-input"
            onChange={this.passwordtrig}
            value={password}
          />
          <button type="submit" className="button-to-login">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
