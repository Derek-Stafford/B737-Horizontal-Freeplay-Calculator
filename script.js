function calculate() {
  const resultContainer = document.getElementById("result-container");
  if (resultContainer) {
    resultContainer.innerHTML = ""; 
  } else {
    resultContainer = document.createElement("div");
    resultContainer.id = "result-container";
    document.body.appendChild(resultContainer);
  }

  const D1 = parseFloat(document.getElementById("D1").value) || 0;
  const D2 = parseFloat(document.getElementById("D2").value) || 0;
  const D3 = parseFloat(document.getElementById("D3").value) || 0;
  const Weight = parseFloat(document.getElementById("Weight").value) || 0;

  const type = document.getElementById("B737 Type").value;

  let Fail = 0;
  let results = [];

  function checkValue(name, value, threshold) {
    if (value > threshold) {
      Fail++;
      results.push(`${name}: ${value.toFixed(4)} - Failed`);
    } else {
      results.push(`${name}: ${value.toFixed(4)} - Passed`);
    }
  }

  function negativeCheck(value) {
    return value < 0 ? 0 : value;
  }

  function checkValue1(name, value, threshold) {
    if (value === 0) {
      results.push(`${name}: 0 - Recheck required`);
    } else if (value > threshold) {
      Fail++;
      results.push(`${name}: ${value.toFixed(4)} - Failed`);
    } else {
      results.push(`${name}: ${value.toFixed(4)} - Passed`);
    }
  }

  function checkValue2(name, value, threshold) {
    if (value > threshold) {
      Fail++;
      results.push(`${name}: ${value.toFixed(4)} - Failed`);
    } else {
      results.push(`${name}: ${value.toFixed(4)} - Passed`);
    }
  }
  
  if (type === "NG") {
    const H = (1.25 * D3) + ((D1 + D2) / 2);
    checkValue("D1", D1, 0.066);
    checkValue("D2", D2, 0.066);
    checkValue("D3", D3, 0.056);
    checkValue("H", H, 0.078);
  } else if (type === "Max") {
    const X = negativeCheck(D1 - (Weight * 0.0000155));
    const Y = negativeCheck(D2 - (Weight * 0.0000155));
    const Z = negativeCheck((D3 * 1.25) - (Weight * 0.0000318));
    const H = Z + ((X + Y) / 2);

    checkValue1("X", X, 0.060);
    checkValue1("Y", Y, 0.060);
    checkValue1("Z", Z, 0.050);
    checkValue2("H", H, 0.051);
  } else {
    alert("Please select a valid B737 type.");
    return;
  }

  if (Fail === results.length) {
    resultContainer.innerHTML = `<p>All values failed.</p>`;
  } else if (Fail === 0) {
    resultContainer.innerHTML = `<p>All values passed.</p>`;
  } else {
    results.forEach(result => {
      const resultLine = document.createElement("p");
      resultLine.textContent = result;
      resultContainer.appendChild(resultLine);
    });
  }
}
