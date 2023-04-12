import React, { ReactPropTypes, useEffect, useState } from "react";
import dynamic from 'next/dynamic'
const JsWordCloud = dynamic(() => import('./jswc'), { ssr: false })
const TsWordCloud = dynamic(() => import('./tswc'), { ssr: false })

export default function WordCloudPanel(props:{eid: string}) {

    const [eid, setEid] = useState('wordcloud-' + props.eid)

    console.log(eid, props.eid);
    useEffect(()=>{
        // setEid('wordcloud-' + props.eid);
    },[])

    return (
        <>  
            <div className="twc-container flex flex-wrap w-full justify-center h-96 items-center">
                <div className="flex w-full justify-center">
                    <span>This is WordCloud</span>
                </div>
                <div id={'js' + eid} className="mr-2">
                    <JsWordCloud eid={'js' + eid}></JsWordCloud>
                </div>
                <div id={'ts' + eid}>
                    <TsWordCloud eid={'ts' + eid}></TsWordCloud>
                </div>
            </div>
        </>
    )
}