import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { MyContext } from '../../context/ContextTemp';
import parse from 'html-react-parser';


function Main() {
    // Destructure showResult along with other values from context
    const { onSent, setInput, input, showResult,recentPrompt,resultData,loading } = useContext(MyContext);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult
                ?
                <>
                    <div className="greet">
                        <p><span>Hello, Man</span></p>
                        <p>How Can I Help</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggestions for places</p>
                            <img src={assets.compass_icon} alt="Compass Icon" />
                        </div>
                        <div className="card">
                            <p>Locations</p>
                            <img src={assets.bulb_icon} alt="Locations Icon" />
                        </div>
                        <div className="card">
                            <p>Suggestions for places</p>
                            <img src={assets.message_icon} alt="Message Icon" />
                        </div>
                        <div className="card">
                            <p>Codes for optimization</p>
                            <img src={assets.code_icon} alt="Code Icon" />
                        </div>
                    </div>
                </>
                : 
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="User Icon" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="Gemini Icon" />
                        {loading
                        ?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                       
                        : (<div>{parse(resultData)}</div>
                        )}
                    </div>
                    </div>
                    }
            
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder="Enter the Prompt" 
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <img 
                                onClick={onSent} // No need to pass input as it's handled in Context
                                src={assets.send_icon} 
                                alt="Send Icon" 
                            />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
