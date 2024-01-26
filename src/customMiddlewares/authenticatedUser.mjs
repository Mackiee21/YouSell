export const validateUser = (request, response, next) => {
    const {cookies: { mypokie }} = request;
    if(!mypokie){
        return response.status(401).json({ message: 'Unauthorized - Session expired' });
    }else{
        next();
    }
    //redirect user here if not authorized to access some route
}