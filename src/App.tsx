// import { useState } from 'react'
// import './App.css'
// import {SubmitKey, GenerateKey} from "./components/Key.tsx"


// function EsempioConta(){
//   const [count, setCount] = useState(0)
//   return(
//     <>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//     </>
//   )
// }



// export default function App() {
//   return (
//     <>
//       <div>
//           <img src='/lightbulb.png' className="logo"/>
//       </div>
//       <h1>Welcome to <span className="lumenHighlight">Lumen</span> !</h1>
//       <SubmitKey/>
//       <GenerateKey/>
//     </>
//   )
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {SubmitKey, GenerateKey} from "./components/Key.tsx"
import Notes from "./components/Board.tsx"


function HomePage() {
  return (
    <>
      <div>
          <img src='/lightbulb.png' className="logo"/>
      </div>
      <h1>Welcome to <span className="lumenHighlight">Lumen</span> !</h1>
      <SubmitKey/>
      <GenerateKey/>
    </>
  )
}

function Board() {
  return (
    <>
      <Notes/>
    </>
  )
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </Router>
  );
}
