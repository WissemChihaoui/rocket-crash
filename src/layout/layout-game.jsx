import React from "react";
import StarrySkyCanvas from "../components/StarSky";

const LayoutGame = ({ children }) => {
    return (
        <main className="relative m-0 bg-black w-screen h-screen flex-1 font-barlow overflow-hidden">
            <StarrySkyCanvas />
            <div style={{ position: "relative", zIndex: 10 }}>
                {children}
            </div>
        </main>
    )
}

export default LayoutGame