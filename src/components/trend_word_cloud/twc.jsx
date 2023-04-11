import React, { useEffect } from 'react';
// import dynamic from 'next/dynamic'
// const  WordCloud = dynamic(() => import ('wordcloud'), { ssr: false })
import WordCloud from 'wordcloud';


let list = [];
for (let i = 0; i < 100; i++){
    let weight = Math.floor(Math.random() * 10);
    if(i == 0){
        weight = 12;
    }
    let word_arr = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
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
const TrendWordCloud  = ()=>{
    // console.log(window)
    useEffect(() => {
        if ( (typeof window !== "undefined") || true) {
            // Client-side-only code
            WordCloud(
                document.querySelector('.WC canvas'),
                // this.refs['my-canvas'],
                {
                    list: list,
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
    })
    return (
        <>
            <div className="WC" data-testid="Wc">
                <canvas ></canvas>
            </div>
        </>
    )
}

export default TrendWordCloud;