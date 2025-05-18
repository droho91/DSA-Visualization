// SortingVisualizer.jsx (đã cập nhật thêm các thuật toán)

import React from 'react';
import './SortingVisualizer.css';
import {
  getMergeSortAnimation,
  getBubbleSortAnimation,
  getSelectionSortAnimation,
  getInsertionSortAnimation,
  getShellSortAnimation,
  getQuickSortAnimation,
} from '../sortingAlgorithms/sortingAlgorithms';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

 runAnimations(animations) {
  const arrayBars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;

    if (!Array.isArray(animations[i])) continue;

    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      if (
        barOneIdx < 0 || barTwoIdx < 0 ||
        !arrayBars[barOneIdx] || !arrayBars[barTwoIdx]
      ) continue;

      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? 'red' : 'turquoise';
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        if (
          barIdx < 0 ||
          !arrayBars[barIdx] ||
          typeof newHeight !== 'number' ||
          isNaN(newHeight) ||
          newHeight < 1
        ) return;

        const barStyle = arrayBars[barIdx].style;
        barStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}



  mergeSort() {
    const animations = getMergeSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

 /* bubbleSort() {
    const animations = getBubbleSortAnimation(this.state.array);
    this.runAnimations(animations);
  }*/

 /* selectionSort() {
    const animations = getSelectionSortAnimation(this.state.array);
    this.runAnimations(animations);
  }*/

  insertionSort() {
    const animations = getInsertionSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  shellSort() {
    const animations = getShellSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

 /* quickSort() {
    const animations = getQuickSortAnimation(this.state.array);
    this.runAnimations(animations);
  }*/


  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate new Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.shellSort()}>Shell Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
