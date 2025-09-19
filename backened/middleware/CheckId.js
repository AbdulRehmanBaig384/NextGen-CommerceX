import { isValidObjectId } from "mongoose";

function checkId(request,response,next){
    if(!isValidObjectId(request.params.id)){
        response.status(404);
        throw new Error(`Invalid Object of:${request.params.id}`)
    }
    next()
}

export default checkId