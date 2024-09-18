import React, { createContext, useState } from 'react';
import run from '../config/gemini';

export const MyContext = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    
    const delayParfa =(index,nextWord)=>
    {

        setTimeout(function()
    {
        setResultData(prev=>prev+nextWord)

    },75*index)

    }
    const formatResponse = (response) => {
        // Replace ** with <b> and * with new lines
        const formattedResponse = response
            .split('\n')
            .map(line => line
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold text
                .replace(/\*(.*?)\*/g, '<br/>$1<br/>') // New line
            )
            .join('<br/>'); // Join lines with <br/> for separation

        return formattedResponse;
    };

    const onSent = async (Prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true)
        
        setRecentPrompt(input);
        setPrevPrompts(prev=>[...prev,input])
        try {
            const response = await run(input);
            const formattedResponse = formatResponse(response);
            
            let newResponseArray=formattedResponse.split(" ");
            for(let i=0;i<newResponseArray.length;i++)
            {
                const nextWord=newResponseArray[i];
                delayParfa(i,nextWord+" ")
            }
            setShowResult(true);
        } catch (error) {
            console.error('Error in onSent:', error);
            setResultData('Error occurred');
            setShowResult(true);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
};

export default ContextProvider;
