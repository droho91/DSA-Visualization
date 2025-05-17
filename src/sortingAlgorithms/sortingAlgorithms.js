export function getMergeSortAnimation (array)
{
    const animations = [];
    if (array.length <=1) return array;
    const auxiliaryArray =array.slice();
    mergeSortHelper(array, 0 , array.length -1, auxiliaryArray, animations);
    return animations;
}

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
                animations.push([-1, -1]);
                animations.push([-1, -1]);
            }
        }
    }
    return animations;
}

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
        animations.push([i, arr[minIdx]]);
        animations.push([minIdx, arr[i]]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return animations;
}

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

export function getQuickSortAnimation(array) {
    const animations = [];
    const arr = array.slice();
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSortHelper(arr, low, high, animations) {
    if (low < high) {
        const pi = partition(arr, low, high, animations);
        quickSortHelper(arr, low, pi - 1, animations);
        quickSortHelper(arr, pi + 1, high, animations);
    }
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

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
)
{ if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx +endIdx)/2);
    mergeSortHelper(auxiliaryArray,startIdx,middleIdx,mainArray,animations);
    mergeSortHelper(auxiliaryArray,middleIdx+1,endIdx, mainArray, animations);
    doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations);
} 

function doMerge(
mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
)
{let k =startIdx;
    let i = startIdx;
    let j = middleIdx +1;
    while ( i <= middleIdx &&j <=endIdx){
        animations.push([i,j]);
        animations.push([i,j]);
    if(auxiliaryArray[i] <= auxiliaryArray[j]){
        animations.push([k,auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];

} else 
{ 
    animations.push([k,auxiliaryArray[j]]);
    mainArray[k++]= auxiliaryArray[j++];
}
}
while (i<=middleIdx)
{
    animations.push([i,i]);
    animations.push([i,i]);
    animations.push([k,auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
}
while (j<= endIdx)
{
    animations.push([j,j]);
    animations.push([j,j]);
    animations.push([k,auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
}
}