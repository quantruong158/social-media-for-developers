import * as neo4j from 'neo4j-driver'

export const connectToDB = async () => {
  let driver
  const URI = process.env.NEO4J_URI
  const USER = process.env.NEO4J_USERNAME
  const PASSWORD = process.env.NEO4J_PASSWORD

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    return driver
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
}
