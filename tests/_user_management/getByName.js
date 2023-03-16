import 'jest-extended';
import { getByName } from '../../src/_user_management/queries/getByName.js'
import userRepository from '../../src/repositories/userRepository.js'


describe('Register new user tests', () => {
    const notValidNames = ['', 3, true, {test: 'test'}, null, {}, [], 3.3]


    const usersData = [
        {
            name: 'user1',
            password: 'TestPass1337@',
            mail: 'test1@mail.vorczu.pl', 
            date_of_birth: new Date()
        },
        {
            name: 'user2',
            password: 'TestPass1337@',
            mail: 'test2@mail.vorczu.pl', 
            date_of_birth: new Date() 
        },
        {
            name: 'user3',
            password: 'TestPass1337@',
            mail: 'test3@mail.vorczu.pl', 
            date_of_birth: new Date()
        },
        {
            name: 'user4',
            password: 'TestPass1337@',
            mail: 'test4@mail.vorczu.pl', 
            date_of_birth: new Date()
        }
    ]


    it('getUserByname() [Get user]', async () => {
        const isMock = usersData.forEach(async user => {
            await userRepository.add(user)  
        });

        if(isMock){
            const res = await getByName('user1'); 
            expect(res.code).toBe(200)
            expect(res.data.name).toBe('user1')
        }
    })  

    it('getUserByname() [Get user - check is DTO]', async () => {
        await userRepository.deleteAll()
        const response = await userRepository.add({
            name: 'userX',
            password: 'TestPass1337@',
            mail: 'testX@mail.vorczu.pl', 
            date_of_birth: new Date()
        })  

        let userToCompare = {
            id:  response.id,
            name: response.name,
            mail: response.mail
        }
        const res = await getByName('userX'); 
        expect(res.code).toBe(200)
        assert.deepEqual(userToCompare, res.data)
      
    }) 

    it('getUserByname() [User name not valid type]', async () => {
        notValidNames.forEach(async userName => {
            const res = await getByName(userName);
            expect(res.code).toBe(400)
            expect(res.msg).toBe('User name is not valid type')
            expect(res.data).toBeEmpty()
        });  
    }) 
    
    it('getUserByname() [No user by name]', async () => {
        const userName = 'ArthurDur'
        const res = await getByName(userName);
        expect(res.code).toBe(404)
        expect(res.msg).toBe(`No user by name ${userName} `)
        expect(res.data).toBeEmpty()
    })
     
})



