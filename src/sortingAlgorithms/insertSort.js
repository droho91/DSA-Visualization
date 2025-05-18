export function getInsertionSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      animations.push([j + 1, arr[j]]);
      arr[j + 1] = arr[j];
      j--;
    }
    animations.push([j + 1, j + 1]);
    animations.push([j + 1, j + 1]);
    animations.push([j + 1, key]);
    arr[j + 1] = key;
  }
  return animations;
}
