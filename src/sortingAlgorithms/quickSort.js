export function getQuickSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function partition(arr, low, high, animations) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animations.push([j, high]);
        animations.push([j, high]);
        if (arr[j] < pivot) {
            i++;
            animations.push([i, arr[j]]);
            animations.push([j, arr[i]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        } else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
    }
    animations.push([i + 1, arr[high]]);
    animations.push([high, arr[i + 1]]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}
