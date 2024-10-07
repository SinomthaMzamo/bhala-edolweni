import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './features/counter/Counter'
import Sidebar from './features/sidebar/SideBar'
import View from './features/main/View'

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
        break;
      case 'edit':
        // update main conttent to show "view all debtors page"
        break;
      case 'close':
        // update main conttent to show "view all debtors page"
        break;
    }
    return <form>
      <label htmlFor="firstInput">{page}</label>
      <input id="firstInput" type="text" />
      <button type="submit">submit</button>
    </form>
    
  }

  return (
    <div style={{display:'flex', border: 'solid 2px yellow', padding: '0.9em'}} >
      <Sidebar updateView={updateView}/>
      {renderSelectedMainContent()}
    </div>
  );
}

export default App
