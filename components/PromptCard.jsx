'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { delay } from '@/utils/async'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    // console.log(post)
    const [copied, setCopied] = useState('')
    // console.log('render prompt card')
    const handleCopy = async () => {
        toast.success('Prompt copied to clipboard')
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        await delay(3000)
        setCopied('')
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.name}</h3>
                        <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt="copy_icon"
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick?.(post.tag)}
            >
                {post.tag}
            </p>
        </div>
    )
}

export default PromptCard
