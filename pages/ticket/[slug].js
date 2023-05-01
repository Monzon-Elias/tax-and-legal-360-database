import { useRouter } from 'next/router'

const TicketPost = () => {
  const router = useRouter();

  return <h1>Resource Post: {router.query.slug}</h1>
}

export default TicketPost