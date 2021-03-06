import React, { Component } from 'react';

import style from './MatchMaker.css';
import Button from '../globals/Button/index.jsx';
import CommentItem from './CommentItem.jsx';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textvalue: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.submitComment();
  }

  submitComment = () => {
    const { textvalue } = this.state;
    this.props.submitComment(textvalue)
    this.setState({
      textvalue: '',
    })
    document.getElementById('chatTextarea').value = '';
  }

  generateClassNameFromVotes = (voteCount) => {
    if (voteCount > 0) {
      return "positive"
    } else if (voteCount < 0) {
      return "negative"
    } else {
      return "zero"
    }
  }

  handleTextareaChange = (e) => {
    this.setState({
      textvalue: e.target.value,
    })
  }

  render() {
    const { comments, exitComments, voteOnComment } = this.props;
    return (
      <div className={style.comments}>
        <div className={style.submit}>
          
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="chatTextarea"
              autoComplete="off"
              placeholder="Talk about it..."
              className={style.textbox}
              onChange={this.handleTextareaChange}
              />
          </form>
          <div className={style.small}>
          <Button
            text={"Enter"}
            className={"small"}
            onClick={() => this.submitComment()}
            />
          </div>
        </div>
        <div className={style.commentsFeed}>
          { comments.length ? 
            comments.map((comment, index) => {
              return (
                <CommentItem
                  className={this.generateClassNameFromVotes(comment.votes)}
                  id={comment.id}
                  index={index}
                  key={comment.id}
                  comment={comment.comment}
                  username={comment.username}
                  voteOnComment={voteOnComment}
                  votes={comment.votes}
                  />
                )
            })
            : <div className={style.nocomments}>no comments yet...</div>
          }
        </div>
      </div>
    );
  }
}

export default Comments;