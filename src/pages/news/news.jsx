import React from 'react';
import Header from '../../components/header/header';
import MenuBar from '../../components/menubar/menubar';
import Footer from '../../components/footer/footer';
import SideBar from './sidebar';

function News(){
    return(
        <div className="App">

        
        <Header></Header>  {/* Header Component */}
        
        <MenuBar></MenuBar> {/* Menu Bar Component */}
        
        <div class="banner">
            <div class="shadow-main">
                <h1> Our News </h1>
                <ul class="breadcrumb breadcrumb-news">
                    <li><a href="index">HOME</a></li>
                    <li><a href="news">OUR NEWS</a></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-7 col-sm-6 ">
                    <div class="main-news main-news-2-columns">
                        <div class="news-inner">
                            <div class="post-cont" >  
                            <div class="col-md-6">
                                    <div class="post photo-post">
                                        <div class="person-card">
                                            <div class="person-img">
                                                    <a href="bvnews3" class="img-link"><img src={require('../../assets/images/nm4.png')} alt="boy" /></a>
                                        </div>
                                                <div class="person-content">
                                                    <h2><a href="bvnews3" class="title-white"> Bengaluru Veeraru stands to #FightCOVID19</a></h2>
                                                    <ul class="gb-list">
                                                        <li><a href="#top"> May 10, 2020 </a></li>
                                                    </ul>
                                                    <p> Bengaluru Veeraru team hosted a internal discussion with the officials of BBMP & Bengaluru City Police to understand all the ground challenges  ...</p>
                                                </div>
                                            </div>
                                            <div class="buttons">
                                                <a href="bvcovid" class="red-btn red-btn-news">Read More</a>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="col-md-6">
                                        <div class="post photo-post">
                                            <div class="person-card">
                                                <div class="person-img">
                                                    <a href="bvcertification" class="img-link"><img src={require('../../assets/images/nm1.png')} alt="boy" /> </a>
                                                </div>
                                                <div class="person-content">
                                                    <h2><a href="bvcertification" class="title-white">Bengaluru Veeraru Certification Program</a></h2>
                                                        <ul class="gb-list">
                                                            <li><a href="#top"> May 01, 2020 </a></li>
                                                        </ul>
                                                        <p>The Bengaluru Veeraru(BV) Certification Program is a course that follows a time period of three months, wherein you ...</p>
                                                    </div>
                                                </div>
                                                <div class="buttons">
                                                    <a href="bvcertification" class="red-btn red-btn-news">Read More</a>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="post photo-post">
                                            <div class="person-card">
                                                <div class="person-img">
                                                <a href="bvabout" class="img-link"><img src={require('../../assets/images/nm2.png')} alt="boy" /></a>
                                                </div>
                                                <div class="person-content">
                                                        <h2><a href="bvabout" class="title-white">ABOUT BENGALURU VEERARU </a></h2>
                                                        <ul class="gb-list">
                                                            <li>
                                                                <a href="#top"> May 01, 2020 </a>
                                                            </li>
                                                        </ul>
                                                        <p>Bengaluru Veeraru (BV) is a platform designed to implement solutions for community problems by empowering citizens of ...</p>
                                                    </div>
                                                </div>
                                                <div class="buttons">
                                                    <a href="bvabout" class="red-btn red-btn-news">Read More</a>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="col-md-6">
                                            <div class="post photo-post">
                                                <div class="person-card">
                                                    <div class="person-img">
                                                <a href="bvnews3" class="img-link"><img src={require('../../assets/images/nm3.png')} alt="boy" /></a>
                                                    </div>
                                                    <div class="person-content">
                                                            <h2><a href="bvnews3" class="title-white">BV – BRIDGING CHANGEMAKERS AND THE GOVERNMENT</a></h2>
                                                            <ul class="gb-list">
                                                                <li>
                                                                    <a href="#top"> January 01, 2020 </a>
                                                                </li>
                                                            </ul>
                                                            <p>BV is on the verge of creating a system which will build end-to-end solutions for many community problems. We are measuring the  ...</p>
                                                        </div>
                                                    </div>
                                                    <div class="buttons">
                                                        <a href="bvnews3" class="red-btn red-btn-news">Read More</a>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div> 
                                </div>

            <SideBar></SideBar> {/* Side Bar Component */}

        </div>
        </div> 

        <Footer></Footer> {/* Footer Component */}

        </div>
    )
}

export default News;