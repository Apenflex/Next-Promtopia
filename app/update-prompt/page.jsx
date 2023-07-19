'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Form from '@/components/form'
import { delay } from '@/utils/async'

export default function EditPrompt () {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])

    const UpdatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) {
            toast.error('Prompt ID not found')
            return
        }

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })

            if (res.ok) {
                toast.success('Prompt updated successfully')
                await delay(1000)
                router.push('/profile')
            }
        } catch (error) {
            toast.error('Failed to update prompt')
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={UpdatePrompt} />
    )
}
