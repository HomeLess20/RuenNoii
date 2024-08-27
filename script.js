document.addEventListener('DOMContentLoaded', function() {
  // ฟังก์ชันสำหรับป้องกันการเปิด Developer Tools
  function preventDevTools() {
    document.onkeydown = function(e) {
      if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
      }
    };
  }

  // เรียกใช้งานฟังก์ชันป้องกัน
  preventDevTools();

  // โค้ดเดิมของคุณ
  document.getElementById('winform').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('numbers').value.trim();
    if (input.length < 1 || input.length > 8 || !/^\d+$/.test(input)) {
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
