function sumOfArrays(arr1, arr2) {
  if (arr1.length > arr2.length) {
    let plus = arr1.length - arr2.length;
    for (let i = 0; i < plus; i++) {
      arr2.push(0);
    }
  } else if (arr1.length < arr2.length) {
    let plus = arr2.length - arr1.length;
    for (let i = 0; i < plus; i++) {
      arr1.push(0);
    }
  }
  if (arr1.length == arr2.length) {
    let arr3 = arr1.map((element, idx) => element + arr2[idx]);
    return arr3;
  }
}
let result = sumOfArrays([1, 0, 2, 3, 4], [3, 5, 6, 7, 8, 13]);
console.log(result);
