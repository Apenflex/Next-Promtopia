'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import Form from '@/components/form'
import { delay } from '@/utils/async'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const CreatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            })

            if (res.ok) {
                toast.success('Prompt created successfully')
                delay(1000)
                router.push('/')
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
    />
}
export default CreatePrompt
