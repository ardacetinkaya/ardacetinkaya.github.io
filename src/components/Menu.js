import React, { Component } from "react";

class Menu extends Component {

    render() {
        return (
            <ul className="nav">
                <li className={(this.props.currentPage === "about" || this.props.currentPage === "") ? "nav-item active" : "nav-item"}>
                    <a className="nav-link" href="#about" onClick={() => this.props.onClick("about")}>About</a>
                </li>
                <li className={(this.props.currentPage === "experience") ? "nav-item active" : "nav-item"}>
                    <a className="nav-link" href="#experience" onClick={() => this.props.onClick("experience")}>Experience</a>
                </li>
                <li className={(this.props.currentPage === "skills") ? "nav-item active" : "nav-item"}>
                    <a className="nav-link" href="#skills" onClick={() => this.props.onClick("skills")}>Skills</a>
                </li>
                <li className={(this.props.currentPage === "blog") ? "nav-item active" : "nav-item"}>
                    <a className="nav-link" href="#blog" onClick={() => this.props.onClick("blog")}>Blog</a>
                </li>
                <li className={(this.props.currentPage === "contact") ? "nav-item active" : "nav-item"}>
                    <a className="nav-link" href="#contact" onClick={() => this.props.onClick("contact")}>Contact</a>
                </li>
            </ul>)
    }
}

export default Menu