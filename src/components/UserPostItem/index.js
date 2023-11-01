import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'

import './index.css'

class UserPostItem extends Component {
  state = {
    isLiked: false,
  }

  onClickLike = async () => {
    const {isLiked} = this.state
    const {UserPostDetails} = this.props
    const {postId} = UserPostDetails
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const updateDetails = {like_status: !isLiked}
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updateDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({isLiked: !isLiked})
    }
  }

  renderPostComments = () => {
    const {UserPostDetails} = this.props
    const {comments} = UserPostDetails
    return (
      <ul>
        {comments.map(eachComment => {
          const {userId, userName, comment} = eachComment
          return (
            <li className="userPost-item-comments-li-items" key={userId}>
              <p className="userPost-item-user-comment">
                <span className="userPost-item-comment-userName">
                  {userName}
                </span>
                {comment}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {isLiked} = this.state

    const {UserPostDetails} = this.props
    const {
      createdAt,
      likesCount,
      profilePic,
      userId,
      userName,
      postDetails,
    } = UserPostDetails

    const {caption, imageUrl} = postDetails

    return (
      <li className="userPost-item-li-container">
        <div className="userPost-name-profile-container">
          <div className="userPost-item-profile">
            <img
              className="userPost-item-profile-pic"
              src={profilePic}
              alt="post author profile"
            />
          </div>
          <Link to={`/users/${userId}`}>
            <p className="userPost-item-user-name">{userName}</p>
          </Link>
        </div>
        <img className="userPost-item-post-image" src={imageUrl} alt="post" />
        <div className="like-comment-share-container">
          {isLiked ? (
            <button
              type="button"
              testid="unlikeIcon"
              onClick={this.onClickLike}
            >
              <FcLike
                className="userPost-interaction-button"
                testid="unLikeIcon"
              />
            </button>
          ) : (
            <button type="button" testid="likeIcon" onClick={this.onClickLike}>
              <AiOutlineHeart className="userPost-interaction-button" />
            </button>
          )}
          <button type="button">
            <FaRegComment
              className="userPost-interaction-button"
              testid="searchIcon"
            />
          </button>
          <button type="button">
            <BiShareAlt
              className="userPost-interaction-button"
              testid="likeIcon"
            />
          </button>
        </div>
        <p className="userPost-item-likes-count">
          {likesCount + isLiked} likes
        </p>
        <p className="userPost-item-caption">{caption}</p>
        {this.renderPostComments()}
        <p className="userPost-item-createdAt">{createdAt}</p>
      </li>
    )
  }
}

export default UserPostItem
