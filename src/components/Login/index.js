import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      const jwtToken = responseData.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const errorMessage = responseData.error_msg
      this.setState({errorMessage})
    }
  }

  render() {
    const {errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form-container">
          <img
            className="logo-img-large"
            alt="website login"
            src="https://res.cloudinary.com/srk999/image/upload/v1656568486/desktop/Layer_2_vsdbuc.svg"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="site-logo-name-container">
              <img
                className="website-logo"
                alt="website logo"
                src="https://res.cloudinary.com/srk999/image/upload/v1656562362/mobile/Standard_Collection_8_a0b8zx.svg"
              />
              <h1 className="website-name">Insta Share</h1>
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>

              <input
                className="user-input"
                id="username"
                type="text"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="user-input"
                id="password"
                type="password"
                onChange={this.onChangePassword}
              />
            </div>
            <p className="error-msg">{errorMessage}</p>
            <button className="submit-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
