import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>VOICI LE PROJET DE GLO-2005 FRONT-END</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <button onClick={() => setCount(count - 1)}>-</button>
          <h2>{count}</h2>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
    </>
  );
}

export default App;
