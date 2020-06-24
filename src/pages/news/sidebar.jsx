import React from 'react';

function SideBar(){
    return(

        <div class="col-lg-4 col-md-5 col-sm-6 right-post">
            <div id="sidebar">
                <div class="sidebar black ">
		            <div class="categories">
                        <h4 >Menu</h4>
                        <ul>
                            <li><a href="index">Home</a></li>
                            <li><a href="bvabout">About</a></li>
                            <li><a href="covid19/index">Covid-19</a></li>
                            <li><a href="https://form.jotform.com/letsbethechange.india/bv-volunteers">Volunteer Sign Up</a></li>
                            <li><a href="partners">Partners</a></li>
                        </ul>
                    </div>
		            <div class="search">
                        <form class="form-search" action="//google.com.ua/search" target="_blank"
                            method="get" onsubmit="return q.value!=''" role="search">
                            <label>Search</label>
                            <input type="search" name="q" placeholder="Search..." />
                                <button type="submit"><i class="fa fa-search"></i></button>
			            </form>
		            </div>
                    <div class="recent-posts mb">
                        <h4> Recent Posts </h4>
                        <div class="news-1">
                            <a href="bvcertification"><img src={require('../../assets/images/othersn1.png')} alt="..." /></a>
                                <div class="news">
                                    <h5 class="news-h"><a href="bvcertification">BV - Certification Program</a> </h5>
                                    <p class="date">May 01, 2020</p>
                                </div>
			            </div>
                        <div class="news-2">
                            <a href="bvabout"><img src={require('../../assets/images/othersn.png')} alt="..." /></a>
                                <div class="news">
                                    <h5 class="news-h"><a href="bvabout">BV - About</a> </h5>
                                    <p class="date">October 19, 2019</p>
                                </div>
                        </div>
                        <div class="news-3">
                            <a href="bvnews3"><img src={require('../../assets/images/othersn2.png')} alt="..." /></a>
                                <div class="news">
                                    <h5 class="news-h"><a href="bvnews3">BV – BRIDGING CHANGEMAKERS AND THE GOVERNMENT</a> </h5>
                                    <p class="date">January 01, 2020</p>
                                </div>
			            </div>
                    </div>
                    <div class="tags">
                        <h4>Tags</h4>
                        <ul>
                            <li class="active buttons"><a href="bvcertification" class="tags-btn">BV - Certification</a></li>
                            <li class="buttons"><a href="bvabout" class="tags-btn">About</a></li>
                            <li class="buttons"><a href="bvnews3" class="tags-btn">BV - Bringing Changes</a></li>
                        </ul>
                    </div>
		            <div class="photo-container instagram">
                        <h4>Instagram</h4>
                        <div class="photo-inst">
                        <div class="photo-link">
                                <a href="https://www.instagram.com/p/B_Fj3PSFMX6/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n1.png')} alt="" class="img-small" /></a>
				        </div>
                        <div class="photo-link ">
                                <a href="https://www.instagram.com/p/B_aZ18HlbZX/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n2.png')} alt="" class="img-small" /></a>
				        </div>
                        <div class="photo-link">
                                <a href="https://www.instagram.com/p/B-2HTvqFPf9/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n3.png')} alt="" class="img-small" /></a>
				        </div>
                        <div class="photo-link">
                                <a href="https://www.instagram.com/p/B-hZ3zSlYRm/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n4.png')} alt="" class="img-small" /></a>
				        </div>
                        <div class="photo-link ">
                                <a href="https://www.instagram.com/p/B-uT-_DFaxd/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n5.png')} alt="" class="img-small" /></a>
				        </div>
                        <div class="photo-link">
                                <a href="https://www.instagram.com/p/B-w2sXpFxwe/" class="img-link"><span><i class="icon-eye" aria-hidden="true"></i></span><img src={require('../../assets/images/n6.png')} alt="" class="img-small" /></a>
				        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div> 
    )
}

export default SideBar;