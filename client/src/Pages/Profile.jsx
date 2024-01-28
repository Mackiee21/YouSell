import { deleteCookie } from '../usableFunc/deleteCookiie';

function Profile() {

  const logoutUser = () => {
    deleteCookie("mypokie");
    localStorage.removeItem("mypokie")
    window.location.href = "/";
  }
  return (
    <div>
      Hello from profile

      <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Profile
