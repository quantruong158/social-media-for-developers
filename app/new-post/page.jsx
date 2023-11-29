import { currentUser } from '@clerk/nextjs'
import CreatePost from '@/components/CreatePost'
const NewPost = async () => {
  const user = await currentUser()
  const userInfo = {
    username: user.username,
    email: user.emailAddresses[0]['emailAddress'],
    imgUrl: user.imageUrl,
  }
  return <CreatePost user={userInfo} />
}

export default NewPost
