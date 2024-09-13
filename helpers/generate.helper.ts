export const generateRandomString = (length:number):string=>{

    const characterString:string ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result :string = "";
    for( let i = 0 ;i<length ; i++){
        result += 
        characterString.charAt(Math.floor(Math.random()* characterString.length));
    }
    return result;


}


export const generateRandomNumber = (length:number):String=>{
    let result :String  = "";
    let characterNumber ="0123456789" ; 
    for( let i = 0 ;i< length ; i++){
        result+=characterNumber.charAt(Math.floor(Math.random()* characterNumber.length));
    }
    return result;
    


}

