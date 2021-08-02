// utils

function factorial(num) {
  // If the number is less than 0, reject it.
  if (num < 0) return -1;
  // If the number is 0, its factorial is 1.
  else if (num == 0) return 1;
  else {
    return num * factorial(num - 1);
  }
}

function combinations(totalItems, numberOfPicked) {
  return (
    factorial(totalItems) /
    (factorial(numberOfPicked) * factorial(totalItems - numberOfPicked))
  );
}

function treatArrayAsCircular(numberOfLoops, iterator, startIndex, offset) {
  const result = [];
  let index = startIndex + offset + 1;
  let delay = 0;

  for (let i = 0; i < numberOfLoops - 1; i++) {
    if (!iterator[delay]) {
      delay = 0;
    }

    if (iterator[index]) {
      result.push(iterator[index]);
    } else {
      result.push(iterator[delay]);
      delay++;
    }

    index++;
  }

  return result;
}

function isArrayEqual(arr1, arr2) {
  const isCloned = arr1.filter((item) => arr2.indexOf(item) > -1);
  return isCloned.length === arr1.length && arr1.length === arr2.length;
}

function cherryPick(n, arr) {
  if (n === 1) {
    return arr;
  }
  if (n >= arr.length) {
    return [arr];
  }
  const result = [];
  const totalTimes = combinations(arr.length, n);

  let i = 0;
  let offset = 0;
  for (let k = 0; k < totalTimes; k++) {
    let chunk = [arr[i]];
    const temp = treatArrayAsCircular(n, arr, i, offset);
    chunk.push(temp);
    chunk = chunk.flat();
    const isIndexDup =
      chunk.filter((item, idx) => chunk.indexOf(item) !== idx).length > 0;
    const isChunkDup =
      result.filter((chunkInResult) => isArrayEqual(chunkInResult, chunk))
        .length > 0;
    if (isIndexDup || isChunkDup) {
      k--;
      offset = 0;
      i++;
    } else {
      offset++;
      result.push(chunk);
    }
  }

  return result;
}

//
const testString =
  "Products are created with 132cxvx SKUs and MXX and CSV and 79 and mic7979 and m98opt options";

function getMatchedWords(str) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/g;
  return str
    .split(" ")
    .filter((chunk) => {
      const matchedChunk = chunk.match(regex);
      return matchedChunk && matchedChunk.length > 0;
    })
    .filter((_) => _);
}

function listWordVariants(str) {
  const result = [];
  const split = str.split("");
  split.forEach((char, idx) => {
    if (idx === split.length - 1) {
      return;
    }
    const nextChar = split[idx + 1];
    const isNumber = !Number.isNaN(parseInt(char));
    const isNextANumber = !Number.isNaN(parseInt(nextChar));
    const isInterupted = isNumber !== isNextANumber;
    if (isInterupted) {
      result.push(idx);
    }
  });
  return result;
}

function drawer(cmd, targetStr) {
  const result = [];
  const isArray = Array.isArray(cmd);
  if (isArray) {
    const cmdList = cmd.sort(function (a, b) {
      return a - b; // asc
    });
    let split = targetStr.split("");
    let offset = 0;
    cmdList.forEach((instr) => {
      const point = instr;
      const insertingPoint = point + 1 + offset;
      split.splice(insertingPoint, 0, "-");
      offset++;
    });
    result.push(split.join(""));
  } else {
    const split = targetStr.split("");
    const point = cmd;
    split.splice(point + 1, 0, "-");
    result.push(split.join(""));
  }

  console.log(result);
  return result;
}

getMatchedWords(testString).forEach((chunk) => drawAChunk(chunk));

function drawAChunk(chunk) {
  const interuptedPositions = listWordVariants(chunk);
  const instructionsRaw = [];
  for (let i = 1; i <= interuptedPositions.length; i++) {
    const interuptCmds = cherryPick(i, interuptedPositions);
    instructionsRaw.push(interuptCmds);
  }
  const instructions = instructionsRaw.flat();
  instructions.forEach((instr) => drawer(instr, chunk));
}
