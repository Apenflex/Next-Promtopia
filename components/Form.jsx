import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild with any
                AI-powered platform.
            </p>

            <form
                className="flex flex-col gap-7 w-full max-w-2xl mt-10 glassmorphism"
                onSubmit={handleSubmit}
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
                    <textarea
                        className="form_textarea"
                        value={post.prompt}
                        placeholder="Write your prompt here..."
                        required
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag {` `}
                        <span className="font-normal">(#product, #webdevelopment, #idea)</span>
                    </span>
                    <input
                        className="form_input"
                        value={post.tag}
                        placeholder="#tag"
                        required
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm˝">
                        Cancel
                    </Link>

                    <button
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-primary-orange-hover transition-colors duration-300"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}
export default Form
