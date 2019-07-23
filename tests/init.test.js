const NodeMoleculer = require('moleculer')

jest.setTimeout(50000)

describe('check initialization of Moleculer', () => {
  beforeEach(async () => {
    await page.goto(PATH, { waitUntil: 'load' })
  })

  test('should return the MOLECULER_VERSION', async () => {
    const Moleculer = await page.evaluate(() => Moleculer)

    expect(Moleculer.ServiceBroker.MOLECULER_VERSION).toBe(NodeMoleculer.ServiceBroker.MOLECULER_VERSION)
  })
})
