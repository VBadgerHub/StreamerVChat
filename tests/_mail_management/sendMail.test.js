import { sendMail } from "../../src/_mail_management/usecases";
import { assert, describe, expect, it, config } from 'vitest'


describe('Mail sender tests', () => {
  it('sendMail() [Valid object]', async () => {

    const res = await sendMail({
      subject: "true",
      text: "test"
    });
    expect(res.code).toBe(200)
    expect(res.msg).contain('Mail sent')        
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

  // it('sendMail() [DB conn problem]', async () => {
  //   const res = await sendMail({
  //     subject: "",
  //     text: ""
  //   });
  //   expect(res.code).toBe(500)
  //   expect(res.msg).contain('DB Error')        
  // }, { timeout: 20000 })



})