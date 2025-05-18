export function getShellSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        animations.push([j, j - gap]);
        animations.push([j, j - gap]);
        animations.push([j, arr[j - gap]]);
        arr[j] = arr[j - gap];
      }
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([j, temp]);
      arr[j] = temp;
    }
  }
  return animations;
}