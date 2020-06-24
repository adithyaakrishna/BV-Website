import React from 'react';

function MenuBar() {
    return (

        <div className="menuBar menu-bar-charity">
            <nav className="navbar navbar-default ">
                <div className="container p0">
                    <div className="navbar-header">
                        <div className="logo">
                            <img href="index" className="navbar-brand" />
                            <img src={require('../../assets/images/logo.png')} alt="Homepage logo" />
                        </div>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar-menu">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="navbar-right">
                        <div id="navbar-menu" className="collapse navbar-collapse ">
                            <ul className="nav navbar-nav" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="dropdown">
                                    <a href="index"
                                        role="button" aria-expanded="false" title="Home">HOME</a>
                                </li>
                                <li>
                                    <a href="partners"
                                        role="button" aria-expanded="false" title="PARTNERS">PARTNERS</a>
                                </li>
                                <li>
                                    <a href="ourwork/index.html"
                                        role="button" aria-expanded="false" title="COVID Work">COVID WORK</a>
                                </li>

                                <li>
                                    <a href="/covid19/index"
                                        role="button" aria-expanded="false" title="COVID Dashboard">COVID DASHBOARD</a>
                                </li>
                                <li>
                                    <a href="news"
                                        role="button" aria-expanded="false" title="News">NEWS</a>
                                </li>
                                <li className="last"><a href="contact" className="contact" title="Contact">CONTACT</a></li>
                                <li className="last"><a href="https://rzp.io/l/lbtcdonate4needy" className="contact" title="Donate">DONATE</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default MenuBar;