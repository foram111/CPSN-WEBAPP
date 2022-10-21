import React from 'react'
import './footer.css'
import Logo from '../../images/CPSN.png'
// import Insta from '../../images/instagram.png'
// import FB from '../../images/facebook.png'
// import GIT from '../../images/github.png'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer()
{
    return(
        <>
        <div className='Footer'>
            <div className='Logo'>
                <img src={Logo} alt="Logo" width={100}></img>
            </div>
            <div className='description-Footer'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ex illum minima necessitatibus enim. Modi quod facere qui natus placeat inventore, fugiat, excepturi tenetur alias sed minus culpa, optio quas!
            </div>
            <div className='socialmedia'>
                {/* <img src={Insta} alt='Logo' width={30} className="Insta"/>
                <img src={FB} alt='Logo' width={30} className="FB"/>
                <img src={GIT} alt='Logo' width={30} className="GIT"/> */}
                {/* <FontAwesomeIcon icon="fa-brands fa-facebook-square" /> */}

            </div>
        </div>
        </>
    )

}
 export default Footer