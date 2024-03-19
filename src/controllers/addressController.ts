import { IContext } from "../interfaces/IContext";

export async function address(ctx:IContext){

    const _writeTime = {
        _seconds: 10000,
        _nanoseconds: 10000
    }   

    const data = {
        _writeTime
    }

    ctx.status = 200
    ctx.body = data

}