import { connectToDB } from '@/lib/database'

const getTags = async () => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeRead((tx) =>
      tx.run(`match (t: Tag)
                      return t as tags
                      limit 5`),
    )
    if (res.records.length === 0) {
      return []
    }
    const tags = res.records.map((record) => {
      const tag = record.get('tags')
      return {
        id: tag.identity['low'],
        value: tag.properties['value'],
      }
    })
    await session.close()
    return tags
  } catch (error) {
    console.log(error)
  }
}

const getSearchedTags = async (query) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeRead((tx) =>
      tx.run(
        `match (t: Tag)
               where t.value =~ $query + '.*'
               return t as tags`,
        {
          query,
        },
      ),
    )

    if (res.records.length === 0) {
      return []
    }
    const tags = res.records.map((record) => {
      const tag = record.get('tags')
      return {
        id: tag.identity['low'],
        value: tag.properties['value'],
      }
    })
    await session.close()
    return tags
  } catch (error) {
    console.log(error)
  }
}

const createTag = async (tagName) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeWrite((tx) =>
      tx.run(
        `CREATE (t: Tag { value: $name})
               RETURN t as tag`,
        {
          name: tagName,
        },
      ),
    )
    let tag = res.records[0].get('tag')
    tag = {
      id: tag.identity['low'],
      value: tag.properties['value'],
    }
    await session.close()
    return tag
  } catch (error) {
    console.log(error)
  }
}

export { getTags, getSearchedTags, createTag }
