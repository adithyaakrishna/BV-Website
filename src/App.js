import React from 'react';
import './App.css';


function App() {
  return (
    <div  classNameName="App">
    <div id="header">
      <header  className="header-block black">
	<div  className="container">
		<div  className="row">
			<div  className="col-lg-8 col-sm-8 col-xs-12 lh">
				<p>Welcome to Bengaluru Veeraru! <i  className="fa fa-phone" aria-hidden="true"></i><a href="tel:9353218818"> 9353218818 </a><i  className="fa fa-envelope" aria-hidden="true"></i>
					<a href="mailto:contactus@bengaluruveeraru.org"> contactus@bengaluruveeraru.org</a>
				</p>
			</div>
			<div  className="col-md-4 col-sm-4 col-xs-12 login lh">
				<p>Collaborative Initiative By Like Minded NGOs</p>
			</div>
		</div>
	</div>
</header>
</div>
<div  className="menuBar menu-bar-charity">
	<nav  className="navbar navbar-default ">
		<div  className="container p0">
			<div  className="navbar-header">
				<div  classNameName="logo">
					<img href="index"  className="navbar-brand"/>
						<img src= {require('./assets/images/logo.png')} alt="Homepage logo" />
				</div>
				<button type="button"  className="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#navbar-menu">
					<i  className="fa fa-bars" aria-hidden="true"></i>
				</button>
			</div>
			<div  className="navbar-right">
				<div id="navbar-menu"  className="collapse navbar-collapse ">
					<ul  className="nav navbar-nav" data-in="fadeInDown" data-out="fadeOutUp">
						<li  className="dropdown">
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
						<li  className="last"><a href="contact"  className="contact" title="Contact">CONTACT</a></li>
						<li  className="last"><a href="https://rzp.io/l/lbtcdonate4needy"  className="contact" title="Donate">DONATE</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</div>

    <div  className="slider">
        <div id="home-carousel"  className="carousel" data-ride="carousel">
            <div  className="carousel-inner" role="listbox">
                <div  className="item active slide_1">
                    <div  className="container p0">
                        <div  className="item-content">
                            <div  className="gb-middle ">
                                <div  className="slider-info ">
                                    <h3><b>Bengaluru Veeraru</b></h3>
                                    <h4>#FightCOVID19</h4>
                                    <h3>Bengaluru Veeraru<br></br> Stands to fight COVID-19</h3>
                                    <div  className="buttons">
                                        <a href="ourwork/index.html"  className="red-btn red-btn-0">COVID WORK</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  className="item slide_2 ">
                    <div  className="container p0">
                        <div  className="item-content">
                            <div  className="gb-middle ">
                                <div  className="slider-info ">
                                    <h3>Bengaluru Veeraru</h3>
                                    <h4>#iamaveera</h4>
                                    <h3>Let's take the first step towards <br></br> solving our community problems</h3>
                                    <div  className="buttons">
                                        <a href="https://form.jotform.com/letsbethechange.india/bv-volunteers"  className="red-btn red-btn-0">Become a Veera</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div  className="item slide_3 ">
                    <div  className="container p0">
                        <div  className="item-content">
                            <div  className="gb-middle">
                                <div  className="slider-info">
                                    <h3>Bengaluru Veeraru</h3>
                                    <h2>For a Better Bengaluru</h2>
                                    <div  className="buttons">
                                        <a href="https://form.jotform.com/letsbethechange.india/bv-volunteers"  className="red-btn red-btn-0">Become a Veera</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    <div  className="main-container-1">
        <div  className="container">
            <div  className="row">
                <div  className="col-md-6 col-sm-6 col-xs-12">
                    <div>
                        <p><img src={require('./assets/images/aboutbkgnd.jpg')} alt="woman-gir/l"></img></p>
                    </div>
                </div>
                <div  className="col-md-6 col-sm-6 col-xs-12">
                    <div  className="container-text">
                        <h2  className="title-text">About Bengaluru Veeraru: </h2>
                        <div  className="wave-line"></div>
                        <p  className="paragraph">
                            BV is a platform to all "Clean Bengaluru" visioned non-profit organisations to solve their community problems. 
                            It runs on the combined effort of organisations and residents of Bengaluru. 
                            BV enables, empowers and enlightens citizens to come together with all stakeholders to report and solve problems. 
                            This hand-holding and step-by-step solution makes them realise that they are capable of bringing the CHANGE that they want to see - "Bengaluru Veeraru"
                        </p>

                        <div  className="buttons">
                            <a href="contact"  className=" red-btn red-btn-1">Contact With Us</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div  className="main-container-2 grey">
        <div  className="container">
            <div  className="row">
                <div  className="col-md-3 col-sm-3 col-xs-12 text-center">
                    <div  className="images">
                        <p><img src={require('./assets/images/heart.png')} alt="heart"/></p>
                    </div>
                    <div  className="images-text">
                        <h2><a href="https://form.jotform.com/letsbethechange.india/bv-volunteers">Register as Volunteer</a></h2>
                    </div>
                </div>
                <div  className="col-md-3 col-sm-3 col-xs-12 text-center mb">
                    <div  className="images">
                        <p><img src={require('./assets/images/ngo.png')} alt="circle"/></p>
                    </div>
                    <div  className="images-text">
                        <h2><a href="#">Register an NGO</a></h2>
                    </div>
                </div>
                <div  className="col-md-3 col-sm-3 col-xs-12 text-center">
                    <div  className="images">
                        <p><img src={require('./assets/images/problem.png')} alt="heart"/></p>
                    </div>
                    <div  className="images-text">
                        <h2><a href="#">Report a Problem</a></h2>
                    </div>
                </div>
                <div  className="col-md-3 col-sm-3 col-xs-12 text-center">
                    <div  className="images">
                        <p><img src={require('./assets/images/donate.png')} alt="heart"/></p>
                    </div>
                    <div  className="images-text">
                        <h2><a href="https://rzp.io/l/lbtcdonate4needy">Donate</a></h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div  className="number" id="counts">
        <div  className="container">
            <div  className="row">
                <div  className="col-md-4 col-sm-4 col-xs-12 mb center text-center mb">
                    <div  className="text">
                        <p>
                            <span  className="spincrement">80</span>+
                            <span  className="text-1"> NGOs </span>
                        </p>
                    </div>
                </div>
                <div  className="col-md-4 col-sm-4 col-xs-12 mb center text-center mb">
                    <div  className="text">
                        <p>
                            <span  className="spincrement">250</span>+
                            <span  className="text-1"> Civic Issues Solved </span>
                        </p>
                    </div>
                </div>
                <div  className="col-md-4 col-sm-4 col-xs-12 mb center text-center mb">
                    <div  className="text">
                        <p>
                            <span  className="spincrement ml">1500</span>+
                            <span  className="text-1"> Volunteers </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div  className="container-fluid black main-container-5">
        <div  className="row">
            <div  className="col-md-6 col-sm-12 col-xs-12">
                <div  className="content-1 pull-right">
                    <h2  className="title-text">Become a Certified Veera</h2>
                    <div  className="wave-line"></div>
                    <p>
                        BV is a platform to all "Clean Bengaluru" visioned non-profit organisations to solve their community problems. 
                        It runs on the combined effort of organisations and residents of Bengaluru. 
                        BV enables, empowers and enlightens citizens to come together with all stakeholders to report and solve problems. 
                        This hand-holding and step-by-step solution makes them realise that they are capable of bringing the CHANGE that they want to see - "Bengaluru Veeraru"
                    </p>
                    <div  className="buttons">
                        <a href="https://form.jotform.com/letsbethechange.india/bv-volunteers"  className="red-btn red-btn-5">Join Us Now</a>
                    </div>
                </div>
            </div>
            <div  className="col-md-6 col-sm-12 col-xs-12 pos-ab">
                <div  className="offset-image-1">
                    <div  className="shadow-r"></div>
                </div>
            </div>
        </div>
    </div>

    
    <div  className="main-container-7">
        <div  className="container">

            <div  className="row">
                <div  className="col-md-12 col-sm-12 col-xs-12">
                    <div  className="text-center">
                        <h2  className="title-text">Latest News</h2>
                        <div  className="wave-line wave-center"></div>
                        <p  className="paragraph-white"> News  About  Our  Latest  Events </p>
                    </div>
                </div>
            </div>

            <div  className="row">
                <div  className="col-lg-6 col-md-6 col-sm-6 mb ">
                    <div  className="person-card">
                        <div  className="person-img">
                            <a href="bvcertification"  className="img-link">
                                <img src={require('./assets/images/nm1.png')} alt="boy"/>
                            </a>
                        </div>
                        <div  className="person-content">
                            <h2><a href="bvcertification"  className="title-white">BV Certification Program</a></h2>
                            <ul  className="gb-list">
                                <li>
                                    <a href="#"> May 01, 2020 </a>
                                </li>
                                
                            </ul>
                            <p>The Bengaluru Veeraru(BV) Certification Program is a course that follows a time period of three months, wherein you ...</p>
                        </div>
                    </div>
                    <div  className="buttons">
                        <a href="bvcertification"  className="red-btn red-btn-news">Read More</a>
                    </div>
                </div>

                <div  className="col-lg-6 col-md-6 col-sm-6 mb">
                    <div  className="person-card">
                        <div  className="person-img">
                            <a href="bvabout"  className="img-link">
                                <img src={require('./assets/images/nm2.png')} alt="boy"/>
                            </a>
                        </div>
                        <div  className="person-content">
                            <h2><a href="bvabout"  className="title-white">ABOUT BENGALURU VEERARU </a></h2>
                            <ul  className="gb-list">
                                <li>
                                    <a href="#"> May 01, 2020 </a>
                                </li>
                            </ul>
                            <p>Bengaluru Veeraru (BV) is a platform designed to implement solutions for community problems by empowering citizens of ...</p>
                        </div>
                    </div>
                    <div  className="buttons">
                        <a href="bvabout"  className="red-btn red-btn-news">Read More</a>
                    </div>

                </div>
            </div>
            <div  className="row rowspace">
                <div  className="col-lg-6 col-md-6 col-sm-6 mb ">
                    <div  className="person-card">
                        <div  className="person-img">
                            <a href="bvnews3"  className="img-link">
                                <img src={require('./assets/images/nm3.png')} alt="boy"/>
                            </a>
                        </div>
                        <div  className="person-content">
                            <h2><a href="bvnews3"  className="title-white">BV – BRIDGING CHANGEMAKERS AND THE GOVERNMENT</a></h2>
                                        <ul  className="gb-list">
                                            <li>
                                                <a href="#"> January 01, 2020 </a>
                                            </li>
                                            <li>
                                                <a href="#"><i  className="icon-heart" aria-hidden="true"></i>45</a>
                                            </li>
                                            <li>
                                                <a href="#"><i  className="icon-eye" aria-hidden="true"></i>378</a>
                                            </li>
                                        </ul>
                                        <p>BV is on the verge of creating a system which will build end-to-end solutions for many community problems. We are measuring the  ...</p>
                        </div>
                    </div>
                    <div  className="buttons">
                        <a href="bvnews3"  className="red-btn red-btn-news">Read More</a>
                    </div>
                </div>
                <div  className="col-lg-6 col-md-6 col-sm-6 mb ">
                    <div  className="person-card">
                        <div  className="person-img">
                            <a href="bvnews3"  className="img-link">
                                <img src={require('./assets/images/nm4.png')} alt="boy"/>
                            </a>
                        </div>
                        <div  className="person-content">
                            <h2><a href="bvnews3"  className="title-white">Bengaluru Veeraru stands to #FightCOVID19</a></h2>
                                        <ul  className="gb-list">
                                            <li>
                                                <a href="#"> May 10, 2020 </a>
                                            </li>
                                             
                                            <li>
                                                <a href="#"><i  className="icon-heart" aria-hidden="true"></i>
                                                    45</a>
                                            </li>
                                            <li>
                                                <a href="#"><i  className="icon-eye" aria-hidden="true"></i>
                                                    378</a>
                                            </li>
                                        </ul>
                                        <p>ngaluru Veeraru team hosted a internal discussion with the officials of BBMP & Bengaluru City Police to understand all the ground challenges  ...</p>
                        </div>
                    </div>
                    <div  className="buttons">
                        <a href="bvcovid"  className="red-btn red-btn-news">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div  className="photo-container">
        <div  className="container-fluid photo">
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B42Cxx9FaJT/" target="_blank"><img src="assets/images/b1.jpg" alt=""  className="img-small"/></a>            </div>
            <div  className="photo-link">                
                <a href="https://www.instagram.com/p/B_Fj3PSFMX6/" target="_blank"><img src="assets/images/b2.png" alt=""  className="img-small"/></a>
            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B3MAmAqFKeE/" target="_blank"><img src="assets/images/b3.jpg" alt=""  className="img-small"/></a>            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B3FKXewlZnJ/" target="_blank"><img src="assets/images/b4.png" alt=""  className="img-small"/></a>            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B3HET8VltHA/" target="_blank"><img src="assets/images/b5.png" alt=""  className="img-small"/></a>
            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B3HFtVdlpv4/" target="_blank"><img src="assets/images/b6.png" alt=""  className="img-small"/></a>
            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B3HEufDl0d_/" target="_blank"><img src="assets/images/b7.png" alt=""  className="img-small"/></a>            </div>
            <div  className="photo-link">
                <a href="https://www.instagram.com/p/B_aZ18HlbZX/" target="_blank"><img src="assets/images/b8.png" alt=""  className="img-small"/></a>            </div>
        </div>
    </div>
</div>
   );
}

export default App;
