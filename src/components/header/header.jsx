import React from 'react';

function Header() {
    return (

        <div id="header">
            <header className="header-block black">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-sm-8 col-xs-12 lh">
                            <p >Welcome to Bengaluru Veeraru! {'\u00A0'} <i className="fa fa-phone" aria-hidden="true"></i>{'\u00A0'}<a href="tel:9353218818" style={{ color: 'red' }}> 9353218818 </a> {'\u00A0'}<i className="fa fa-envelope" aria-hidden="true"></i>
                                <a href="mailto:contactus@bengaluruveeraru.org" style={{ color: 'red' }}> {'\u00A0'} contactus@bengaluruveeraru.org</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 login lh">
                            <p>Collaborative Initiative By Like Minded NGOs</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Header;