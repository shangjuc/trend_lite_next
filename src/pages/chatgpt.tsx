import React, { useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar'
const title_msg = `ChatGPT test`;

export default function ChatGPT() {

    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([{ user_input: '', ai_answer: '' }]);
    const [isLoading, setIsLoading] = useState(false);


    function get_anwser() {
        console.log(userInput);
        if(!userInput) return;
        let params = { q: userInput }
        if(isLoading) return;
        setIsLoading(true);
        setUserInput('');

        fetch(`http://localhost:5566/api/chatgpt?q=${userInput}`)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(myjson => {
                console.log(myjson)
                if (typeof myjson?.answer === 'string') {
                    setIsLoading(false);
                    let temp_history = chatHistory;
                    // temp_history.push({ user_input: userInput, ai_answer: myjson?.answer })
                    temp_history[temp_history.length - 1].ai_answer = myjson.answer;
                    setChatHistory(temp_history);
                } else {
                    setIsLoading(false);
                }
            })
    }

    function handleChange(event: any) {
        setUserInput(event.target.value);

    }
    function handleKeyDown(event: any) {
        // console.log(e);
        // setUserInput(e.target.value);
        if (event.key === 'Enter') {
            let temp_history = chatHistory;
            temp_history.push({ user_input: userInput, ai_answer: '(...)' })
            setChatHistory(temp_history);
            get_anwser();
            event.target.value = '';
        }

    }



    return (
        <>
            <Head>
                <title>{title_msg}</title>
            </Head>
            <Navbar />
            <div className=" flex w-full justify-center items-center">
                <div className="card flex flex-wrap w-1/2 h-auto p-10 border rounded border-white">
                    <h1>我婆模擬器</h1>
                    {chatHistory.map((item, index) =>

                        item.user_input &&
                        <div key={index} className="w-full border-b py-10" >
                            <p>Q: {item.user_input}</p>
                            <p>琴葉: {item.ai_answer}</p>

                        </div>
                    )}
                    {/* {isLoading && <div className="w-full">Loading...</div>} */}
                    <div className="user-input flex flex-wrap w-full justify-center items-center py-10">
                        <input type="text" placeholder="輸入想問琴葉的問題" className=" w-full text-gray-500 mb-5 h-10 rounded px-2"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                        <button className="w-full border p-2 rounded" onClick={get_anwser} onKeyDown={get_anwser}>送出</button>
                    </div>
                    

                    
                    {/* <div className="answer flex w-full justify-center border-t py-10">

                        <p>{aiAnswer}</p>
                    </div> */}


                </div>

            </div>
        </>
    )
}