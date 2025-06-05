import React, { useState } from 'react';

import Home from './component/Home';
import  SortingVisualizer from './component/SortingVisualizer';
import SearchingVisualizer from './component/SearchingVisualizer';
import StackQueueVisualizer from './component/StackQueueVisualizer';
import BinaryTreeVisualizer from './component/BinaryTreeVisualizer';

const TABS = [
  { label: 'Home', component: Home },
  { label: 'Sorting', component: SortingVisualizer },
  { label: 'Searching', component: SearchingVisualizer },
  { label: 'Stack & Queue', component: StackQueueVisualizer },
  { label: 'Binary Tree', component: BinaryTreeVisualizer }, // 👈 Add this
];
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

 return (
    <div>
      <div className="tab-bar">
        <button
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => setActiveTab(0)}
        >
          Home
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 0
          ? <Home setActiveTab={setActiveTab} />
          : React.createElement(TABS[activeTab].component)
        }
      </div>
    </div>
  );
}
