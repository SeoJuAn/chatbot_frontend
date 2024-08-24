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
//       const response = await fetch('http://localhost:8000/chat', {
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

import { useState } from 'react'
 
export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userMessage = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })
      
      const data = await response.json()
      const assistantMessage = { role: 'assistant', content: data.response }
      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
    }
    
    setInput('')
  }

  return (
    <main>
      <h1>HanGPT Chatbot</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}: </strong>{message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit">전송</button>
      </form>
    </main>
  )
}