import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [fakeCall, setFakeCall] = useState(false);

  useEffect(() => {
    const fakeFetch = async () => {
      setTimeout(() => navigate("/Login"), 2000);
    };
    if (fakeCall) fakeFetch();
  }, [fakeCall]);

  return (
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
        <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
        <h2>{count}</h2>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setFakeCall(true)}>FAKE FETCH</button>
      </div>
    </div>
  );
};

export default Home;
