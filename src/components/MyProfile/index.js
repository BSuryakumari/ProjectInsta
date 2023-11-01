import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data => ({
      followersCount: data.followers_count,
      followingCount: data.following_count,
      id: data.id,
      posts: data.posts.map(eachPost => ({
        id: eachPost.id,
        image: eachPost.image,
      })),
      postsCount: data.posts_count,
      profilePic: data.profile_pic,
      stories: data.stories.map(eachStory => ({
        id: eachStory.id,
        image: eachStory.image,
      })),
      userBio: data.user_bio,
      userId: data.user_id,
      userName: data.user_name,
    })

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      const updateMyProfileData = getFormattedData(responseData.profile)
      this.setState({
        myProfileData: updateMyProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMyProfileView = () => {
    const {myProfileData} = this.state

    return (
      <Profile
        key={myProfileData.id}
        profileDetails={myProfileData}
        owner="my"
        alt="my profile"
      />
    )
  }

  renderMyStoryView = () => {
    const {myProfileData} = this.state

    return (
      <Profile
        key={myProfileData.id}
        profileDetails={myProfileData}
        owner="my"
        alt="my story"
      />
    )
  }

  renderMyPostView = () => {
    const {myProfileData} = this.state

    return (
      <Profile
        key={myProfileData.id}
        profileDetails={myProfileData}
        owner="my"
        alt="my post"
      />
    )
  }

  renderFailureView = () => (
    <div className="my-profile-failure-view">
      <img
        src="https://res.cloudinary.com/srk999/image/upload/v1657016223/mobile/Group_7737_ylfsnx.svg"
        alt="failure view"
        className="my-profile-failure-image"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="my-profile-failure-button"
        type="button"
        onClick={this.getMyProfileData}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderMyProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default MyProfile
