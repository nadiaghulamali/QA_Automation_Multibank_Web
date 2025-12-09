function characterFrequency(input) {
  const frequency = {};
  let result = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Ignore spaces
    if (char === " ") continue;

    if (frequency[char]) {
      frequency[char]++;
    } else {
      frequency[char] = 1;
    }
  }

  // Build the output string in order
  for (let key in frequency) {
    result += key + ":" + frequency[key] + ", ";
  }

  // Remove last comma and space
  result = result.slice(0, -2);

  return result;
}

const input = "nadia ali@ ali";
const output = characterFrequency(input);
console.log(output);
