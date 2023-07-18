import PromptCard from '@/components/PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left font-inter text-sm text-gray-500">{desc}</p>
            <div className="mt-10 prompt_layout">
                {data.map((post) => (
                    <PromptCard
                        key={post.id}
                        post={post}
                        handleEdit={() => handleEdit?.(post)}
                        handleDelete={() => handleDelete?.(post)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Profile
