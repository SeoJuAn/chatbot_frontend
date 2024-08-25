// 'use client';

// import { useState } from 'react'
 
// export default function Home() {
//   const [input, setInput] = useState('')
//   const [messages, setMessages] = useState([])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const userMessage = { role: 'user', content: input }
//     setMessages(prevMessages => [...prevMessages, userMessage])
    
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       })
      
//       const data = await response.json()
//       const assistantMessage = { role: 'assistant', content: data.response }
//       setMessages(prevMessages => [...prevMessages, assistantMessage])
//     } catch (error) {
//       console.error('Error:', error)
//       // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
//     }
    
//     setInput('')
//   }

//   return (
//     <main>
//       <h1>HanGPT Chatbot</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.role}: </strong>{message.content}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="메시지를 입력하세요..."
//         />
//         <button type="submit">전송</button>
//       </form>
//     </main>
//   )
// }

  
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.topper}>
        <div className={styles.icon}></div>
        <div className={styles.name}>HanGPT</div>
      </div>
      <div className={styles.msgs_cont}>
        <ul id="list_cont">
          {messages.map((message, index) => (
            <li key={index} className={message.role === 'user' ? styles.schat : styles.rchat}>
              {message.content}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>
      <div className={styles.bottom}>
        <form onSubmit={handleSubmit} className={styles.input}>
          <input
            type="text"
            id="txt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <button type="submit" className={`${styles.sendBtn} ${input.trim() ? styles.active : ''}`}>
            <i className="uil uil-message"></i>
          </button>
        </form>
      </div>
    </main>
  );
}