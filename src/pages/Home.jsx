import { useState } from "react";
import Navbar from "../components/Navbar";
import PokedexFlexView from "../components/PokedexFlexView";
import PokedexLibView from "../components/PokedexLibView";

const Home = () => {
  const [view, setView] = useState("Book view");
  const [spriteMode, setSpriteMode] = useState("front_default");
  const [generationFilterList, setGenerationFilterList] = useState([]);

  const handleGenerationSelect = (speciesList) => {
    if (!speciesList || speciesList.length === 0) {
      setGenerationFilterList([]);
    } else {
      const names = speciesList.map((species) => species.name);
      setGenerationFilterList(names);
    }
  };

  return (
    <>
      <Navbar
        selectedView={view}
        onViewChange={setView}
        spriteMode={spriteMode}
        onSpriteChange={setSpriteMode}
      />
      <main id="main">
        {view === "Grid view" ? (
          <PokedexFlexView spriteMode={spriteMode} filterList={generationFilterList} />
        ) : (
          <PokedexLibView spriteMode={spriteMode} filterList={generationFilterList} />
        )}
      </main>
    </>
  );
};

export default Home;
