import Link from 'next/link';
// import styles from './navbar.scss';

export default function Navbar() {

    return (
        <div className="flex w-full fiexd">
            <ul className=' flex'>
                <li className=' mr-3'>
                    <Link href="/">Home</Link>
                </li>
                <li className=' mr-3'>
                    <Link href="/word-cloud">WordCloud</Link>
                </li>
                <li className=' mr-3'>
                    <Link href="/chatgpt">ChatGPT</Link>
                </li>
                <li className=' mr-3'>
                    <Link href="/about">About Us</Link>
                </li>
                <li className=' mr-3'>
                    <Link href="/post/hello">Blog Post</Link>
                </li>
            </ul>
        </div>
    )
}