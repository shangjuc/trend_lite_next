import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic'
// const WordCloud = dynamic(() => import ('wordcloud'), { ssr: false })
import wordcloud from 'wordcloud';


function make_list(){
    let list = [];
    for (let i = 0; i < 100; i++){
        let weight = Math.floor(Math.random() * 10);
        if(i == 0){
            weight = 12;
        }
        let word_arr = ['JJJJ', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'];
        let word = word_arr[Math.floor(Math.random() * word_arr.length)]
        list.push([word, weight]);
    }
    let example_list = [
        ['foo', 12],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 6],
        ['bar', 5],
        ['bar', 1],
    ]
    return list
}

export default function JsWordCloud(props){
    // console.log(window)
    const [eid, setEid] = useState(props.eid)
    
    useEffect(() => {
        // setEid();
        
        
        if ( (typeof window !== "undefined") || true) {
            // Client-side-only code
            console.log(eid)
            let target = `#${eid} canvas`;
            let targetElement = document.querySelector(target);
            if(targetElement){
                wordcloud(
                    document.querySelector(target),
                    // this.refs['my-canvas'],
                    {
                        list: make_list(),
                        weightFactor: 5,
                        fontFamily: 'Times, serif',
                        color: function (word, weight) {
                            return (weight === 12) ? '#f02222' : '#c09292';
                        },
                        // rotateRatio: 0.5,
                        rotationSteps: 2,
                        backgroundColor: '#ffe0e0'
                    }
                );

            }
        }
    },[])
    return (
        <>
            <canvas ></canvas>
        </>
    )
};