import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserPosts extends Component {
  state = {
    userPosts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data =>
      data.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        createdAt: eachPost.created_at,
        profilePic: eachPost.profile_pic,
        likesCount: eachPost.likes_count,
      }))

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const fetchedUserPosts = fetchedData.posts
      const updatedUserPosts = getFormattedData(fetchedUserPosts)

      this.setState({
        userPosts: updatedUserPosts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserPostsView = () => {
    const {userPosts} = this.state

    return (
      <ul className="userPosts-unorderedList">
        {userPosts.map(eachPost => (
          <UserPostItem
            className="userPost-item-component"
            key={eachPost.postId}
            UserPostDetails={eachPost}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="userPosts-failure-view">
      <img
        src="https://res.cloudinary.com/srk999/image/upload/v1656750680/mobile/alert-triangle_agumai.svg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.getUserPosts}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="Userposts-loader" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderUserPostsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserPosts
