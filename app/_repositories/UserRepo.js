import { connectToDB } from '@/lib/database'

const getRecommendUser = async (username) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeRead((tx) => {
      return tx.run(
        `match (u: User)
               where not exists((u) <-[:FOLLOWS]- ({username: $username})) and u.username <> $username
               return u as user
               limit 5`,
        {
          username,
        },
      )
    })
    if (res.records.length === 0) {
      return []
    }
    const users = res.records.map((record) => {
      const user = record.get('user')
      return {
        id: user.identity['low'],
        username: user.properties['username'],
        imgUrl: user.properties['imgUrl'],
        email: user.properties['email'],
      }
    })
    await session.close()
    return users
  } catch (error) {
    console.log(error)
  }
}

const followUser = async (username, follower) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `
        match (u:User {username: $username})
        match (f:User {username: $follower})
        create (u) -[:FOLLOWS]-> (f)
        `,
        {
          username,
          follower,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}

const unfollowUser = async (username, follower) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `
        match (u:User {username: $username}) -[fol:FOLLOWS]-> (f:User {username: $follower})
        delete fol
        `,
        {
          username,
          follower,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}

export { getRecommendUser, followUser, unfollowUser }
