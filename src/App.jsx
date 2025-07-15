import { useState } from "react"
import { URL } from "./constants";
import Answer from "./components/Answer";


function App() {
  const [ques, setQues] = useState('');
  const [result, setResult] = useState([])
  const payload = {
    "contents": [
      {
        "parts": [{ "text": ques }]
      }
    ] 
  }
  const askQuestion = async () => {
    let response = await fetch(URL + 'AIzaSyB_F1meNmpRoMVMn8PVpkCxGPCJFk5XUzU', {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json()
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())
    console.log(dataString);
 
    setResult([...result, { type: 'q', text: ques }, { type: 'a', text: dataString }]);
  }
  console.log(result);

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 bg-zinc-800 h-screen text-center">

      </div>
      <div className="col-span-4 p-10">
        <h1 className="p-2 text-center glow-text m-auto w-full font-semibold text-5xl capitalize bg-gradient-to-r from-[#8e8fff] via-[#ff66c4] to-[#66ffcc] inline-block text-transparent bg-clip-text ">How may i assist you?</h1>
        <div className="container h-80 text-white">
          <ul>{
            result.map((answer, index) => (
              answer.type === 'q' ? <li key={index + Math.random()}><Answer index={index} ans={answer.text} totalResult={1} /></li>
                :
                answer.text.map((ansItem, ansIndex) => (
                  <li key={ansIndex + Math.random()}><Answer index={ansIndex} ans={ansItem} totalResult={ansItem.length} /></li>
                ))
            ))
          }</ul>
          {/* <ul>
        {
          result && result.map((answer,index)=>(
            <li key={index+Math.random()}><Answer index={index} ans={answer} totalResult={result.length}/></li>
          ))
        }
      </ul> */}
        </div>
        <div className="bg-zinc-800 w-1/2 m-auto text-white rounded-2xl border-1 border-zinc-700 flex h-16 p-1 pr-5">
          <input type="text" value={ques} onChange={(event) => setQues(event.target.value)} placeholder="Ask me anything" className="w-full h-full p-4 outline-none" />
          <button className="border-none outline-none cursor-pointer" onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
