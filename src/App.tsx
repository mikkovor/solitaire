import React from "react";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import Game from "views/Game";

const App: React.FC = () => {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Game />
    </DndProvider>
  );
};

export default App;
