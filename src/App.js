import "./App.scss";
import Auth from "./components/Auth";

import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import MenuIcon from "./images/menu.png";

function App() {
  return (
    <>
      <Auth />
      <Fab
        icon={MenuIcon}
        alwaysShowTitle={true}
        onClick={() => {}}
      >
        <Action text="Email" onClick={() => {}} />
        <Action text="Help" onClick={() => {}}>
          <i className="fa fa-help" />
        </Action>
      </Fab>
    </>
  );
}

export default App;
