import { useState, useEffect } from 'react'
import './App.css'
import BotCollection from './Components/BotCollection'
import YourBotArmy from './Components/YourBotArmy'

function App() {
  const [bots, setBots] = useState([])
  const [army, setArmy]=useState([])
  

  useEffect(() => {
    fetch("https://botbattlr-json.onrender.com/bots")
    .then(res => res.json())
    .then(data => setBots(data))
  },[])
  
  const enlistBot = (bot) => {
    if(!army.find((b) => b.id === bot.id)){
      setArmy([...army,bot])
    }
  }
  const releaseBot = (bot) => {
    setArmy(army.filter(b => b.id !== bot.id));
  }
  const dischargeBot = (id) =>{
    fetch(`https://botbattlr-json.onrender.com/bots/${id}`, {
      method: "DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    setArmy(army.filter((b) => b.id !== id));
    setBots(bots.filter((b) => b.id !== id));

    
  }


  return (
    <>
    <h1>BotBattlr</h1>
    <YourBotArmy army={army} 
    setArmy={setArmy}
    releaseBot={releaseBot}
    dischargeBot={dischargeBot}
    />

    <BotCollection 
    bots = {bots}
    enlistBot={enlistBot}
    dischargeBot={dischargeBot}
    />


    </>
  )
}

export default App