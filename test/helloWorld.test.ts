import { helloWorld } from "../src"

test('Should return Hello world!', async () => {
  const data = await helloWorld()
  expect(data).toBe('Hello world!')
})
