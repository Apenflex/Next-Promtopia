'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import Profile from '@/components/Profile'

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEdit = () => {}
    const handleDelete = async () => { }
    
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default MyProfile
