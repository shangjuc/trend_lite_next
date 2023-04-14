import React, { useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar'
const title_msg = `ChatGPT test`;

export default function ChatGPT() {

    const [userInput, setUserInput] = useState('');
    const [aiAnswer, setAiAnswer] = useState('MMM');

    function get_anwser(){
        console.log(userInput);
    }
    return (
        <>  
            <Head>
                <title>{title_msg}</title>
            </Head>
            <Navbar/>
            <div className=" flex w-full justify-center items-center">
                <div className="card flex flex-wrap w-96 h-96 border  border-red-300">

                    <div className="user-input flex w-full justify-center items-center">
                        <input type="text" className=" text-gray-500 mr-4 h-8" onChange={(e)=>{ setUserInput(e.target.value) }} />
                        <button onClick={get_anwser}>Get answer</button>
                    </div>
                    <div className="answer flex w-full justify-center">
                        <p>{aiAnswer}</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}