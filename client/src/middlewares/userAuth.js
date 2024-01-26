//check if user is authenticated
export const isUserAuthenticated = () => {
    //do something here like
    //check hte document.cookie if present ang particular na cookie like (mypokiee is present);
    //if so, then set the loggedIn to true
    

    //console.log(document.cookie); //this would return like mypokiee=isyourstoit; cookie2=value2; ....
    let isLoggedIn = false;
    const userCookie = document.cookie ?? null;
    if(!userCookie && localStorage.getItem("mypokie") !== null) {
        localStorage.removeItem("mypokie");
        return true; //just for displaying the error purposes hahahahh
        //returns true so that the session expired message would be shown
        //please make sure to return false since cookie has expired so isLoggedIn should be false. Thank you
    }
    if(userCookie) isLoggedIn = true;
   return isLoggedIn;

}