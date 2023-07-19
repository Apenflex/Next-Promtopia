'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import Profile from '@/components/Profile'
import { delay } from '@/utils/async'

export default function MyProfile () {
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

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post.id}`)
    }
    const handleDelete = async (post) => {
        try {
            const res = await fetch(`/api/prompt/${post.id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                toast.success('Prompt deleted successfully')
                await delay(700)
                setPosts((prev) => prev.filter((p) => p.id !== post.id))
            }
        } catch (error) {
            toast.error('Failed to delete prompt')
            console.log(error)
        }
    }
    
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
