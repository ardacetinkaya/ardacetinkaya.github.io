import React, { Component } from "react";

const THEME_STORAGE_KEY = "theme";
const THEME_ORDER = ["auto", "light", "dark"];
const THEME_ICON_CLASS = {
    auto: "uil uil-desktop",
    light: "uil uil-sun",
    dark: "uil uil-moon",
};
const THEME_LABEL = {
    auto: "Auto",
    light: "Light",
    dark: "Dark",
};

class ThemeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = { theme: this.readStoredTheme() };
    }

    componentDidMount() {
        this.applyTheme(this.state.theme);
    }

    readStoredTheme = () => {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        return THEME_ORDER.includes(stored) ? stored : "auto";
    }

    applyTheme = (theme) => {
        if (theme === "auto") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
        }
    }

    handleClick = () => {
        const currentIndex = THEME_ORDER.indexOf(this.state.theme);
        const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

        if (nextTheme === "auto") {
            window.localStorage.removeItem(THEME_STORAGE_KEY);
        } else {
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        }

        this.applyTheme(nextTheme);
        this.setState({ theme: nextTheme });
    }

    render() {
        const { theme } = this.state;
        const label = `Switch appearance (current: ${THEME_LABEL[theme]})`;

        return (
            <button
                type="button"
                className="theme-toggle btn btn-link p-0"
                onClick={this.handleClick}
                title={label}
                aria-label={label}
            >
                <i className={THEME_ICON_CLASS[theme]}></i>
            </button>
        )
    }
}

export default ThemeToggle;
