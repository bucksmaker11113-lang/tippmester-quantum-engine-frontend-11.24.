import React from "react";
import MiniTabSphere from "./MiniTabSphere";
import "./bottomtabs.css";

export default function BottomTabs({ onSelect }) {
    return (
        <div className="bottom-tabs">
            <div className="tab-item" onClick={() => onSelect("live")}>
                <MiniTabSphere color="#3fa9f5" />
                <span>Élő tippek</span>
            </div>

            <div className="tab-item" onClick={() => onSelect("single")}>
                <MiniTabSphere color="#3ff58a" />
                <span>Single tippek</span>
            </div>

            <div className="tab-item" onClick={() => onSelect("kombi")}>
                <MiniTabSphere color="#c83ff5" />
                <span>Kombi tippek</span>
            </div>

            <div className="tab-item" onClick={() => onSelect("chat")}>
                <MiniTabSphere color="#f5e63f" />
                <span>Chat</span>
            </div>
        </div>
    );
}
