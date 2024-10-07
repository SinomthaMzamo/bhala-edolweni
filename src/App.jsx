import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './features/counter/Counter'
import Sidebar from './features/sidebar/SideBar'
import View from './features/main/View'
import Update from "./features/main/Update.jsx";

function App() {
  const [page, switchPage] = useState("");

  // Log the current page whenever it changes
  useEffect(() => {
    console.log({ page });
  }, [page]);

  const updateView = (view) =>{
    switchPage(view);
  }

  const renderSelectedMainContent = () => {
    switch (page) {
      case 'view':
        // update main conttent to show "view all debtors page"
        return <View/>
      case 'add':
        // update main conttent to show "view all debtors page"
        return <form style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="debtorName">
            Name:
            <input id="debtorName" type="text"/>
          </label>

          <label htmlFor="amount">
            Amount:
            <input id="amount" type="text"/>
          </label>

          <button type="submit">submit</button>
        </form>
      case 'edit':
        // update main conttent to show "view all debtors page"
        return <Update/>
      case 'close':
        // update main conttent to show "view all debtors page"
        break;
    }
    return <form>
      <label htmlFor="debtorName">{page}</label>
      <input id="firstInput" type="text"/>
      <button type="submit">submit</button>
    </form>
    
  }

  return (
    <div style={{display:'flex', border: 'solid 2px wheat', padding: '0.9em', background:'lightgray'}} >
      <Sidebar updateView={updateView}/>
      {renderSelectedMainContent()}
    </div>
  );
}

export default App
