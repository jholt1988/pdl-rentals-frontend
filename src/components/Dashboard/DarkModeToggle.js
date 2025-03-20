import React, { useState } from "react";

  const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
    );
};

export default DarkModeToggle