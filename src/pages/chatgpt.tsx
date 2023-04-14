import React, { useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar'
const title_msg = `ChatGPT test`;

export default function ChatGPT() {

    const [userInput, setUserInput] = useState('');
    const [aiAnswer, setAiAnswer] = useState('輸入問題以獲得答案');

    function get_anwser(){
        console.log(userInput);
        let params = {q: userInput}
        setAiAnswer('。。。')

        fetch(`http://localhost:5566/api/chatgpt?q=${userInput}`)
        .then(res=>{
            // console.log(res)
            return res.json();
        })
        .then(myjson=>{
            console.log(myjson)
            setAiAnswer(myjson.answer)
        })
    }

    function handleChange(event:any){
        setUserInput(event.target.value);

    }
    function handleKeyDown(event:any){
        // console.log(e);
        // setUserInput(e.target.value);
        if (event.key === 'Enter') {
            get_anwser()
        }

    }

    return (
        <>  
            <Head>
                <title>{title_msg}</title>
            </Head>
            <Navbar/>
            <div className=" flex w-full justify-center items-center">
                <div className="card flex flex-wrap w-96 h-96 p-10 border rounded border-white">

                    <div className="user-input flex w-full justify-center items-center">
                        <input type="text" className=" text-gray-500 mr-4 h-10 rounded px-2" 
                        onChange={handleChange} 
                        onKeyDown={handleKeyDown}/>
                        <button className="border p-2 rounded" onClick={get_anwser} onKeyDown={get_anwser}>Submit</button>
                    </div>
                    <div className="answer flex w-full justify-center border-t py-10">
                        
                        <p>{aiAnswer}</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}