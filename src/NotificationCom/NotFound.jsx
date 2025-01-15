import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.css";

const NotFound = () => {
    const navigate = useNavigate();

    function handleGoHome(){
        navigate("/");
    };

    return (
        <div className={style.container}>
            <h1 className={style.title}>404 - Page Not Found</h1>
            <p className={style.message}>
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <button onClick={handleGoHome} className={style.button}>
                Go to Homepage
            </button>
        </div>
    );
};

export default NotFound;