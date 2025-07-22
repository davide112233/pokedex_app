import { CiSettings } from "react-icons/ci";
import DOMPurify from "isomorphic-dompurify";

const Navbar = ({ selectedView, onViewChange, spriteMode, onSpriteChange }) => {
    const handleViewChange = (e) => {
        onViewChange(e.target.value);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{DOMPurify.sanitize(`Pokedex app`)}</a>
                    <form className="d-flex mb-2" role="search">
                        <button className="btn settings-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <CiSettings />
                        </button>
                    </form>
                </div>
            </nav>
            <div className="offcanvas offcanvas-end w-100" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">{DOMPurify.sanitize(`Settings menu`)}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-wrap justify-content-betweem container mt-xl-2">
                    <div className="pokedex-view-setter-box d-flex flex-column px-xl-4">
                        <label htmlFor="pokedex-view-setter">{DOMPurify.sanitize(`Setup the view of the pokedex here`)}</label>
                        <select id="pokedex-view-setter" className="form-select mt-3" aria-label="Default select example" value={selectedView} onChange={handleViewChange}>
                            <option value={DOMPurify.sanitize(`Book view`)}>{DOMPurify.sanitize(`Book view`)}</option>
                            <option value={DOMPurify.sanitize(`Grid view`)}>{DOMPurify.sanitize(`Grid view`)}</option>
                        </select>
                    </div>
                    <div className="pokedex-image-setter-box">
                        <label>{DOMPurify.sanitize(`Setup the image sprites here`)}</label>
                        <div className="pokedex-image-setter-buttons-box d-flex gap-xl-3 mt-xl-3">
                            <button type="button" className={`btn sprite-button ${spriteMode === 'front_default' ? 'active' : 'inactive'}`} onClick={() => onSpriteChange('front_default')}>{DOMPurify.sanitize(`Front default`)}</button>
                            <button type="button" className={`btn sprite-button ${spriteMode === 'home_front_default' ? 'active' : 'inactive'}`} onClick={() => onSpriteChange('home_front_default')}>{DOMPurify.sanitize(`Home front default`)}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

//<option defaultValue>{DOMPurify.sanitize(`Display the selected view here`)}</option>