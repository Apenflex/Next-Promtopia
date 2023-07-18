'use client'

import { useEffect, useState } from 'react'

import PromptCard from '@/components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post.id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [searchText, setSearchText] = useState('')
	const [posts, setPosts] = useState([])
	const handleSearchChange = (e) => { }
	
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('/api/prompt')
			const data = await res.json()
			setPosts(data)
		}
		fetchPosts()
	}, [])

    return (
        <section className="feed">
			<form className='relative w-full flex-center'>
				<input
					className='search_input peer'
					type='text'
					placeholder='Search for a tag or user name'
					value={searchText}
					required
					onChange={handleSearchChange}
				/>
			</form>
			<PromptCardList
				data={posts}
				handleTagClick={() => {}}
			/>
        </section>
    )
}
export default Feed
