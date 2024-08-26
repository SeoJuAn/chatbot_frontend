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



// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
  
//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;
  
//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);
  
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let assistantMessage = { role: 'assistant', content: '' };
  
//       setMessages(prevMessages => [...prevMessages, assistantMessage]);
  
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value);
//         assistantMessage.content += chunk;
//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           newMessages[newMessages.length - 1] = { ...assistantMessage };
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // 에러 처리 로직 추가
//     } finally {
//       setIsLoading(false);
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




// 'use client';

// // 추가
// export const dynamic = 'force-dynamic';


// import { useState, useEffect, useRef } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
  
//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;
  
//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);
  
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       // 새 메시지 객체를 생성하고 상태에 추가
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);
  
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value);
        
//         // 새로운 청크를 받을 때마다 상태를 업데이트
//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += chunk;
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // 에러 처리 로직 추가
//     } finally {
//       setIsLoading(false);
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


// 'use client';

// export const dynamic = 'force-dynamic';

// import { useState, useEffect, useRef } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');

//       // 스트리밍 메시지를 시작하며 비어 있는 메시지를 먼저 추가
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });

//         // 새로운 청크를 받을 때마다 메시지를 업데이트
//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += chunk;
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
//     } finally {
//       setIsLoading(false);
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

// 'use client';

// export const dynamic = 'force-dynamic';

// import React, { useState, useEffect, useRef } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');

//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });

//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += chunk;
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderMessage = (message) => {
//     const codeBlockRegex = /```([\s\S]*?)```|(?:\b(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)[\s\S]*?;)|(?:^|\n)(?:import|from|def|class|if|for|while|try|except|with)[\s\S]*?(?:\n\n|\Z)/gi;
//     const parts = message.content.split(codeBlockRegex);
  
//     return parts.map((part, index) => {
//       if (codeBlockRegex.test(part) || part.trim().startsWith('```')) {
//         const code = part.replace(/```(python)?|```/gi, '').trim();
//         return (
//           <div key={index} className={styles.codeBlockContainer}>
//             <pre className={styles.codeBlock}>
//               <code>{code}</code>
//             </pre>
//             <button 
//               className={styles.copyButton}
//               onClick={() => navigator.clipboard.writeText(code)}
//             >
//               Copy code
//             </button>
//           </div>
//         );
//       }
//       return <span key={index}>{part}</span>;
//     });
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
//               {renderMessage(message)}
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


//===========================쿼리 구분은 잘되지만 모든 코드블록 아래에 차트가 생김============================
// 'use client';

// export const dynamic = 'force-dynamic';

// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import styles from './page.module.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');

//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });

//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += chunk;
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderMessage = (message) => {
//     const codeBlockRegex = /```([\s\S]*?)```|(?:\b(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)[\s\S]*?;)|(?:^|\n)(?:import|from|def|class|if|for|while|try|except|with)[\s\S]*?(?:\n\n|\Z)/gi;
//     const parts = message.content.split(codeBlockRegex);

//     const visualizeSQL = (sql) => {
//       // 임의의 데이터 생성
//       const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//       const data = labels.map(() => Math.floor(Math.random() * 100));

//       const newChartData = {
//         labels,
//         datasets: [
//           {
//             label: 'SQL Query Result',
//             data: data,
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           },
//         ],
//       };

//       setChartData(newChartData);
//     };

//     return parts.map((part, index) => {
//       if (codeBlockRegex.test(part) || part.trim().startsWith('```')) {
//         const code = part.replace(/```(python|sql)?|```/gi, '').trim();
//         const isSQL = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(code);

//         return (
//           <div key={index} className={styles.codeBlockContainer}>
//             <pre className={styles.codeBlock}>
//               <code>{code}</code>
//             </pre>
//             <div className={styles.buttonContainer}>
//               <button 
//                 className={styles.copyButton}
//                 onClick={() => navigator.clipboard.writeText(code)}
//               >
//                 Copy code
//               </button>
//               {isSQL && (
//                 <button 
//                   className={styles.visualizeButton}
//                   onClick={() => visualizeSQL(code)}
//                 >
//                   Visualizing SQL
//                 </button>
//               )}
//             </div>
//             {chartData && (
//               <div className={styles.chartContainer}>
//                 <Bar data={chartData} />
//               </div>
//             )}
//           </div>
//         );
//       }
//       return <span key={index}>{part}</span>;
//     });
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.topper}>
//         <div className={styles.icon}></div>
//         <div className={styles.name}>HanGPT</div>
//       </div>
//       <div className={styles.msgs_cont}>
//         <ul id="list_cont">
//           {messages.map((message, index) => (
//             <li key={index} className={message.role === 'user' ? styles.schat : styles.rchat}>
//               {renderMessage(message)}
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


//===========================헤당 코드블록 아래 차트가 생기지만 일반 텍스트와 쿼리의 구분이 잘 안됨============================
// 'use client';

// export const dynamic = 'force-dynamic';

// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import styles from './page.module.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');

//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });

//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += typeof chunk === 'string' ? chunk : '';
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderMessage = (message) => {
//     if (!message || typeof message.content !== 'string') {
//       return null;
//     }

//     const codeBlockRegex = /```([\s\S]*?)```|(?:\b(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)[\s\S]*?;)|(?:^|\n)(?:import|from|def|class|if|for|while|try|except|with)[\s\S]*?(?:\n\n|\Z)/gi;
//     const parts = message.content.split(codeBlockRegex);

//     return parts.map((part, index) => {
//       if (codeBlockRegex.test(part) || (typeof part === 'string' && part.trim().startsWith('```'))) {
//         return <CodeBlock key={index} code={part} />;
//       }
//       return <span key={index}>{part}</span>;
//     });
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.topper}>
//         <div className={styles.icon}></div>
//         <div className={styles.name}>HanGPT</div>
//       </div>
//       <div className={styles.msgs_cont}>
//         <ul id="list_cont">
//           {messages.map((message, index) => (
//             <li key={index} className={message.role === 'user' ? styles.schat : styles.rchat}>
//               {renderMessage(message)}
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

// function CodeBlock({ code }) {
//   const [chartData, setChartData] = useState(null);

//   const visualizeSQL = (sql) => {
//     // 임의의 데이터 생성
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//     const data = labels.map(() => Math.floor(Math.random() * 100));

//     const newChartData = {
//       labels,
//       datasets: [
//         {
//           label: 'SQL Query Result',
//           data: data,
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         },
//       ],
//     };

//     setChartData(newChartData);
//   };

//   if (typeof code !== 'string') {
//     return null;
//   }

//   const cleanedCode = code.replace(/```(python|sql)?|```/gi, '').trim();
//   const isSQL = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(cleanedCode);

//   return (
//     <div className={styles.codeBlockContainer}>
//       <pre className={styles.codeBlock}>
//         <code>{cleanedCode}</code>
//       </pre>
//       <div className={styles.buttonContainer}>
//         <button 
//           className={styles.copyButton}
//           onClick={() => navigator.clipboard.writeText(cleanedCode)}
//         >
//           Copy code
//         </button>
//         {isSQL && (
//           <button 
//             className={styles.visualizeButton}
//             onClick={() => visualizeSQL(cleanedCode)}
//           >
//             Visualizing SQL
//           </button>
//         )}
//       </div>
//       {chartData && (
//         <div className={styles.chartContainer}>
//           <Bar data={chartData} />
//         </div>
//       )}
//     </div>
//   );
// }





// 'use client';

// export const dynamic = 'force-dynamic';

// import React, { useState, useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import styles from './page.module.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chartData, setChartData] = useState({});
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');

//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value, { stream: true });

//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.content += chunk;
//           return newMessages;
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const visualizeSQL = (sql, index) => {
//     // 임의의 데이터 생성
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//     const data = labels.map(() => Math.floor(Math.random() * 100));

//     const newChartData = {
//       labels,
//       datasets: [
//         {
//           label: 'SQL Query Result',
//           data: data,
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         },
//       ],
//     };

//     setChartData(prevChartData => ({
//       ...prevChartData,
//       [index]: newChartData
//     }));
//   };

//   const renderMessage = (message, messageIndex) => {
//     const codeBlockRegex = /```([\s\S]*?)```/g;
//     const sqlRegex = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b[\s\S]*?;/gi;
    
//     let parts = [message.content];
//     let codeBlocks = message.content.match(codeBlockRegex) || [];
//     let sqlBlocks = message.content.match(sqlRegex) || [];
    
//     // 코드 블록과 SQL 쿼리를 모두 포함
//     let allBlocks = [...codeBlocks, ...sqlBlocks];
    
//     allBlocks.forEach((block, i) => {
//       parts = parts.flatMap(part => {
//         if (typeof part === 'string' && part.includes(block)) {
//           return [part.split(block)[0], block, part.split(block)[1]];
//         }
//         return part;
//       });
//     });
  
//     return parts.map((part, index) => {
//       if (codeBlocks.includes(part) || sqlBlocks.includes(part)) {
//         const code = part.replace(/```([\s\S]*?)```/g, '$1').trim();
//         const isSQL = sqlBlocks.includes(part);
  
//         return (
//           <div key={index} className={styles.codeBlockContainer}>
//             <pre className={styles.codeBlock}>
//               <code>{code}</code>
//             </pre>
//             <div className={styles.buttonContainer}>
//               <button 
//                 className={styles.copyButton}
//                 onClick={() => navigator.clipboard.writeText(code)}
//               >
//                 Copy code
//               </button>
//               {isSQL && (
//                 <button 
//                   className={styles.visualizeButton}
//                   onClick={() => visualizeSQL(code, `${messageIndex}-${index}`)}
//                 >
//                   Visualizing SQL
//                 </button>
//               )}
//             </div>
//             {chartData[`${messageIndex}-${index}`] && (
//               <div className={styles.chartContainer}>
//                 <Bar data={chartData[`${messageIndex}-${index}`]} />
//               </div>
//             )}
//           </div>
//         );
//       }
//       return <span key={index}>{part}</span>;
//     });
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
//               {renderMessage(message, index)}
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

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './page.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({});
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
      const decoder = new TextDecoder('utf-8');

      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.content += chunk;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error: ' + error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  // const visualizeSQL = (sql, index) => {
  //   // 임의의 데이터 생성
  //   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //   const data = labels.map(() => Math.floor(Math.random() * 100));

  //   const newChartData = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'SQL Query Result',
  //         data: data,
  //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //       },
  //     ],
  //   };

  //   setChartData(prevChartData => ({
  //     ...prevChartData,
  //     [index]: newChartData
  //   }));
  // };
  const visualizeSQL = (sql, index) => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = labels.map(() => Math.floor(Math.random() * 100));

    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');

    const newChartData = {
      labels,
      datasets: [
        {
          label: 'SQL Query Result',
          data: data,
          backgroundColor: gradient,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            color: 'rgb(255, 255, 255)'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 16
          },
          bodyFont: {
            size: 14
          },
          borderColor: 'rgba(255,255,255,0.8)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgb(255, 255, 255)'
          }
        },
        x: {
          ticks: {
            color: 'rgb(255, 255, 255)'
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: false
      }
    };

    setChartData(prevChartData => ({
      ...prevChartData,
      [index]: { data: newChartData, options: options }
    }));
  };

  
  const renderMessage = (message, messageIndex) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const sqlRegex = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b[\s\S]*?;/gi;
    
    let parts = [message.content];
    let codeBlocks = message.content.match(codeBlockRegex) || [];
    let sqlBlocks = message.content.match(sqlRegex) || [];
    
    // 코드 블록과 SQL 쿼리를 모두 포함
    let allBlocks = [...codeBlocks, ...sqlBlocks];
    
    allBlocks.forEach((block, i) => {
      parts = parts.flatMap(part => {
        if (typeof part === 'string' && part.includes(block)) {
          return [part.split(block)[0], block, part.split(block)[1]];
        }
        return part;
      });
    });
  
    return parts.map((part, index) => {
      if (codeBlocks.includes(part) || sqlBlocks.includes(part)) {
        const code = part.replace(/```([\s\S]*?)```/g, '$1').trim();
        const isSQL = sqlBlocks.includes(part);
  
        return (
          <div key={index} className={styles.codeBlockContainer}>
            <pre className={styles.codeBlock}>
              <code>{code}</code>
            </pre>
            <div className={styles.buttonContainer}>
              <button 
                className={styles.copyButton}
                onClick={() => navigator.clipboard.writeText(code)}
              >
                Copy code
              </button>
              {isSQL && (
                <button 
                  className={styles.visualizeButton}
                  onClick={() => visualizeSQL(code, `${messageIndex}-${index}`)}
                >
                  Visualizing SQL
                </button>
              )}
            </div>
            {chartData[`${messageIndex}-${index}`] && (
              <div className={styles.chartContainer}>
                <Bar data={chartData[`${messageIndex}-${index}`]} />
              </div>
            )}
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
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
              {renderMessage(message, index)}
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