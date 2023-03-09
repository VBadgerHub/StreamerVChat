import { registerUser } from "../../../src/_user_management/usecases/registerUser";

describe('test test [200]', () => {
    test('should send email successfully', async () => {
      const res = registerUser({
        subject: "true",
        text: "test"
      });
      expect(res.code).toBe(400);
    });
  });