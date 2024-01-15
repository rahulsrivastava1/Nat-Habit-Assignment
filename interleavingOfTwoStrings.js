function findInterleavings(s1, s2) {
  function generateInterleavingsHelper(prefix, remainingS1, remainingS2) {
    if (remainingS1 === "" && remainingS2 === "") {
      console.log(prefix);
      return;
    }

    if (remainingS1 !== "") {
      generateInterleavingsHelper(
        prefix + remainingS1[0],
        remainingS1.slice(1),
        remainingS2
      );
    }

    if (remainingS2 !== "") {
      generateInterleavingsHelper(
        prefix + remainingS2[0],
        remainingS1,
        remainingS2.slice(1)
      );
    }
  }

  generateInterleavingsHelper("", s1, s2);
}

const str1 = "ABC";
const str2 = "ACB";

findInterleavings(str1, str2);
