import React, { useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar'
const title_msg = `ChatGPT test`;

interface I_Chat {
    user_input: string;
    ai_answer: string;
    is_loading: boolean;
}
interface I_ChatHistoryData {
    kotoha: I_Chat[]|[];
    gp: I_Chat[]|[];
    ai: I_Chat[]|[];
}

export default function ChatGPT() {

    const [userInput, setUserInput] = useState<string>('');
    const [aiRole, setAiRole] = useState<string>('kotoha');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatHistoryData, setChatHistoryData] = useState<I_ChatHistoryData>({
        'kotoha': [],
        'gp': [],
        'ai': []
    })


    function get_anwser(user_input:string, ai_role:string) {
        console.log(user_input);
        if (!user_input) return;
        // let params = { q: user_input }
        // if (isLoading) return;
        let temp_history:I_Chat[] = chatHistoryData[ai_role as keyof I_ChatHistoryData];
        if(temp_history[temp_history.length - 1].is_loading) return;
        temp_history[temp_history.length - 1].is_loading = true;
        setChatHistoryData({
            ...chatHistoryData,
            [ai_role as keyof I_ChatHistoryData]: temp_history
        });
        setIsLoading(true);
        setUserInput('');

        fetch(`http://localhost:5566/api/chatgpt?q=${user_input}&role=${ai_role}`)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(myjson => {
                console.log(myjson)
                if (typeof myjson?.answer === 'string') {
                    setIsLoading(false);
                    temp_history[temp_history.length - 1].ai_answer = myjson.answer;
                    temp_history[temp_history.length - 1].is_loading = false;
                    setChatHistoryData({
                        ...chatHistoryData,
                        [ai_role as keyof I_ChatHistoryData]: temp_history
                    });
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
            let ai_role = aiRole;
            let user_input = userInput;
            if (!user_input) return;
            let temp_history:I_Chat[] = chatHistoryData[ai_role as keyof I_ChatHistoryData];
            if(temp_history[temp_history.length - 1]?.is_loading) return;

            temp_history.push({ user_input: user_input, ai_answer: '(...)', is_loading:false });
            // chatHistoryData[temp_ai_role as keyof I_ChatHistoryData] = temp_history;
            setChatHistoryData({
                ...chatHistoryData,
                [ai_role as keyof I_ChatHistoryData]: temp_history
            });
            // console.log(chatHistoryData)
            get_anwser(user_input, ai_role);
            event.target.value = '';
        }

    }

    const selectAiRole = (role:string)=>{
        // let temp_history:I_Chat[] = chatHistoryData[role as keyof I_ChatHistoryData];
        // console.log(chatHistoryData)
        setAiRole(role);
    }




    return (
        <>
            <Head>
                <title>{title_msg}</title>
            </Head>
            <Navbar />
            <div className=" flex w-full justify-center items-center">
                <div className="card flex flex-wrap justify-center w-1/2 h-auto p-10 border rounded border-white">
                    <h1 className=" text-center mb-3">{aiRole === 'kotoha' ? '我婆琴葉' : aiRole.toUpperCase()}模擬器</h1>
                    <div className="btn-container flex w-full">
                        {['kotoha', 'gp', 'ai'].map((item,idx)=>{
                            return <button key={idx} className={ (aiRole===item? ' bg-slate-500': '') + " border rounded px-5 py-1 mr-1"}  onClick={() => { selectAiRole(item) }}>{item.toUpperCase()}</button>
                        })}
                    </div>


                    {chatHistoryData[aiRole as keyof I_ChatHistoryData].map((item, index) =>

                        true &&
                        <div key={index} className="w-full border-b py-10" >
                            <p>Q: {item.user_input}</p>
                            <p>{aiRole.toLocaleUpperCase()}: {item.ai_answer}</p>

                        </div>
                    )}
                    {/* {isLoading && <div className="w-full">Loading...</div>} */}
                    <div className="user-input flex flex-wrap w-full justify-center items-center py-10">
                        <input type="text" placeholder="輸入想問的問題" className=" w-full text-gray-500 mb-5 h-10 rounded px-2"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                        <button className="w-full border p-2 rounded" onClick={()=>get_anwser(userInput, aiRole)}>送出</button>
                    </div>



                    {/* <div className="answer flex w-full justify-center border-t py-10">

                        <p>{aiAnswer}</p>
                    </div> */}


                </div>

            </div>
        </>
    )
}