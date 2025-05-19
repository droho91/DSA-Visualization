import React from 'react';
import './SortingVisualizer.css';
import {
  getMergeSortAnimation,
  getBubbleSortAnimation,
  getSelectionSortAnimation,
  getInsertionSortAnimation,
  getShellSortAnimation,
  getQuickSortAnimation,
} from '../sortingAlgorithms'

const ANIMATION_SPEED_MS = 1;
const DEFAULT_NUMBER_OF_ARRAY_BARS = 100;
const DEFAULT_BAR_COLOR = '#06b6d4';
const DEFAULT_BAR_WIDTH = 6;

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBars: DEFAULT_NUMBER_OF_ARRAY_BARS,
      barColor: DEFAULT_BAR_COLOR,
      barWidth: DEFAULT_BAR_WIDTH,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetBarColors = () => {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = this.state.barColor;
    }
  };

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array }, this.resetBarColors);
  }

 handleBarColorChange = (e) => {
  this.setState({ barColor: e.target.value }, () => {
    this.resetBarColors();
    // Also update any bars that are currently red (from animation)
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      if (arrayBars[i].style.backgroundColor === 'red' || arrayBars[i].style.backgroundColor === 'rgb(255, 0, 0)') {
        arrayBars[i].style.backgroundColor = e.target.value;
      }
    }
  });
};

  handleNumberOfBarsChange = (e) => {
    const value = Number(e.target.value);
    this.setState({ numberOfBars: value }, () => this.resetArray());
  };

  handleBarWidthChange = (e) => {
    const value = Number(e.target.value);
    this.setState({ barWidth: value });
  };

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
       const color = i % 3 === 0 ? 'red' : document.getElementById('bar-color-picker')?.value || this.state.barColor;
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
    // Reset bar colors after all animations are done
    setTimeout(() => {
      this.resetBarColors();
    }, animations.length * ANIMATION_SPEED_MS + 50);
  }

  mergeSort() {
    const animations = getMergeSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  selectionSort() {
    const animations = getSelectionSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  insertionSort() {
    const animations = getInsertionSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  shellSort() {
    const animations = getShellSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimation(this.state.array);
    this.runAnimations(animations);
  }

  render() {
    const { array, barColor, numberOfBars, barWidth } = this.state;
    return (
      <div className="array-container">
         <h2>Sorting Visualizer</h2>
        <div className="controls" style={{ marginBottom: 20 }}>
          <label>
            Bar Color:&nbsp;
          <input
  id="bar-color-picker"
  type="color"
  value={barColor}
  onChange={this.handleBarColorChange}
  style={{ verticalAlign: 'middle' }}
/>
          </label>
          &nbsp;&nbsp;
          <label>
            Number of Bars:&nbsp;
            <input
              type="number"
              min="10"
              max="200"
              value={numberOfBars}
              onChange={this.handleNumberOfBarsChange}
              style={{ width: 60 }}
            />
          </label>
          &nbsp;&nbsp;
          <label>
            Bar Width:&nbsp;
            <input
              type="number"
              min="2"
              max="20"
              value={barWidth}
              onChange={this.handleBarWidthChange}
              style={{ width: 50 }}
            />
          </label>
        </div>
        <div className="visualizer-bars">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: barColor,
                height: `${value}px`,
                width: `${barWidth}px`,
              }}
            ></div>
          ))}
        </div>
        <div>
          <button onClick={() => this.resetArray()}>Generate new Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.shellSort()}>Shell Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;