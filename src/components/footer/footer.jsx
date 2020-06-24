import React from 'react';
import Author from '../author/author';
import ContactusFooter from '../contactus_footer/contactusfooter';

function Footer(){
    return(
        <div className='App'>
        <footer className="black">
            <div className="footer-container">
                <div className="container">
                    <div className="row">
                        <div className="footer-content">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb">
                                <div className="footer-about-info">
                                    <h4> About Us </h4>
                                    <p> BV is a platform to all "Clean Bengaluru" visioned non-profit organisations to solve their community problems.
                                    It runs on the combined effort of organisations and residents of Bengaluru.
                                    BV enables, empowers and enlightens citizens to come together with all stakeholders to report and solve problems. </p>
                                    <ul>
                                        <li><i className="icon-location-1"></i>
                                            <span>Bengaluru, Karnataka, India</span></li>
                                        <li><i className="icon-phone"></i>
                                            <span>Phone : <a href="tel:9353218818" style={{ color: 'red' }}>9353218818</a></span></li>
                                        <li><i className="icon-mail"></i>
                                            <span>Email : <a href="mailto:contactus@bengaluruveeraru.org" style={{ color: 'red' }}>contactus@bengaluruveeraru.org</a></span></li>
                                    </ul>
                                </div>
                                <div className="social-link footer-social-link">
                                    <ul>
                                        <li><a href="https://twitter.com/blr_veeraru" target="_blank"rel="noopener noreferrer" className="circle c-1"><i
                                            className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com/bengaluruveeraru/" target="_blank"rel="noopener noreferrer" className="circle c-2"><i
                                            className="fa fa-facebook"></i></a></li>
                                        <li><a href="https://instagram.com/bengaluru_veeraru" target="_blank"rel="noopener noreferrer" className="circle c-3"><i
                                            className="fa fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb">
                                <h4> Recent Posts </h4>
                                <div className="news-1">
                                    <a href="bvcertification">
                                        <img src={require('../../assets/images/othersn1.png')} alt="Img1" />
                                    </a>
                                    <div className="news">
                                        <h5 className="news-h"><a href="bvcertification">BV - Certification Program</a> </h5>
                                        <p className="date">May 01, 2020</p>
                                    </div>
                                </div>
                                <div className="news-2">
                                    <a href="bvabout">
                                        <img src={require('../../assets/images/othersn.png')} alt="Img2" />
                                    </a>
                                    <div className="news">
                                        <h5 className="news-h"><a href="bvabout">BV - About</a> </h5>
                                        <p className="date">October 19, 2019</p>
                                    </div>
                                </div>
                                <div className="news-3">
                                    <a href="bvnews3">
                                        <img src={require('../../assets/images/othersn2.png')} alt="Img3" />
                                    </a>
                                    <div className="news">
                                        <h5 className="news-h"><a href="bvnews3">BV–BRIDGING CHANGEMAKERS AND THE GOVERNMENT</a> </h5>
                                        <p className="date">January 01, 2020</p>
                                    </div>
                                </div>
                            </div>
                            
                            <ContactusFooter></ContactusFooter> {/* Contact Us Form Component */}

                        </div>
                    </div>
                </div>

                <div className="back-to-top">
                    <a className="top top-page" href="#top"> <i className="icon-up-open-big"></i></a>
                </div>

                <div className="back-to-top-mob">
                    <a className="top top-mob" href="#top"> <i className="icon-up-open-big"></i></a>
                </div>
            </div>
            <div id="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p className="copy-title">Copyright &copy; 2020 Bengaluru Veeraru</p>
                        </div>
                    </div>
                    
                    <Author></Author> {/* Website Author Component */}

                </div>
            </div>
        </footer>
        </div>

    )
}

export default Footer;