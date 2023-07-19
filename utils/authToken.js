module.exports.getToken = (req)=>{
   
    const cookies = req.headers.cookie.split(';').map((cookie)=> cookie.trim());
    let token = '';
    for (const cookie of cookies) {
        let [cookieKey, value] = cookie.split("=");
        cookieKey.trim();
        if(cookieKey === "token") token = value;
    }
    
    return token;
}

module.exports.getRole = (req)=>{
    const cookies = req.headers.cookie.split(';').map((cookie)=> cookie.trim());
    let role = '';
    for (const cookie of cookies) {
        let [cookieKey, value] = cookie.split("=")
        cookieKey.trim();
        if(cookieKey === "role"){
            value.includes('ADMIN')? role='ADMIN': ''
            value.includes('USER')? role='USER': ''
        }
    }
    console.log(role)
    return role;
}