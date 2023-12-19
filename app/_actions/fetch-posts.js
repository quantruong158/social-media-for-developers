'use server'

export async function fetchFeedPosts(username, page) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/${username}?page=${page}`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?username=${username}&page=${page}`,
      {
        cache: 'no-store',
      },
    )
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
