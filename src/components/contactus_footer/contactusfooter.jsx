import React from 'react';
function ContactusFooter(){
    return(
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb">
            <h4> Contact Us </h4>
            <form method="post" action="contactus.php">
                <div className="form-group">
                    <input id="first_name" name="name" type="text" placeholder="Name"
                        className="form-control" required="" />
                </div>
                <div className="form-group">
                    <input id="email" name="email" type="email" placeholder="E-mail"
                        className="form-control" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                </div>
                <div className="form-group">
                    <textarea name="message" className="form-control" rows="4" placeholder="Message..."></textarea>
                </div>
                <div className="form-group buttons ">
                    <input type="submit" className="red-btn red-btn-form" value="Send Message" />
                </div>
            </form>
        </div>
    )
}
export default ContactusFooter;