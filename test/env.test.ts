import config from "../src/config"

test('.env | App Definition', async () => {
    expect(!!config.appName).toBeDefined()
    expect(!!config.nodeVer).toBeDefined()
    expect(!!config.pinoEnabled).toBeTruthy()
    expect(!!config.pinoMinLevel).toBeDefined()
    expect(!!config.logPath).toBeDefined()
})
