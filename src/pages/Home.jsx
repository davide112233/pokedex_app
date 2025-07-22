import { useState } from "react";
import Navbar from "../components/Navbar";
import PokedexFlexView from "../components/PokedexFlexView";
import PokedexLibView from "../components/PokedexLibView";

const Home = () => {
    const [view, setView] = useState("Book view");
    const [spriteMode, setSpriteMode] = useState("front_default");

    return (
        <>
            <Navbar selectedView={view} onViewChange={setView} spriteMode={spriteMode} onSpriteChange={setSpriteMode} />
            <main id="main">
               {view === "Grid view" ? <PokedexFlexView spriteMode={spriteMode} /> : <PokedexLibView spriteMode={spriteMode} />}
            </main>
        </>
    );
}

export default Home;
