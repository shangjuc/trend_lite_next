import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from '@/components/navbar/navbar';
import Loading from "@/components/_shared/loading/loading";
import Link from 'next/link';
import { useRouter } from "next/router";

// const title_msg = `ChatGPT test`;

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

const ChatWithAi = () =>{
    // console.log('chat gpt')
    const router = useRouter();
    const path_role = router.asPath.split("/")[2];

    const [trans_tw, setTransTw] = useState<I_TranslationData>({
        'kotoha': '琴葉',
        // 'ushio_noa': '生塩ノア',
        // 'gp': 'GP',
        // 'lawbot': 'Law Bot',
        // 'qsh_helper': 'QSH語法小幫手',
    })

    const [enterIsInput, setEnterIsInput] = useState(true);
    const [title_msg, setTitleMsg] = useState(`ChatGPT: ${translateWord(path_role)}`)
    const [userInput, setUserInput] = useState<string>('');
    const [aiRole, setAiRole] = useState<string>('kotoha');
    const [aiRoles, setAiRoles] = useState<string[] | []>([]);
    const [chatHistoryData, setChatHistoryData] = useState<I_ChatHistoryData>({
        'kotoha': [],
        'ai': [],
        // 'gp': [],
        // 'ushio_noa': [],
        // 'lawbot': [],
        // 'qsh_helper': [],
    })


    useEffect(() => {

        api_get_ai_roles()
        // let ai_roles: string[] = [];
        // Object.keys(chatHistoryData).forEach(role => {
        //     ai_roles.push(role);
        // })
        // setAiRoles(ai_roles);

    }, [])

    useEffect(() => {
        if (path_role in chatHistoryData) {
            setAiRole(path_role)
            setTitleMsg(`ChatGPT: ${translateWord(path_role)}`)
        }
        // console.log(aiRole, path_role)
    }, [path_role])

    function translateWord(text: string): string {
        if (trans_tw[text as keyof I_TranslationData]) {
            return trans_tw[text]
        } else {
            return text.toUpperCase()
        }
    }

    function api_get_ai_roles(){
        let headers = {
            "Content-Type": "application/json",
        }
        // let params = { q: '', role: '' }
        fetch(`http://localhost:5566/api/chatgpt/ai_roles`, {
            method: "GET",
            headers: headers,
            // body: JSON.stringify(params),
        })
        .then(res => {
            // console.log(res)
            return res.json();
        })
        .then((myJson: any[]) => {
            let ai_roles: string[] = [];
            let nob = { ...chatHistoryData }
            let ntrans = { ...trans_tw }
            myJson.forEach((obj) => {
                console.log(obj.role);
                nob = {
                    ...nob,
                    [obj.role]: []
                }
                ntrans = {
                    ...ntrans,
                    [obj.role]: obj.name
                }
                ai_roles.push(obj.role);
            })
            console.log(nob, ntrans)
            setAiRoles(ai_roles);
            setChatHistoryData(nob);
            setTransTw(ntrans);
            // console.log(chatHistoryData)
        })
        .catch((err)=>{
            console.log(err)
        })
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
            let answer: string = '';

            if(myJson && myJson.answer){
                if(typeof myJson.answer === 'string'){
                    answer = myJson.answer || '';
                } else if (myJson.answer.error && typeof myJson.answer.error.message === 'string'){
                    answer = myJson.answer.error.message;
                }
            }

            if (temp_history[temp_history.length - 1]) {
                temp_history[temp_history.length - 1].ai_answer = answer;
                temp_history[temp_history.length - 1].is_loading = false;
            }
            setChatHistoryData({
                ...chatHistoryData,
                [ai_role as keyof I_ChatHistoryData]: temp_history
            });
            console.log(chatHistoryData)

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
        // console.log(event.code, event.target.value)

    }

    function handleKeyDown(event: any) {
        // setUserInput(String(event.target.value));
        // console.log(event.key, event.target.value)
        
        
        if (event.key === 'Enter' && enterIsInput) {

            let aaa = chatHistoryData[aiRole as keyof I_ChatHistoryData].length - 1;

            if (aaa >= 0 && chatHistoryData[aiRole as keyof I_ChatHistoryData][aaa].ai_answer === '(...)') {

                return
            }　else if (userInput.trim().length === 0) {
                setTimeout(() => {
                    event.target.value = ''.trim();
                    setUserInput(''.trim());

                }, 0);
                // return;  
            } else {

                submitUserInput()
                setTimeout(() => {
                    event.target.value = ''.trim();
                    setUserInput(''.trim());
                    
                }, 100);
            }
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
            <div className=" flex w-full justify-center items-center px-5">

                <div className="card flex flex-wrap justify-center w-full md:w-[768px] min-w-[300px] h-auto px-5 sm:px-10 border rounded border-white">
                    <div className="sticky top-0 pt-6 w-full bg-black ">
                        {/* <h1>{path_role}</h1> */}
                        <h1 className=" text-center mb-3 text-white">{aiRole === 'kotoha' ? '我婆琴葉' : translateWord(aiRole)}模擬器</h1>
                        {/* <Loading /> */}
                        <div className="btn-container flex w-full flex-wrap">
                            {aiRoles.map((item, idx) => {
                                return <Link href={"/chatgpt/" + item} key={idx} className={(aiRole === item ? ' bg-slate-500' : '') + " border rounded px-5 py-1 mr-1 mb-1"} onClick={() => { selectAiRole(item) }}>{translateWord(item)}</Link>

                            })}
                        </div>
                    </div>


                    {chatHistoryData[aiRole as keyof I_ChatHistoryData] &&
                        chatHistoryData[aiRole as keyof I_ChatHistoryData].map((item, index) =>
                            <div key={index} className="w-full border-b py-10" >
                                <div>
                                    <p>Q: {item.user_input}</p>
                                    <p className=" text-gray-500 text-sm">(字數：{item.user_input.length})</p>
                                </div>
                                <div className="mt-8 break-words">
                                    <span className="mr-1">{translateWord(aiRole)}:</span>
                                    {item.ai_answer === '(...)' ?
                                        <Loading /> : item.ai_answer
                                    }
                                    <p className=" text-gray-500 text-sm">(字數：{item.ai_answer.length})</p>
                                </div>
                            </div>
                        )}
                    {/* {isLoading && <div className="w-full">Loading...</div>} */}
                    <div className="user-input flex flex-wrap w-full justify-center items-center py-10">
                        <div className="w-full mb-2 flex ">
                            <span>目前字數：{userInput.length}</span> 
                            <button className="ml-auto" onClick={() => { setEnterIsInput(!enterIsInput) }}>
                                <input type="checkbox" name="" id="" checked={enterIsInput} onChange={() => { }}/>
                                按Enter即送出
                            </button>
                        </div>
                        <textarea placeholder="輸入想問的問題" className=" w-full text-gray-500 mb-5 h-20 rounded p-2"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} 
                            value={userInput} />
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

export default ChatWithAi;