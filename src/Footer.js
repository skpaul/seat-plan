import React from 'react';
import TeletalkLogo from "./teletalk-logo.png";

export default function Footer(){
    return(
        <>
            <div className="copyright">
            ©2020 Teletalk
               </div>
            <div className="powered-by">
                Powered By:
                   <a href="http://www.teletalk.com.bd/" target="_blank">
                    <img className="logo" alt="teletalk Logo" title="Powered By: Teletalk" src={TeletalkLogo} />
                </a>
            </div>
        </>
        
    );
}