import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import apiClient from "../../lib/ApiClient.js";
import { getBoard } from "../../actions/BoardActions.js";
import SingleCard from "./SingleCard.jsx";
import { updateList } from "../../actions/ListActions";
import { createCard } from "../../actions/CardActions";

const SingleList = ({ title, listId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards)
  const [newTitle, setNewTitle] = useState(title)
  const [editingInProgress, setEditingInProgress] = useState(false)
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addCardInProgress, setAddCardInProgress] = useState(false)

  let currentCards = cards.filter(card => {
    return card.listId === listId;
  })

  const handleSubmit = () => {
    let listUpdates = {
      id: listId,
      title: newTitle,
    }
    dispatch(updateList(listUpdates))
  }

  const handleNewCard = () => {
    let newCard = 
    {
      "listId": listId,
      "card": {
        "title": newCardTitle
      }
    }
    dispatch(createCard(newCard));
    handleAddCardToggle();
  }

  const handleAddCardToggle = () => {
    setAddCardInProgress(!addCardInProgress);
    setNewCardTitle("");
  }

  // TODO: This is not the ideal way to edit the list title. Do better.
  // QUESTION: Why is it making us double-click?
  // reference this: https://howtocreateapps.com/how-to-set-focus-on-an-input-element-in-react-using-hooks/
  const editListTitle = (title) => {
    if (editingInProgress) {
      return (
        <input
          className="list-title"
          onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setEditingInProgress(!editingInProgress)
                handleSubmit(newTitle);
              }
            }
          }
          onBlur={
            () => {
              setEditingInProgress(!editingInProgress)
              handleSubmit(newTitle);
            }
          }
          onChange={
            (e) => setNewTitle(e.target.value)
          }
          value={newTitle}
        />
      )
    } else {
      return (
        <p className="list-title" onClick={() => setEditingInProgress(!editingInProgress)}>{newTitle}</p>
      )
    }
  }

  return (
    <div className={`list-wrapper ${addCardInProgress ? "add-dropdown-active" : null}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href="#" ></a>
          <div>
            {editListTitle(title)}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {currentCards.map((card) => {
              return (
                <SingleCard key={card._id} card={card} />
              )
            })}
          </div>
          {/* active-card */}
          <div className={`add-dropdown add-bottom  ${addCardInProgress ? "active-card" : null}`}>
            <div className="card">
              <div className="card-info"></div>
              <textarea
                name="add-card"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              >
              </textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleNewCard}>Add</a>
            <i className="x-icon icon" onClick={handleAddCardToggle}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>

          <div className="add-card-toggle" data-position="bottom" onClick={handleAddCardToggle}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}


export default SingleList;