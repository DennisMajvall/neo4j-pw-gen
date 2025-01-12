import "./App.css";
import { Dialog } from "@neo4j-ndl/react";

export function App() {
  return (
    <div className="App">
      <Dialog isOpen hasDisabledCloseButton>
        <p>hello neo4j</p>
      </Dialog>
    </div>
  );
}
