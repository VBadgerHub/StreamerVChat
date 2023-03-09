
export const registerUser = (user) =>{
    if (!isUserValid(user)) {
        return { code: 400 }
    }

    let userToRegister = {
        name: user.name,
        twitch: user.twitch,
        mail: user.mail,
        date_of_birth: user.date_of_birth
    }

    return { code: 200 }
}

const isUserValid = (user) =>{
    if(
        !user                                   || 
        Object.keys(user).length < 1            ||
        typeof user.name !== 'string'           ||
        typeof user.twitch !== 'string'         ||
        typeof user.mail !== 'string'           )
         
    {
        return false
    } else {
        return true
    }
}