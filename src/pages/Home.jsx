import PokemonDashboard from "../components/PokemonDashboard";

const Home = () => {
    return (
        <>
            <main id="main">
                <div className="container-fluid d-flex justify-content-xl-between justify-content-center gap-xl-0 gap-3 p-3">
                    <PokemonDashboard />
                </div>
            </main>
        </>
    );
}

export default Home;