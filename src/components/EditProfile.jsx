import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import Alert from './Alert';

const EditProfile = ({user}) => {
    console.log("user", user)
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSaveProfile = async () => {
        try {
            const res = await axios.patch(
              BASE_URL + "/profile/edit",
              {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              },
              { withCredentials: true,  headers: { "Content-Type": "application/json" } }
            );
          
          console.log("Profile Update Response:", res);
          if (res.status === 200) {
            setShowAlert(true); 
        
            setTimeout(() => {
                setShowAlert(false); 
            }, 2000);
        }
          dispatch(addUser(res?.data?.data));
        } catch (err) {
          console.error("Profile Update Error:", err);
          setError(err.response?.data?.error || "Something went wrong.");
        }
      };
      
  return (
    <>
    
    <div className='flex justify-center my-10'>
    <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 w-96 shadow-xl ">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
        <div className=''>
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">first Name</span>
         
        </div>
        <input type="text" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">Last Name</span>
         
        </div>
        <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">age</span>
         
        </div>
        
        <input type="text" className="input input-bordered w-full max-w-xs" value={age} onChange={(e)=>setAge(e.target.value)}/>
        
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">gender</span>
         
        </div>
        <input type="text" className="input input-bordered w-full max-w-xs" value={gender} onChange={(e)=>setGender(e.target.value)}/>
        
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">photo URL</span>
         
        </div>
        <input type="text" className="input input-bordered w-full max-w-xs" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>
        
      </label>
      <label className="form-control w-full max-w-xs my-2">
      <div className="label">
        <span className="label-text">about</span>
       
      </div>
      <input type="text" className="input input-bordered w-full max-w-xs" value={about} onChange={(e)=>setAbout(e.target.value)}/>
      
    </label>
        </div>
        <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleSaveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName, lastName, age, photoUrl, gender, about}}/>
    </div>
    {showAlert &&<div className="toast toast-top toast-center">
        
        <div className="alert alert-success">
          <span>Profile Saved Successfully.</span>
        </div>
      </div>}
    </>
  )
}

export default EditProfile