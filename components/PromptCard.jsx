'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	console.log(post)
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
				<div className="">
					
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default PromptCard
