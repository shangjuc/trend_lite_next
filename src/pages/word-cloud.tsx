import React from "react";
// import TrendWordCloud from '../components/trend_word_cloud/twc';

import dynamic from 'next/dynamic'
const TrendWordCloud = dynamic(() => import('../components/trend_word_cloud/twc'), { ssr: false })

export default function wc() {
    let a = 'HHHHH'
    return (
        <>  
            <div className="twc-container flex flex-wrap w-full justify-center h-96 items-center">
                <div className="flex w-full justify-center">
                    <span>{a}</span>
                </div>
                {( (typeof window !== 'undefined') || true ) &&
                    <TrendWordCloud></TrendWordCloud>
                }
            </div>
        </>
    )
}