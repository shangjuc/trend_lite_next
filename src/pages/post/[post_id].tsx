import { useRouter } from "next/router";
import Head from "next/head";

const Post = () => {
    const router = useRouter();
    const { post_id } = router.query;
    const title_msg = `Hi Post: ${post_id}`

    return (
        <>
            <Head>
                <title>{title_msg}</title>
            </Head>
            <div className="container flex justify-center w-full">
                <p>Post: {post_id}</p>
            </div>
        </>
    );
};

export default Post;