import { sendMail } from "../../../src/_mail_management/usecases";

describe('test test [200]', () => {
    test('should send email successfully', async () => {
      const res = await sendMail({
        subject: "true",
        text: "test"
      });
      expect(res.code).toBe(200);
    });
  });