import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import apiClient from "../../lib/ApiClient.js";
import { getBoard } from "../../actions/BoardActions.js";
import { createList } from "../../actions/ListActions.js";
import SingleList from "./SingleList"
import { useState } from "react";

const SingleBoard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards)
  const lists = useSelector(state => state.lists)
  const cards = useSelector(state => state.cards)
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  function getBoardId() {
    if (location.pathname.includes("/boards")) {
      return useParams().id
    } else {
      const currentCard = cards.filter(card => card._id === useParams().id)[0];
      if (currentCard) {
        return currentCard.boardId;
      }
      return null
    }
  }

  const boardId = getBoardId()

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId))
    }
  }, [boardId, dispatch]);

  function toggleAddList() {
    setIsDisplayed(!isDisplayed);
    setNewListTitle("");
  }

  function handleCreateNewList(e) {
    if (newListTitle.trim() !== "") {
      dispatch(createList(newListTitle, id))
      toggleAddList();
    }
  }

  let currentBoard = boards.filter(board => {
    return board._id === boardId;
  })[0]

  if (!currentBoard) {
    return null
  }
  return (
    <>
      <header>
        <ul>
          <li id="title">{currentBoard.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>

      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">

            {lists.map(list => {
              return (<SingleList key={list._id} listId={list._id} title={list.title} />)
            })}

          </div>

          <div id="new-list" className={`new-list ${isDisplayed ? "selected" : null}`}>
            <span onClick={toggleAddList}>Add a list...</span>
            <input type="text" placeholder="Add a list..." value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} />
            <div>
              <input type="submit" className="button" value="Save" onClick={handleCreateNewList} />
              <i onClick={toggleAddList} className="x-icon icon"></i>
            </div>
          </div>

        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>

          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">Power-Ups</li>
              <li className="stickers-icon menu-icon not-implemented">Stickers</li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">Activity</li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default SingleBoard;
