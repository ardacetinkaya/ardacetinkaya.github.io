import React, { Component } from "react";

import DataService from "./services/data";

import About from "./components/About";
import Social from "./components/Social";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Menu from "./components/Menu";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "home",
      socialAddresses: [],
      me: null,
      experience: null,
      education: null,
      skills: null,
      blogs: [],
      repos: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    document.title = "Loading...";
    this.setState({ currentPage: window.location.hash.replace("#", "") })
    this.dataService = new DataService();
    const socialAddresses = await this.dataService.getSocial();
    const me = await this.dataService.getAbout("me");
    const experience = await this.dataService.getAbout("experience");
    const education = await this.dataService.getAbout("education");
    const other = await this.dataService.getAbout("other");
    const work = await this.dataService.getAbout("work");
    const skills = await this.dataService.getSkilss();

    document.title = "Arda Cetinkaya | Software Engineer @Stockholm, Sweden";
    const blogPosts = await this.dataService.getBlogPosts("https://www.minepla.net/feed/");
    const blogURL = "https://www.minepla.net";

    this.setState({
      socialAddresses: socialAddresses,
      me: me,
      experience: experience,
      education: education,
      other: other,
      work: work,
      skills: skills,
      blogPosts: blogPosts,
      blogURL:blogURL,
      loading: false
    });
  }

  onMenuClick = (menu) => {
    if (menu) {
      this.setState({ currentPage: menu });
    }
  }

  renderMain = () => {
    if (this.state.currentPage === "about") {
      return (<About me={this.state.me} education={this.state.education} other={this.state.other} work={this.state.work}  />)
    } else if (this.state.currentPage === "experience") {
      return (<Experience data={this.state.experience} url="https://www.linkedin.com/in/ardacetinkaya/"/>)
    } else if (this.state.currentPage === "blog") {
      return (<Blog url={this.state.blogURL} articles={this.state.blogPosts} />)
    } else if (this.state.currentPage === "skills") {
      return (<Skills data={this.state.skills}/>)
    } else if (this.state.currentPage === "contact") {
      return (<Contact data={this.state.socialAddresses}/>)
    } else
    {
      return (<About me={this.state.me} education={this.state.education} other={this.state.other} work={this.state.work} />)
    }
  }

  renderMenu = () => {
    return (<Menu onClick={this.onMenuClick} currentPage={this.state.currentPage} />)
  }

  render() {
    return (
      <div className="container inner">
        <div className="row gx-md-50">
          <header className="col-lg-2 mb-30 mb-lg-0">
            <div className="row gx-0 gy-20 gy-lg-0">
              <div className="col-5 col-lg-12 order-0 order-lg-1">
                <h1 className="site-title h4">{this.state.loading ? '' : 'Arda Cetinkaya'}</h1>
                <p class="small text-muted lh-lg mb-0">Software Engineer <br /> @Stockholm, Sweden</p>
              </div>
              <div className="col-2 col-lg-12 profile order-1 order-lg-0">
                <figure className="hover hover-lift">
                  <a href="/" onClick={() => this.onMenuClick("")}>
                  <span style={{backgroundImage: `url(assets/images/profile/me_01.jpeg)`,backgroundSize: "cover"}}></span>
                  </a>
                </figure>
              </div>
              <div className="col-1 mx-auto col-lg-12 order-2 order-lg-3">
                {this.state.loading ?
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only"></span>
                  </div> : <Social data={this.state.socialAddresses} />
                }

              </div>
              <div className="col-12 order-3 order-lg-2">
                <nav>
                  {this.renderMenu()}
                </nav>
              </div>
            </div>
          </header>
          <main className="col-lg-10">
            {this.state.loading ?
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="sr-only"></span>
              </div> : this.renderMain()
            }

          </main>
        </div>
      </div>
    );
  }
}


export default App;
