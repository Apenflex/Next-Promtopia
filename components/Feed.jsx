'use client'

import { useEffect, useState } from 'react'

import PromptCard from '@/components/PromptCard'
import { delay } from '@/utils/async'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}

const Feed = () => {
    const [posts, setPosts] = useState([])
    // console.log(posts)
    const [searchText, setSearchText] = useState('')
    const [searchedResults, setSearchedResults] = useState([])
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])

    const filterPosts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i')
        return posts.filter(
            (item) => regex.test(item.prompt) || regex.test(item.tag) || regex.test(item.creator.name)
        )
    }

    const handleSearchChange = async (e) => {
        setSearching(true)
        setSearchText(e.target.value)
        await delay(1500)
        setSearchedResults(filterPosts(e.target.value))
        setSearching(false)
	}
	
	const handleTagClick = (tag) => {
		setSearchText(tag)
		setSearchedResults(filterPosts(tag))
	}

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    className="search_input peer"
                    type="text"
                    placeholder="Search for a tag or user name"
                    value={searchText}
                    required
                    onChange={handleSearchChange}
                />
            </form>

            {searchText ? (
                <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
            ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
            )}
        </section>
    )
}
export default Feed
