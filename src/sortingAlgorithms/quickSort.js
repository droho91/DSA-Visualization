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
    // 1. Color change to red
    animations.push([j, high]);
    // 2. Revert color to turquoise
    animations.push([j, high]);
    if (arr[j] < pivot) {
      i++;
      // 3. Height change for i (swap)
      animations.push([i, arr[j]]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      // Animate the other bar (j) as well
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([j, arr[i]]);
    } else {
      // 3. Dummy height change (no swap)
      animations.push([-1, -1]);
    }
  }
  // Swap pivot to correct position
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([i + 1, arr[high]]);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([high, arr[i + 1]]);
  return i + 1;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}