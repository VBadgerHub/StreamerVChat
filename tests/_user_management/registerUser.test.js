import userRepository from "../../src/repositories/userRepository";
import { registerUser } from "../../src/_user_management/usecases/registerUser";

describe('Register new user tests', () => {
    const userData = {
        valid : {
            name: 'Tester',     
            password: 'TeSter1337!',   
            mail: 'test@mail.vorczu.pl', 
            date_of_birth: new Date()
        }
    }

    beforeEach(async () => {
        await userRepository.deleteAll()
    });


    test('registerUser() [Valid object]', async () => {
        const res = await registerUser(userData.valid);
        expect(res.code).toBe(200)
        expect(res.respData.msg).toBe('User registered successfully')
        expect(res.respData.data.name).toBe('Tester')
        expect(res.respData.data.mail).toBe('test@mail.vorczu.pl')
    })
})