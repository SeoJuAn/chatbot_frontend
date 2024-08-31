// 24.08.30 ver2 - add loading spinner
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
//           {isLoading && (
//             <li className={styles.rchat}>
//               <div className={styles.loadingLogo}>
//                 <div className={styles.loadingSpinner}></div>
//               </div>
//             </li>
//           )}
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


// // 24.08.31 ver1 - execute sql
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

//   const visualizeSQL = async (sql, index) => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sql`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sql: sql }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
  
//       if (data.length === 0) {
//         console.log("No data returned from the query");
//         return;
//       }
  
//       // 동적으로 컬럼 추출
//       const columns = Object.keys(data[0]);
      
//       // 첫 번째 컬럼을 라벨로 사용
//       const labels = data.map(item => item[columns[0]]);
  
//       // 나머지 컬럼들을 데이터셋으로 사용
//       const datasets = columns.slice(1).map((column, i) => ({
//         label: column,
//         data: data.map(item => item[column]),
//         backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
//       }));
  
//       const newChartData = {
//         labels,
//         datasets,
//       };
  
//       setChartData(prevChartData => ({
//         ...prevChartData,
//         [index]: newChartData
//       }));
  
//       console.log(newChartData);
//       console.log(setChartData);
  
//     } catch (error) {
//       console.error('Error visualizing SQL:', error);
//       // 에러 처리를 위한 상태 업데이트나 사용자에게 알림을 추가할 수 있습니다.
//     }
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
//           {isLoading && (
//             <li className={styles.rchat}>
//               <div className={styles.loadingLogo}>
//                 <div className={styles.loadingSpinner}></div>
//               </div>
//             </li>
//           )}
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

// 24.09.01 ver1 - chart option
'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './page.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({});
  const [chartType, setChartType] = useState('bar');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedFacts, setSelectedFacts] = useState([]);
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

  const visualizeSQL = async (sql, index) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: sql }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        console.log("No data returned from the query");
        return;
      }

      // 동적으로 컬럼 추출
      const columns = Object.keys(data[0]);
      
      // 컬럼 타입 분류
      const dimensionColumns = columns.filter(col => typeof data[0][col] === 'string');
      const factColumns = columns.filter(col => typeof data[0][col] === 'number');

      // 초기 선택
      const initialDimension = dimensionColumns[0] || '';
      const initialFacts = [factColumns[0]] || [];
      setSelectedDimension(initialDimension);
      setSelectedFacts(initialFacts);

      const newChartData = {
        labels: data.map(item => item[initialDimension]),
        datasets: initialFacts.map((fact, i) => ({
          label: fact,
          data: data.map(item => item[fact]),
          backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
        })),
      };

      setChartData(prevChartData => ({
        ...prevChartData,
        [index]: {
          data: newChartData,
          rawData: data,
          dimensions: dimensionColumns,
          facts: factColumns,
        }
      }));

    } catch (error) {
      console.error('Error visualizing SQL:', error);
    }
  };

  const updateChart = (index) => {
    const chartInfo = chartData[index];
    if (!chartInfo) return;

    const newChartData = {
      labels: chartInfo.rawData.map(item => item[selectedDimension]),
      datasets: selectedFacts.map((fact, i) => ({
        label: fact,
        data: chartInfo.rawData.map(item => item[fact]),
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
      })),
    };

    setChartData(prevChartData => ({
      ...prevChartData,
      [index]: {
        ...prevChartData[index],
        data: newChartData,
      }
    }));
  };

  const renderChart = (chartInfo, index) => {
    const ChartComponent = chartType === 'bar' ? Bar : (chartType === 'line' ? Line : Scatter);
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartControls}>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="scatter">Scatter</option>
          </select>
          <select 
            value={selectedDimension} 
            onChange={(e) => {
              setSelectedDimension(e.target.value);
              updateChart(index);
            }}
          >
            {chartInfo.dimensions.map(dim => (
              <option key={dim} value={dim}>{dim}</option>
            ))}
          </select>
          <select 
            multiple 
            value={selectedFacts} 
            onChange={(e) => {
              setSelectedFacts(Array.from(e.target.selectedOptions, option => option.value));
              updateChart(index);
            }}
          >
            {chartInfo.facts.map(fact => (
              <option key={fact} value={fact}>{fact}</option>
            ))}
          </select>
        </div>
        <ChartComponent data={chartInfo.data} />
      </div>
    );
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
            {chartData[`${messageIndex}-${index}`] && renderChart(chartData[`${messageIndex}-${index}`], `${messageIndex}-${index}`)}
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
        <div className={styles.name}>HanGPT</div>
      </div>
      <div className={styles.msgs_cont}>
        <ul id="list_cont">
          {messages.map((message, index) => (
            <li key={index} className={message.role === 'user' ? styles.schat : styles.rchat}>
              {renderMessage(message, index)}
            </li>
          ))}
          {isLoading && (
            <li className={styles.rchat}>
              <div className={styles.loadingLogo}>
                <div className={styles.loadingSpinner}></div>
              </div>
            </li>
          )}
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