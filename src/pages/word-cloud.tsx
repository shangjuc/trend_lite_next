import React from "react";
import Head from "next/head";
// import TrendWordCloud from '../components/trend_word_cloud/twc';
import Navbar from '@/components/navbar/navbar'


// import dynamic from 'next/dynamic'
// const TrendWordCloud = dynamic(() => import('../components/trend_word_cloud/twc'), { ssr: false })
import WordCloudPanel from "@/components/trend_word_cloud/wc_panel";
const title_msg = `Word Cloud Demo`;

const capture = async () => {
    const canvas = document.createElement("canvas");
    const context:any = canvas.getContext("2d");
    const video = document.createElement("video");
  
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia();
      video.srcObject = captureStream;
      context.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
      const frame = canvas.toDataURL("image/png");
      captureStream.getTracks().forEach(track => track.stop());
    //   window.location.href = frame;

      return frame;
    } catch (err) {
      console.error("Error: " + err);
    }
  };

export default function wc() {
    return (
        <>  
            <Head>
                <title>{title_msg}</title>
            </Head>    
            <Navbar/>

            <div className="twc-container flex flex-wrap w-full justify-center h-96 items-center">
                <button onClick={capture}>Capture</button>
                <div className="flex w-full justify-center">
                    {/* <span>{a}</span> */}
                </div>
                {['a','b'].map(item=>
                    <WordCloudPanel key={item} eid={item}></WordCloudPanel>
                )}
            </div>
        </>
    )
}