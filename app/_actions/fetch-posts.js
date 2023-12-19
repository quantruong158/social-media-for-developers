'use server'

export async function fetchFeedPosts(username, page) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/feed/${username}?page=${page}`,
      {
        cache: 'no-store',
      },
    )
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

export async function fetchUserPosts(username, page) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?username=${username}&page=${page}`,
      {
        cache: 'no-store',
      },
    )
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
