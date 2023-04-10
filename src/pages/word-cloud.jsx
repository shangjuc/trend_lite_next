import React from "react";
import dynamic from 'next/dynamic'

// import TrendWordCloud from '../components/trend_word_cloud/twc';
const TrendWordCloud = dynamic(() => import('../components/trend_word_cloud/twc'), { ssr: false })

export default function wc() {
    let a = 'HHHHH'
    return (
        <>
            {(typeof window !== 'undefined') &&
                <TrendWordCloud></TrendWordCloud>
            }
        </>
    )
}