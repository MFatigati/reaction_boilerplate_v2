import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import UISection from "./ExampleUI/UISection";
import AllBoardsUI from "./ExampleUI/AllBoards";
import CardArchivedUI from "./ExampleUI/CardArchived";
import CardEditingDescriptionUI from "./ExampleUI/CardEditingDescription";
import CardUI from "./ExampleUI/Card";
import CopyCardPopoverUI from "./ExampleUI/CopyCardPopover";
import CreateBoardUI from "./ExampleUI/CreateBoard";
import DueDatePopoverUI from "./ExampleUI/DueDatePopover";
import LabelsPopoverUI from "./ExampleUI/LabelsPopover";
import MoveCardPopoverUI from "./ExampleUI/MoveCardPopover";
import SingleBoardUI from "./ExampleUI/SingleBoard";

// Real ui imports
import SingleBoard from "./ui/SingleBoard";

const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/ui" exact component={UISection} />
      <Route path="/ui/allBoards" component={AllBoardsUI} />
      <Route path="/ui/cardArchived" component={CardArchivedUI} />
      <Route
        path="/ui/cardEditingDescription"
        component={CardEditingDescriptionUI}
      />
      <Route path="/ui/card" component={CardUI} />
      <Route path="/ui/copyCardPopover" component={CopyCardPopoverUI} />
      <Route path="/ui/createBoard" component={CreateBoardUI} />
      <Route path="/ui/dueDatePopover" component={DueDatePopoverUI} />
      <Route path="/ui/labelsPopover" component={LabelsPopoverUI} />
      <Route path="/ui/moveCardPopover" component={MoveCardPopoverUI} />
      <Route path="/ui/singleBoard" component={SingleBoardUI} />
      <Route path="/boards/:id" component={SingleBoard} />
    </div>
  );
};

export default Application;