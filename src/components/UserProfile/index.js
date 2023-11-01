import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data => ({
      posts: data.posts,
      stories: data.stories,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      id: data.id,
      postsCount: data.posts_count,
      profilePic: data.profile_pic,
      userId: data.user_id,
      userBio: data.user_bio,
      userName: data.user_name,
    })

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      const userProfile = responseData.user_details
      const updatedProfileData = getFormattedData(userProfile)
      this.setState({
        userProfileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUserProfileView = () => {
    const {userProfileData} = this.state

    return <Profile profileDetails={userProfileData} owner="user" />
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="userProfile-failure-view">
        <img
          src="https://res.cloudinary.com/srk999/image/upload/v1656750680/mobile/alert-triangle_agumai.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          className="failure-button"
          type="button"
          onClick={this.getUserProfile}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="userprofile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderUserProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserProfile
