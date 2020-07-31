import React, { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({ search: "" });
  let squareStyle;
  let female = "female";
  if (state.gender === female) {
    squareStyle = {
      width: `${state.mass}px`,
      height: `${state.height}px`,
      background: `${state.eyes}`,
      borderRadius: `100px`,
    };
  } else {
    squareStyle = {
      width: `${state.mass}px`,
      height: `${state.height}px`,
      background: `${state.eyes}`,
    };
  }

  return (
    <div className="container">
      <label>
        <h1>Персонажи Star Wars</h1>
        <input
          className="searchInput"
          onChange={(event) => setState({ search: event.target.value })}
          value={state.search}
        />
      </label>
      <button
        className="searchButton"
        onClick={async () => {
          try {
            let data = await fetch(
              `https://swapi.dev/api/people/${state.search}`
            );
            data = await data.json();
            const homeworld = data.homeworld.replace(/^http:\/\//i, "https://");
            let dataHome = await fetch(homeworld);
            dataHome = await dataHome.json();
            setState({
              hero: data.name,
              homeworld: dataHome.name,
              height: data.height,
              mass: data.mass,
              gender: data.gender,
              eyes: data.eye_color,
            });
          } catch (err) {
            alert("error");
          }
        }}
      >
        Найти
      </button>
      <p style={{ color: "grey" }}>Имя: {state.hero}</p>
      <p style={{ color: "grey" }}>Планета: {state.homeworld}</p>
      <div className="rectangle" style={squareStyle}></div>
    </div>
  );
}
export default App;
