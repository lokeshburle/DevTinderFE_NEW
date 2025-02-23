import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);

    // const [userRequests, setUserRequests] = useState([]);

    const handleReviewRequests = async(status, _id) => {
        try{  
            console.log(`Requesting: ${BASE_URL}/request/review/${status}/${_id}`);  
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials:true});
            console.log("RES", res)
        }catch(err){
            console.log(err);
        }
    }

    const allRequests = [
        {
            "isPremium": false,
            "_id": "67a9cbc2a255ec9251afddf5",
            "firstName": "Ravali",
            "lastName": "laksmi",
            "emailId": "ravali123@gmail.com",
            "password": "$2b$10$fmVZoPWbxer4mcT5mXzrD.u8KIC1J4f.mJWBFJxtqMDg50k6BosKO",
            "photoUrl": "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
            "about": "this is the default about of the user",
            "skills": [],
            "__v": 0,
            "age": 24,
            "gender": "female",
            "updatedAt": "2025-02-23T04:01:46.503Z"
        },
        {
            "isPremium": false,
            "_id": "67a9cbc2a255ec9251afddf6",
            "firstName": "lokesh",
            "lastName": "burle",
            "emailId": "lokesh123@gmail.com",
            "password": "$2b$10$fmVZoPWbxer4mcT5mXzrD.u8KIC1J4f.mJWBFJxtqMDg50k6BosKO",
            "photoUrl": "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
            "about": "this is the default about of the user",
            "skills": [],
            "__v": 0,
            "age": 24,
            "gender": "male",
            "updatedAt": "2025-02-23T04:01:46.503Z"
        },
        {
            "isPremium": false,
            "_id": "67a9cbc2a255ec9251afddf7",
            "firstName": "Jay ",
            "lastName": "darshan",
            "emailId": "jay123@gmail.com",
            "password": "$2b$10$fmVZoPWbxer4mcT5mXzrD.u8KIC1J4f.mJWBFJxtqMDg50k6BosKO",
            "photoUrl": "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
            "about": "this is the default about of the user",
            "skills": [],
            "__v": 0,
            "age": 26,
            "gender": "male",
            "updatedAt": "2025-02-23T04:01:46.503Z"
        },
        {
            "isPremium": false,
            "_id": "67a9cbc2a255ec9251afddf8",
            "firstName": "jyothi",
            "lastName": "jjjj",
            "emailId": "jyothi123@gmail.com",
            "password": "$2b$10$fmVZoPWbxer4mcT5mXzrD.u8KIC1J4f.mJWBFJxtqMDg50k6BosKO",
            "photoUrl": "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
            "about": "this is the default about of the user",
            "skills": [],
            "__v": 0,
            "age": 25,
            "gender": "female",
            "updatedAt": "2025-02-23T04:01:46.503Z"
        }
    
    ];


    const getRequest = async()=> {
        try{
            const result = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
            console.log(result)
            dispatch(addRequests(allRequests));
        }catch(err){
            console.log(err);
        }
    }
useEffect(()=>{
    getRequest();
},[]);

if(!requests) return;

if(requests.length == 0) return  <h1>No Requests Found</h1>

  return (
    <div className=' text-center my-10'>
        <h1 className='text-bold text-3xl text-white'>Requests</h1>
        {
            requests.map((request)=>{
                const {firstName, lastName, photoUrl, age, gender, about, _id} = request;
                console.log("_id", _id)
                return(
                    <div className='flex m-4 p-4 border items-center  rounded-lg border-base-300 w-1/2 mx-auto'>
                        <div>
                            <img alt="photo url" src={photoUrl} className='w-20 h-20 rounded-full mr-4' />
                        </div>
                        <div className='text-left mx-4'>

                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                            <p>{age + " " + gender}</p>
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className='btn btn-primary mx-2' onClick={()=>handleReviewRequests('rejected', _id)}>Reject</button>
                            <button className='btn btn-secondary mx-2' onClick={()=>handleReviewRequests('accepted', _id)}>Accept</button>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Requests