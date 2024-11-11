import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './features/counter/Counter'
import Sidebar from './features/sidebar/SideBar'
import View from './features/main/View'
import Update from "./features/main/Update.jsx";
import AddForm from './ui/AddForm.jsx';
import Tab from "./features/sidebar/Tab.jsx";

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
        return <AddForm/>
      case 'edit':
        // update main conttent to show "view all debtors page"
        return <Update/>
      case 'close':
        // update main conttent to show "view all debtors page"
        break;
    }
    return <form>
      <label htmlFor="firstInput">{page}</label>
      <input id="firstInput" type="text"/>
      <button type="submit">submit</button>
    </form>
    
  }

  return (
    <div className="">

      <h1 className='dancing-script'>Bhala edolweni...</h1>
      <div className="rect-wrapper"  style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <div className="button-wrapper" style={{width: '200px'}}>
          <Tab icon={"fas fa-add"} tabTitle={'Add New Debtor'} isCollapsed={false}
               handleViewChange={() => updateView('add')}></Tab>
        </div>
        <form action="/search" method="GET">
          <input type="search" name="query" placeholder="Search here..."/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div style={{display: 'flex', border: 'solid 2px wheat', padding: '0.9em', background: 'lightgray'}}>
        <Sidebar updateView={updateView}/>
        {renderSelectedMainContent()}
      </div>
    </div>
  );
}

export default App
