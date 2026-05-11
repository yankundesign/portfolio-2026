import { useParams } from 'react-router'

export default function JournalRoute() {
  const { slug } = useParams<{ slug: string }>()
  return <div>Journal: {slug} — to be built</div>
}
