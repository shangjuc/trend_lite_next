import React, { useEffect } from 'react';
// import dynamic from 'next/dynamic'
// const  WordCloud = dynamic(() => import ('wordcloud'), { ssr: false })
import WordCloud from 'wordcloud';


const TrendWordCloud  = ()=>{
    // console.log(window)
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            WordCloud(
                document.querySelector('.WC canvas'),
                // this.refs['my-canvas'],
                {
                    list: [
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
                    ],
                    weightFactor: 5,
                    fontFamily: 'Times, serif',
                    color: function (word, weight) {
                        return (weight === 12) ? '#f02222' : '#c09292';
                    },
                    // rotateRatio: 0.5,
                    rotationSteps: 2,
                    backgroundColor: '#ffe0e0'
                });
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