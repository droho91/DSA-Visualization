export function getSelectionSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([minIdx, j]);
      animations.push([minIdx, j]);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (i !== minIdx) {
      animations.push([i, arr[minIdx]]);
      animations.push([minIdx, arr[i]]);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    } else {
      animations.push([-1, -1]);
      animations.push([-1, -1]);
    }
  }
  return animations;
}