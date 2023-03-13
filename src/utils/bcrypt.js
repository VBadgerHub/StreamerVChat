import bcrypt from 'bcrypt';

export const passwordHash = async (user) =>{
    let salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt); 
    return user
}

export const customPasswordHash = async (password) =>{
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt); 
    return password
}

export const passwordCompare = async (password, dbUserPassword) =>{
    return await bcrypt.compare(password, dbUserPassword);
}


