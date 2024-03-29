import { getAllData } from '../../src/_user_management/queries/getAll.js'
import userRepository from '../../src/repositories/userRepository.js'
describe('Register new user tests', () => {
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



    it('getAll() [Get all users]', async () => {

        const res = await getAllData();
        expect(res.code).toBe(200)
        expect(res.data.includes([
        {
            name: 'user1',
            mail: 'test1@mail.vorczu.pl'
        },
        {
            name: 'user2',
            mail: 'test2@mail.vorczu.pl'
        },
        {
            name: 'user3',
            mail: 'test3@mail.vorczu.pl'
        },
        {
            name: 'user4',
            mail: 'test4@mail.vorczu.pl'
        }]))
    })
    
    it('getAll() [Get all users - no users in DB', async () => {
        await userRepository.deleteAll()
        const res = await getAllData();
        expect(res.code).toBe(200)
        assert.deepEqual(res.data, [])
    })

    it('getAll() [Get all users - only DTO]', async () => {
        let response
        let userToCompare
        let deleteResponse = await userRepository.deleteAll()
        if (deleteResponse) {
            response = await userRepository.add(usersData[0])  
            userToCompare = {
                id: response.id,
                name: response.name,
                mail: response.mail
            }
        }
        
        const res = await getAllData();
        expect(res.code).toBe(200)
        assert.deepEqual(res.data[0], userToCompare)
    })
})



