import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar';
import Loading from "@/components/_shared/loading/loading";

const title_msg = `ChatGPT test`;

interface I_Chat {
    user_input: string;
    ai_answer: string;
    is_loading: boolean;
}
interface I_ChatHistoryData {
    [role: string]: I_Chat[] | [];
}

interface I_TranslationData {
    [text: string]: string
}

export default function ChatGPT() {
    // console.log('chat gpt')

    const [userInput, setUserInput] = useState<string>('');
    const [aiRole, setAiRole] = useState<string>('kotoha');
    const [aiRoles, setAiRoles] = useState<string[] | []>([]);
    const [chatHistoryData, setChatHistoryData] = useState<I_ChatHistoryData>({
        'kotoha': [],
        'gp': [],
        // 'ai': [],
        'ushio_noa': [],
    })

    useEffect(() => {
        let ai_roles: string[] = [];
        Object.keys(chatHistoryData).forEach(role => {
            ai_roles.push(role);
        })
        setAiRoles(ai_roles);
        console.log(chatHistoryData)
    }, [])

    function translateWord(text: string): string {
        let trans_tw: I_TranslationData = {
            'kotoha': '琴葉',
            'ushio_noa': '生塩ノア',
            'gp': 'GP'
        }
        if (trans_tw[text as keyof I_TranslationData]) {
            return trans_tw[text]
        } else {
            return text.toUpperCase()
        }
    }

    function submitUserInput() {
        let ai_role = aiRole;
        let user_input = userInput;
        if (!user_input) return;
        let temp_history: I_Chat[] = chatHistoryData[ai_role as keyof I_ChatHistoryData];
        if (temp_history[temp_history.length - 1]?.is_loading) return;

        temp_history.push({ user_input: user_input, ai_answer: '(...)', is_loading: true });
        // chatHistoryData[temp_ai_role as keyof I_ChatHistoryData] = temp_history;
        setChatHistoryData({
            ...chatHistoryData,
            [ai_role as keyof I_ChatHistoryData]: temp_history
        });
        setUserInput('');
        let headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            // "Accept": "application/json",
            "Content-Type": "application/json",
        }
        let params = { q: user_input, role: ai_role }

        // fetch(`http://localhost:5566/api/chatgpt?q=${user_input}&role=${ai_role}`)
        fetch(`http://localhost:5566/api/chatgpt`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params),
            // body:encodeURI(JSON.stringify(params)),

        })
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(myJson => {
                console.log(myJson)
                let answer: string = myJson?.answer || '';

                if (temp_history[temp_history.length - 1]) {
                    temp_history[temp_history.length - 1].ai_answer = answer;
                    temp_history[temp_history.length - 1].is_loading = false;
                }
                setChatHistoryData({
                    ...chatHistoryData,
                    [ai_role as keyof I_ChatHistoryData]: temp_history
                });
            })
            .catch(err => {
                console.log(err)
                if (temp_history[temp_history.length - 1]) {
                    temp_history[temp_history.length - 1].ai_answer = '不好意思，請再問一次><';
                    temp_history[temp_history.length - 1].is_loading = false;
                }
                setChatHistoryData({
                    ...chatHistoryData,
                    [ai_role as keyof I_ChatHistoryData]: temp_history
                });
            })


        // temp_history[temp_history.length - 1].is_loading = true;
    }


    function handleChange(event: any) {
        setUserInput(event.target.value);

    }
    function handleKeyDown(event: any) {

        // console.log(e);
        // setUserInput(e.target.value);
        if (event.key === 'Enter') {
            // event.target.value = '';
            submitUserInput()
        }

    }


    const selectAiRole = (role: string) => {
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

                <div className="card flex flex-wrap justify-center w-1/2 sm:w-full md:w-2/3 lg:w-1/2 h-auto px-10 border rounded border-white">
                    <div className="sticky top-0 pt-6 w-full bg-black ">

                        <h1 className=" text-center mb-3">{aiRole === 'kotoha' ? '我婆琴葉' : translateWord(aiRole)}模擬器</h1>
                        <Loading />
                        <div className="btn-container flex w-full">
                            {aiRoles.map((item, idx) => {
                                return <button key={idx} className={(aiRole === item ? ' bg-slate-500' : '') + " border rounded px-5 py-1 mr-1"} onClick={() => { selectAiRole(item) }}>{translateWord(item)}</button>
                            })}
                        </div>
                    </div>


                    {chatHistoryData[aiRole as keyof I_ChatHistoryData] &&
                        chatHistoryData[aiRole as keyof I_ChatHistoryData].map((item, index) =>
                            <div key={index} className="w-full border-b py-10" >
                                <p>Q: {item.user_input}</p>
                                <p className="">
                                    <span className="mr-1">{translateWord(aiRole)}:</span> {item.ai_answer === '(...)' ? <Loading /> : item.ai_answer}
                                </p>
                            </div>
                        )}
                    {/* {isLoading && <div className="w-full">Loading...</div>} */}
                    <div className="user-input flex flex-wrap w-full justify-center items-center py-10">
                        <input type="text" placeholder="輸入想問的問題" className=" w-full text-gray-500 mb-5 h-10 rounded px-2"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} value={userInput} />
                        <button className="w-full border p-2 rounded" onClick={() => submitUserInput()}>送出</button>
                    </div>



                    {/* <div className="answer flex w-full justify-center border-t py-10">

                        <p>{aiAnswer}</p>
                    </div> */}


                </div>

            </div>
        </>
    )
}