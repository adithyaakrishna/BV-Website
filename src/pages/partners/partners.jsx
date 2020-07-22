import React from 'react';
import Header from '../../components/header/header';
import MenuBar from '../../components/menubar/menubar';
import Footer from '../../components/footer/footer';

function Partners() {
  return (
<div className="App">
    
    <Header></Header> {/* Header Component */}

    <MenuBar></MenuBar> {/* Menu Bar Component */}

    <div className="banner">
        <div className="shadow-main">
            <h1>Partners</h1>
            <ul className="breadcrumb breadcrumb-news">
                <li><a href="index">HOME</a></li>
                <li><a href="partners">PARTNERS</a></li>
            </ul>
        </div>
    </div>
    <div className="main-gallery">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <ul className="tabs">
                        <li className="active"><a href="#top1">Our Supporters</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://www.nsrcel.org/" target="_blank" rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Oursupporters/1.png')} alt="gallery4" />
                        </a>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="#top" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Oursupporters/2.png')} alt="gallery5" />
                        </a>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="#top" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Oursupporters/3.png')} alt="gallery6" />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-12">
                    <ul className="tabs">
                        <li className="active"><a href="#top">Implementation Partners</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://www.smitam.org/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/1.png')} alt="gallery4" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://www.potholeraja.com/" target="_blank"rel="noopener noreferrer" className="img-link" >
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/2.png')} alt="gallery5" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="http://wayforlife.org/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/3.png')} alt="gallery6" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://reapbenefit.org/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/4.png')} alt="gallery7" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="http://www.janaagraha.org/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/5.png')} alt="gallery4" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://www.ivolunteer.in/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/6.png')} alt="gallery5" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://www.ichangemycity.com/bangalore/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/7.png')} alt="gallery6" />
                        </a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        <a href="https://goodera.com/us/" target="_blank"rel="noopener noreferrer" className="img-link">
                            
                                  <img src={require('../../assets/sponsors/Implementationpartners/8.png')} alt="gallery7" />
                        </a>
                    </div>
                </div>
            </div>
         
            <div className="row">
                <div className="col-lg-12">
                    <ul className="tabs">
                        <li className="active"><a href="#top1">Volunteering Partners</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                    
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/1.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
           
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/2.png')} alt="gallery5" />
                
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/3.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                       
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/4.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                       
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/5.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/6.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/7.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/8.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/9.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/10.png')} alt="gallery5" />
                       
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/11.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/12.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/13.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/14.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/15.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/16.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/17.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/18.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/19.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/20.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/21.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/22.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/23.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/24.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div><div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/25.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/26.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/27.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/28.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/29.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/30.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/31.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/32.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/33.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/34.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/35.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/36.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/37.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/38.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/39.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/40.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/41.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/42.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/43.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/44.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/45.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/46.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/47.png')} alt="gallery6" />
                        
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Volunteeringpartners/48.png')} alt="gallery7" />
                        
                    </div>
                </div>
            </div>
            
           
            <div className="row">
                <div className="col-lg-12">
                    <ul className="tabs">
                        <li className="active"><a href="#top">Promotional Partners</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Promopartners/1.png')} alt="gallery4" />
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                        
                            
                              <img src={require('../../assets/sponsors/Promopartners/2.png')} alt="gallery5" />
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                              <img src={require('../../assets/sponsors/Promopartners/3.png')} alt="gallery6" />
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                              <img src={require('../../assets/sponsors/Promopartners/4.png')} alt="gallery7" />
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                              <img src={require('../../assets/sponsors/Promopartners/5.png')} alt="gallery6" />
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 mb-gallery ">
                    <div className="photo-gallery">
                              <img src={require('../../assets/sponsors/Promopartners/6.png')} alt="gallery7" />
                    </div>
                </div>
            </div>
    </div>
</div>

<Footer></Footer> {/* Footer Component */}
    
</div>

   );
}

export default Partners;
