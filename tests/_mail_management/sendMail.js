import { sendMail } from "../../src/_mail_management/usecases";
import { describe, expect, it } from 'vitest'
import optionsRepository from "../../src/repositories/optionsRepository";



describe('Mail sender tests', () => {
  
  it('sendMail() [Valid object]', async () => {
    await optionsRepository.updateOptionById(1, '1', 'TEST')
    const res = await sendMail({
      subject: "true",
      text: "test"
    });
    expect(res.msg).contain('Mail sent')        
    expect(res.code).toBe(200)
  }, )

  it('sendMail() [Valid objeet - no content]', async () => {

    const res = await sendMail({
      subject: "",
      text: ""
    });
    expect(res.code).toBe(200)
    expect(res.msg).contain('Mail sent')        
  })

  it('sendMail() [Empty object]', async () => {

    const res = await sendMail({});
    expect(res.code).toBe(400)
    expect(res.msg).contain('Empty or badly formatted object')        
  })

  it('sendMail() [Object with wrong property type]', async () => {

    const res = await sendMail({
      subject: 3,
      text: true
    });
    expect(res.code).toBe(400)
    expect(res.msg).contain('Wrong object property value type')        
  })

  it('sendMail() [Valid object] Mailer is off', async () => {
    await optionsRepository.updateOptionById(1, '0', 'TEST')
    const res = await sendMail({
      subject: "true",
      text: "test"
    });
    expect(res.code).toBe(500)
    expect(res.msg).contain('Mail not sent')        
  }, )
})