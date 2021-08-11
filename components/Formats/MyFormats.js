export const formatTimestamp = (num) => {
    const date = new Date(num);
    return ""+date.getDate()+
        ". "+(date.getMonth()+1)+
        ". "+date.getFullYear()+'.';
}


export const formatTimestamp2 = (num) => {
    const date = new Date(num);
    let flag = date.getMinutes()===0? true:false
    if(flag)
        return ""+date.getHours()+
            ":"+date.getMinutes()+'0'+
            "h";
    return ""+date.getHours()+
        ":"+date.getMinutes()+
        "h";
}


export const formatType = (num) => {
    if(num === 1)
        return 'Parcijalni'
    else if(num === 2)
        return 'Završni'
    else if(num === 3)
        return 'Popravni'
    else
        return 'Socijalni'
}