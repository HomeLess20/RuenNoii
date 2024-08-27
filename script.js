<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lottery Number Generator</title>
  <style>
    /* เพิ่มสไตล์ที่คุณต้องการที่นี่ */
  </style>
</head>
<body>
  <form id="winform">
    <label for="numbers">กรอกเลข (ไม่เกิน 8 ตัว):</label>
    <input type="text" id="numbers" maxlength="8">
    <button type="button" id="resetButton">รีเซ็ต</button>
  </form>

  <div id="results" style="display:none;">
    <div id="pair2Results"></div>
    <div id="pair2DoubleResults"></div>
    <div id="pair3Results"></div>
    <div id="pair3DoubleResults"></div>
    <button onclick="copyToClipboard('pair2Results', this)">คัดลอกผลลัพธ์คู่ 2 หลัก</button>
    <button onclick="copyToClipboard('pair2DoubleResults', this)">คัดลอกผลลัพธ์คู่ 2 หลัก (ซ้ำ)</button>
    <button onclick="copyToClipboard('pair3Results', this)">คัดลอกผลลัพธ์คู่ 3 หลัก</button>
    <button onclick="copyToClipboard('pair3DoubleResults', this)">คัดลอกผลลัพธ์คู่ 3 หลัก (ซ้ำ)</button>
  </div>

  <script>
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
        const threshold = 160; // ค่าที่ใช้ตรวจจับการเปิด Developer Tools
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
          alert('กรุณาปิด Developer Tools เพื่อใช้งานเว็บไซต์นี้');
          window.location.href = 'about:blank'; // หรือคุณอาจเปลี่ยนไปยังหน้าอื่น
        }
      }
      setInterval(detectDevTools, 1000);

      // ป้องกันการกดปุ่ม F12 และคีย์คอมบิเนชันอื่น ๆ
      document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
        }
      });

      // ป้องกันการคลิกขวา
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
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
  </script>
</body>
</html>
