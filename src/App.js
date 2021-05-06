import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";
import { MathComponent } from "mathjax-react";

const predictaion = (x0, x1, housePrice) => {
  return x0 + x1 * housePrice;
};

function App() {
  const [vars, setVars] = useState({
    x0: 0.001,
    x1: 0.001,
  });
  const [error, setError] = useState(0);
  useEffect(() => {
    let total = 0;
    data.forEach((dataPt) => {
      total =
        total +
        Math.pow(
          dataPt.SalePrice - predictaion(vars.x0, vars.x1, dataPt.LotArea),
          2
        );
    });
    const err = Math.sqrt(total / data.length);
    setError(err);
  }, [vars.x0, vars.x1]);
  return (
    <div className="App">
      <form>
        <label>
          x0
          <input
            onChange={(e) => {
              e.preventDefault();
              setVars({
                ...vars,
                x0: Number(e.target.value),
              });
            }}
            name="x0"
            type="number"
            step={0.001}
            value={vars.x0}
          ></input>
        </label>
        <label>
          x1
          <input
            onChange={(e) => {
              e.preventDefault();
              setVars({
                ...vars,
                x1: Number(e.target.value),
              });
            }}
            name="x1"
            type="number"
            step={0.001}
            value={vars.x1}
          ></input>
        </label>
      </form>
      <div>x0: {vars.x0}</div>
      <div>x1: {vars.x1}</div>
      <div>
        Hypothesis functions:
        <div>
          <MathComponent
            tex={`h(price) = ${vars.x0} + ${vars.x1} \\cdot price`}
          />
        </div>
      </div>
      <div>Error: {error}</div>
    </div>
  );
}

export default App;
