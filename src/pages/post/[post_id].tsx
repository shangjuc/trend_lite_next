import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter();
    const { post_id } = router.query;

    return (
        <>
            <div className="container flex justify-center w-full">
                <p>Post: {post_id}</p>
            </div>
        </>
    );
};

export default Post;