import { useState } from "react";

type Props = {
    disabled?: boolean;
    onSubmit: (text: string, answer: string) => void;
}

    
export default function SubmitQuestion({ disabled, onSubmit }: Props) {
    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");

    function submit() {
        const t = text.trim();
        const a = answer.trim();
        if (!t || !a) return;
        onSubmit(t, a);
        setText("");
        setAnswer("");
    }

    return(
        <div className="card">
            <h3>Submit a question</h3>
            <div>
                <input 
                    style={{width:"100%"}}
                    disabled={disabled} 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Question (e.g. What is ADUC short for?)"
                />
                <input 
                    style={{width:"100%"}}
                    disabled={disabled} 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Answer (e.g. Active Directory Users and Computers)"
                />
                <br/>
                <button disabled={disabled} onClick={submit}>Submit</button>
            </div>
        </div>
    )
}