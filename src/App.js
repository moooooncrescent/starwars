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
    <div>
      <label>
        <span>Персонажи Star Wars</span>
        <input
          onChange={(event) => setState({ search: event.target.value })}
          value={state.search}
        />
      </label>
      <button
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
            console.log(err);
          }
        }}
      >
        Найти
      </button>
      <p>Имя:{state.hero}</p>
      <p>Планета:{state.homeworld}</p>
      <p>Рост:{state.height}</p>
      <p>Вес:{state.mass}</p>
      <p>Пол:{state.gender}</p>
      <div id="rectangle" style={squareStyle}></div>
    </div>
  );
}
export default App;
