import { registerUser } from "../../src/_user_management/usecases/registerUser"
import { beforeEach, describe, expect, it } from 'vitest'
import userRepository from "../../src/repositories/userRepository"


describe('Register new user tests', () => {
    const dataToSend = [null, '', 3, true, {test: 'test'}, 3.3]
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


    it('registerUser() [Valid object]', async () => {
        const res = await registerUser(userData.valid);
        expect(res.code).toBe(200)
        expect(res.respData.msg).contain('User registered successfully')
        expect(res.respData.data.name).toBe('Tester')
        expect(res.respData.data.mail).toBe('test@mail.vorczu.pl')
    })

    it('registerUser() [Not valid name data]', async () => {
        for (let index = 0; index < dataToSend.length; index++) {
            const res = await registerUser({
                name: dataToSend[index],     
                password: 'test',   
                mail: 'test@test.vorczu.pl', 
                date_of_birth: new Date()
            });
            expect(res.code).toBe(400)
            expect(res.respData.msg).contain('Name is not valid')
        }   
    });

    it('registerUser() [Not valid password data]', async () => {

        for (let index = 0; index < dataToSend.length; index++) {
            const res = await registerUser({
                name: 'Tester13@',     
                password: dataToSend[index],   
                mail: 'test@test.vorczu.pl', 
                date_of_birth: new Date()
            });
            expect(res.code).toBe(400)
            expect(res.respData.msg).contain('Password is not valid')
        }   
    });

    it('registerUser() [Not valid mail data]', async () => {

        for (let index = 0; index < dataToSend.length; index++) {
            const res = await registerUser({
                name: 'Tester13@',    
                password: 'test',   
                mail: dataToSend[index], 
                date_of_birth: new Date() 
            });
            expect(res.code).toBe(400)
            expect(res.respData.msg).contain('Mail is not valid')
        }   
    });

    it('registerUser() [Empty user obj]', async () => {
        const res = await registerUser({});
        expect(res.code).toBe(400)
        expect(res.respData.msg.includes('Not valid user object'))
    });

    it('registerUser() [Not unique mail]', async () => {
        await userRepository.add(userData.valid)
        const res = await registerUser(userData.valid);
        expect(res.code).toBe(400)
        expect(res.respData.msg).contain('Mail already used')
    });
    
    it('registerUser() [JWT sent]', async () => {
        const res = await registerUser(userData.valid);
        expect(res.respData.msg).contain('User registered successfully')
        expect(res.jwt) 
    });

})



