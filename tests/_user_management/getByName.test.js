import { getByName } from '../../src/_user_management/queries/getByName.js'
import { beforeEach, describe, expect, it, assert } from 'vitest'
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

    beforeEach(async () => {
        let res = await userRepository.deleteAll()
        
    });

    it('getUserByname() [Get user]', async () => {
        usersData.forEach(async user => {
            await userRepository.add(user)  
        });
        const res = await getByName('user1'); 
        console.log(res.data);
        expect(res.code).toBe(200)
        expect(res.data.includes(
        { 
            name: 'user1',
            mail: 'test1@mail.vorczu.pl'
        }))
    })

    // it('getUserByname() [User name not valid type]', async () => {
    //     notValidNames.forEach(async userName => {
    //         const res = await getByName(userName);
    //         expect(res.code).toBe(400)
    //         expect(res.msg).toBe('User name is not valid type')
    //         expect(res.data.includes([]))
    //     });
        
    // })

    // it('getUserByname() [No user by name]', async () => {
    //     const res = await getByName('user1');
    //     expect(res.code).toBe(404)
    //     expect(res.data.includes([]))
    // })
    
    // it('getUserByname() [Get user - no users in DB', async () => {
    //     const res = await getAllData();
    //     expect(res.code).toBe(404)
    //     assert.deepEqual(res.data, [])
    // })

 
})



