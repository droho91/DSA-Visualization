import React, { useState } from 'react';
import  SortingVisualizer from './component/SortingVisualizer';
import SearchingVisualizer from './component/SearchingVisualizer';
/*import GraphVisualizer from './GraphVisualizer/GraphVisualizer';
import StackQueueVisualizer from './StackQueueVisualizer/StackQueueVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer/LinkedListVisualizer';*/

const TABS = [
  { label: 'Sorting', component: <SortingVisualizer /> },
  { label: 'Searching', component: <SearchingVisualizer /> },
  /*{ label: 'Graph (BFS/DFS)', component: <GraphVisualizer /> },
  { label: 'Stack & Queue', component: <StackQueueVisualizer /> },
  { label: 'Linked List', component: <LinkedListVisualizer /> },*/
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tab-bar">
        {TABS.map((tab, idx) => (
          <button
            key={tab.label}
            className={activeTab === idx ? 'active' : ''}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {TABS[activeTab].component}
      </div>
    </div>
  );
}