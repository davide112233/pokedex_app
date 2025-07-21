import DOMPurify from "isomorphic-dompurify";

const NoPage = () => {
    return (
        <>
            <div id="page-not-found" className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
                <h1 className="display-5 fw-bold text-center text-white">{DOMPurify.sanitize(`Page not found`)}</h1>
            </div>
        </>
    );
}

export default NoPage;