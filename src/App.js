import "./App.scss";
import Auth from "./components/Auth";

import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { FaBars } from "react-icons/fa";

function App() {
  return (
    <>
      <Auth />
      {/* <Fab icon={<FaBars />} alwaysShowTitle={true}>
        <Action text="Email" onClick={() => {}} />
        <Action text="Help" onClick={() => {}}>
          <i className="fa fa-help" />
        </Action>
      </Fab> */}
    </>
  );
}

export default App;
