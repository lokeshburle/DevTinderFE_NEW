import React from 'react'

const UserCard = ({user}) => {
    console.log("USER", user)
  return (
    <div>
    <div className="card bg-base-300 w-96 shadow-xl">
    <figure>
      <img
        src={user?.photoUrl}
        alt={user?.about} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{user.firstName}</h2>
      {user.age && user.gender && <p>{user?.age + " "+user.gender}</p>}
      <p>{user?.about}</p>
      <div className="card-actions justify-center my-4">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default UserCard