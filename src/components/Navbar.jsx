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
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">{DOMPurify.sanitize(`Settings`)}</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-xl-row flex-md-row flex-column flex-wrap justify-content-xl-between justify-content-md-between align-items-md-start justify-content-start align-items-center container-fluid gap-xl-0 gap-3">
                    <div className="pokedex-view-setter-box d-flex flex-column px-xl-4">
                        <label htmlFor="pokedex-view-setter" className="text-sm-center text-md-start text-xl-start">{DOMPurify.sanitize(`Setup the view of the pokedex here`)}</label>
                        <select id="pokedex-view-setter" className="form-select mt-3" aria-label="Default select example" value={selectedView} onChange={handleViewChange}>
                            <option value={DOMPurify.sanitize(`Book view`)}>{DOMPurify.sanitize(`Book view`)}</option>
                            <option value={DOMPurify.sanitize(`Grid view`)}>{DOMPurify.sanitize(`Grid view`)}</option>
                        </select>
                    </div>
                    <div className="pokedex-image-setter-box">
                        <label className="text-sm-center text-md-start text-xl-start">{DOMPurify.sanitize(`Setup the image sprites here`)}</label>
                        <div className="pokedex-image-setter-buttons-box d-flex flex-xl-row flex-md-row flex-sm-row flex-column gap-xl-3 gap-md-3 gap-2 mt-3">
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
