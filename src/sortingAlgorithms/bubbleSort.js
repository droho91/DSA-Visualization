export function getBubbleSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Color change to red
      animations.push([j, j + 1]);
      // Revert color to turquoise
      animations.push([j, j + 1]);
      // Height change for j (or dummy)
      if (arr[j] > arr[j + 1]) {
        animations.push([j, arr[j + 1]]);
        // Second set for j+1
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j + 1, arr[j]]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      } else {
        animations.push([-1, -1]);
        // Second set for j+1 (dummy)
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([-1, -1]);
      }
    }
  }
  return animations;
}