export const Profile=({auth})=>{
    return(
      <>
      <p>{auth.currentUser.displayName}</p>
      <p>{auth.currentUser.email}</p>
      <img src={auth.currentUser.photoURL} alt="profile pic"/>
      <p>{auth.currentUser.phoneNumber}</p>
      
      </>
    )
  }