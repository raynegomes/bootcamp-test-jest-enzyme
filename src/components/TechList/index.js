import React, { useState, useEffect } from "react";
//import {} from "r";

// import { Container } from './styles';

export default function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, SetNewTech] = useState("");

  useEffect(() => {
    const techsStorage = localStorage.getItem("techs");

    if (techsStorage) {
      setTechs(JSON.parse(techsStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("techs", JSON.stringify(techs));
  }, [techs]);

  function handleAddTech() {
    setTechs([...techs, newTech]);
    SetNewTech("");
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <label htmlFor="tech">Tech</label>
      <input
        id="tech"
        value={newTech}
        onChange={e => SetNewTech(e.target.value)}
      />

      <input type="submit" value="Adicionar" />
    </form>
  );
}
