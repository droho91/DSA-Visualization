import React, { useState, useRef, useEffect } from 'react';
import BinaryTreeVisualization from '../visualization/BinaryTreeVisualization';
import './BinaryTreeVisualizer.css';

function buildBinaryTree(values) {
  if (!values || values.length === 0) return { root: null };
  
  const root = { value: values[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (i < values.length && queue.length > 0) {
    const current = queue.shift();

    if (values[i] !== undefined && values[i] !== null) {
      current.left = { value: values[i], left: null, right: null };
      queue.push(current.left);
    }
    i++;

    if (values[i] !== undefined && values[i] !== null) {
      current.right = { value: values[i], left: null, right: null };
      queue.push(current.right);
    }
    i++;
  }

  return { root };
}

const BinaryTreeVisualizer = () => {
  const [inputValue, setInputValue] = useState('1,2,3,4,5,6,7');
  const containerRef = useRef(null);
  const [treeData, setTreeData] = useState(null);
  const visualizationRef = useRef(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [traversalType, setTraversalType] = useState('');

  const buildTree = () => {
    const values = inputValue
      .split(',')
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val));
    const data = buildBinaryTree(values);
    setTreeData(data);
    setTraversalOrder([]);
    setTraversalType('');
  };

  useEffect(() => {
    if (treeData && containerRef.current) {
      containerRef.current.innerHTML = '';
      visualizationRef.current = new BinaryTreeVisualization(containerRef.current, treeData);
    }
  }, [treeData]);

  const traverse = async (type) => {
    if (visualizationRef.current) {
      setTraversalType(type);
      const nodes = [];
      const traverseFunc = {
        preorder: visualizationRef.current.preOrderTraversal.bind(visualizationRef.current),
        inorder: visualizationRef.current.inOrderTraversal.bind(visualizationRef.current),
        postorder: visualizationRef.current.postOrderTraversal.bind(visualizationRef.current)
      }[type];
      
      if (traverseFunc) {
        traverseFunc(visualizationRef.current.root, nodes);
        setTraversalOrder(nodes.map(node => node.value));
        await visualizationRef.current.traverse(type);
      }
    }
  };

  return (
    <div className="visualizer-container">
      <h2>Binary Tree Visualizer</h2>
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter values separated by commas"
        />
        <button onClick={buildTree}>Build Tree</button>
        <div className="traversal-buttons">
          <button onClick={() => traverse('preorder')}>Pre-order</button>
          <button onClick={() => traverse('inorder')}>In-order</button>
          <button onClick={() => traverse('postorder')}>Post-order</button>
        </div>
      </div>
      <div ref={containerRef} className="tree-visualization"></div>
      {traversalOrder.length > 0 && (
        <div className="traversal-order">
          <h3>{traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal:</h3>
          <div className="order-display">
            {traversalOrder.join(' → ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default BinaryTreeVisualizer;