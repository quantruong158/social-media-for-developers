import { currentUser } from '@clerk/nextjs'
import UpdatePost from '@/components/UpdatePost'


const NewPost = async ({ params }) => {
  const id = params.id
  const user = await currentUser()
  const userInfo = {
    username: user.username,
    email: user.emailAddresses[0]['emailAddress'],
    imgUrl: user.imageUrl,
  }
  return <UpdatePost user={userInfo} id={id} />
}

export default NewPost
