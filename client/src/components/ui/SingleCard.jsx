import React from "react";

const SingleCard = ({ card }) => {
  function populateCardIcons(card) {
    return (
      // TODO: Depending on the completion status of the card we need to 
      // determine which class to give the icon
      <div className="card-icons">
        {card.dueDate ? <i className="clock-icon sm-icon overdue-recent completed">{new Date(card.dueDate).getUTCMonth() + 1}/{new Date(card.dueDate).getUTCDate()}</i> : null}
        {card.commentCount ? <i className="description-icon sm-icon"></i> : null}
        {card.description ? <i className="comment-icon sm-icon"></i> : null}
      </div>
    )
  }

  return (
    <div className="card-background">
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {card.labels.map((label) => {
            return (
              <div key={label} className={`card-label ${label} colorblindable`}></div>
            )
          })}
          <p>
            {card.title}
          </p>
        </div>
        {populateCardIcons(card)}
      </div>
    </div>
  )
}

export default SingleCard;