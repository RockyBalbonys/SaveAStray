import { useState } from "react";
import Login from "./LoginP.jsx";

function App() {
    const [count, Setcount] = useState(0);

    return (
    <>
      <Login />
    </>
      );
};

export default App;