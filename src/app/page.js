// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
  
//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });
      
//       const data = await response.json();
//       const assistantMessage = { role: 'assistant', content: data.response };
//       setMessages(prevMessages => [...prevMessages, assistantMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       // 에러 처리 로직 추가
//     }
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.topper}>
//         <div className={styles.icon}></div>
//         <div className={styles.name}>SeoJuAn's AI Assistant</div>
//       </div>
//       <div className={styles.msgs_cont}>
//         <ul id="list_cont">
//           {messages.map((message, index) => (
//             <li key={index} className={message.role === 'user' ? styles.schat : styles.rchat}>
//               {message.content}
//             </li>
//           ))}
//           <div ref={messagesEndRef} />
//         </ul>
//       </div>
//       <div className={styles.bottom}>
//         <form onSubmit={handleSubmit} className={styles.input}>
//           <input
//             type="text"
//             id="txt"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="메시지를 입력하세요..."
//           />
//           <button type="submit" className={`${styles.sendBtn} ${input.trim() ? styles.active : ''}`}>
//             <i className="uil uil-message"></i>
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { ...assistantMessage }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.topper}>
        <div className={styles.icon}></div>
        <div className={styles.name}>SeoJuAn's AI Assistant</div>
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