import React from  'react';
function Author(){
    return(
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> Website By <a href="https://thedevilx.github.io/" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}><b><img src={require('../../assets/images/Adithya.png')} alt="" /></b></a></div>
        </div>
    )
}

export default Author;