export function getSelectionSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([minIdx, j]);      // color change
      animations.push([minIdx, j]);      // revert color
      animations.push([-1, -1]);         // no height change
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (i !== minIdx) {
      // Animate swap for i
      animations.push([i, minIdx]);
      animations.push([i, minIdx]);
      animations.push([i, arr[minIdx]]);
      // Animate swap for minIdx
      animations.push([i, minIdx]);
      animations.push([i, minIdx]);
      animations.push([minIdx, arr[i]]);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return animations;
}