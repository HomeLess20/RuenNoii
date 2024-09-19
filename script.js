document.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.getElementById('numbers');

  inputElement.addEventListener('input', function() {
    const input = inputElement.value.trim();
    if (input.length > 8 || !/^\d*$/.test(input)) {
      alert('กรุณากรอกเลขไม่เกิน 8 ตัวที่เป็นตัวเลขเท่านั้น');
      return;
    }

    const numbers = input.split('');
    const pair2 = generateCombinations(numbers, 2);
    const pair2Double = generateCombinationsWithDoubles(numbers, 2);
    const pair3 = generateCombinations(numbers, 3);
    const pair3Double = generateCombinationsWithDoubles(numbers, 3);

    displayResults(pair2, 'pair2Results');
    displayResults(pair2Double, 'pair2DoubleResults');
    displayResults(pair3, 'pair3Results');
    displayResults(pair3Double, 'pair3DoubleResults');

    document.getElementById('results').style.display = 'block';
  });

  document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('winform').reset();
    document.getElementById('results').style.display = 'none';
    document.getElementById('pair2Results').innerHTML = '';
    document.getElementById('pair2DoubleResults').innerHTML = '';
    document.getElementById('pair3Results').innerHTML = '';
    document.getElementById('pair3DoubleResults').innerHTML = '';
  });

  // ป้องกันการเปิด Developer Tools
  function detectDevTools() {
    const element = new Image();
    element.__defineGetter__('id', function() {
      alert('กรุณาปิด Developer Tools เพื่อใช้งานเว็บไซต์นี้');
      window.location.href = 'about:blank'; // หรือคุณอาจเปลี่ยนไปยังหน้าอื่น
    });
    console.log(element);
  }

  setInterval(detectDevTools, 1000);
});

function generateCombinations(arr, size) {
  const result = [];
  const f = (prefix, arr, size) => {
    if (prefix.length === size) {
      result.push(prefix);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      f(prefix + arr[i], arr.slice(i + 1), size);
    }
  };
  f('', arr, size);
  return result;
}

function generateCombinationsWithDoubles(arr, size) {
  const result = [];
  const f = (prefix, arr, size) => {
    if (prefix.length === size) {
      result.push(prefix);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (prefix.length === 0 || arr[i] >= prefix.charAt(prefix.length - 1)) {
        f(prefix + arr[i], arr, size);
      }
    }
  };
  f('', arr, size);
  return result;
}

function displayResults(pairs, elementId) {
  const element = document.getElementById(elementId);
  element.innerHTML = pairs.map(pair => `<span>${pair}</span>`).join(' ') + ` (รวม ${pairs.length} ชุด)`;
}

function copyToClipboard(elementId, button) {
  const element = document.getElementById(elementId);
  const text = Array.from(element.querySelectorAll('span')).map(span => span.textContent).join(' ');
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'คัดลอกสำเร็จ';
    setTimeout(() => {
      button.textContent = 'คัดลอก';
    }, 2000);
  });
}

// ป้องกันการกด F12 และเปิด Developer Tools
document.addEventListener("keydown", function(event) {
    // ตรวจจับการกด F12
    if (event.key === "F12") {
        event.preventDefault(); // ป้องกัน F12
        alert("การตรวจสอบโค้ดถูกป้องกัน");
    }
    
    // ตรวจจับการกด Ctrl+Shift+I (เปิดเครื่องมือ Inspect)
    if (event.ctrlKey && event.shiftKey && event.key === "I") {
        event.preventDefault();
        alert("การตรวจสอบโค้ดถูกป้องกัน");
    }
});
