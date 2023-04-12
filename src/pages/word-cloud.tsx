import React from "react";
import Head from "next/head";
// import TrendWordCloud from '../components/trend_word_cloud/twc';

// import dynamic from 'next/dynamic'
// const TrendWordCloud = dynamic(() => import('../components/trend_word_cloud/twc'), { ssr: false })
import WordCloudPanel from "@/components/trend_word_cloud/wc_panel";
let a = 'HHaaa'
const title_msg = `Word Cloud: ${a}`;

export default function wc() {
    return (
        <>  
            <Head>
                <title>{title_msg}</title>
            </Head>
            <div className="twc-container flex flex-wrap w-full justify-center h-96 items-center">
                <div className="flex w-full justify-center">
                    <span>{a}</span>
                </div>
                {['a','b'].map(item=>
                    <WordCloudPanel key={item} eid={item}></WordCloudPanel>
                )}
            </div>
        </>
    )
}