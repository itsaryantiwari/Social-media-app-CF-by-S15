import React, { useRef, useState } from 'react'
import './Navbar.scss'
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router'
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

// function toggleLoadingBar() {
//   dispatch(setLoading(true));
// }

async function handleLogoutClicked() {
try {
 await axiosClient.post('/auth/logout');
 removeItem(KEY_ACCESS_TOKEN);
 navigate('/login')
} catch (e) {

 }
}

  return (
    <div className='Navbar'>
        <div className="container">
            <h2 className='banner hover-link' onClick={() => navigate('/')}>Social Media</h2>
            <div className="right-side">
             <div className="profile hover-link"onClick={() => navigate(`/profile/${myProfile?._id}`)}>
             <Avatar src={myProfile?.avatar?.url}/>
             </div>
            <div className="logout hover-link" onClick={handleLogoutClicked}>
          <AiOutlineLogout />
         </div>
            </div>
        </div>
    </div>
  );
}

export default Navbar;