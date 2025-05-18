 export function getBubbleSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([j, j + 1]);    
      animations.push([j, j + 1]);  
      if (arr[j] > arr[j + 1]) {
        animations.push([j, arr[j + 1]]);
        animations.push([j + 1, arr[j]]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      } else {
        animations.push([j, arr[j]]);
        animations.push([j + 1, arr[j + 1]]);
      }
    }
  }
  return animations;
}

