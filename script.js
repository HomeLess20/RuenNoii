// script.js
document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = 'noii55';
    document.getElementById('loginButton').addEventListener('click', function() {
        const inputPassword = document.getElementById('password').value;
        if (inputPassword === correctPassword) {
            document.querySelector('.login-container').style.display = 'none';
            document.querySelector('.container').style.display = 'block';
        } else {
            document.getElementById('error-message').style.display = 'block';
        }
    });

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
        displayResults(pair3, 'pair3Results');
        displayResults(pair2Double, 'pair2DoubleResults');
        displayResults(pair3Double, 'pair3DoubleResults');
        document.getElementById('results').style.display = 'block';
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        document.getElementById('winform').reset();
        document.getElementById('results').style.display = 'none';
        document.getElementById('pair2Results').innerHTML = '';
        document.getElementById('pair3Results').innerHTML = '';
        document.getElementById('pair2DoubleResults').innerHTML = '';
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
    element.innerHTML = pairs.map(pair => `<span>${pair}</span>`).join(' ');
}

function copyToClipboard(elementId, button) {
    const element = document.getElementById(elementId);
    const text = element.innerText.replace(/\s+/g, ' ');
    navigator.clipboard.writeText(text).then(() => {
        button.innerText = 'คัดลอกสำเร็จ';
        setTimeout(() => {
            button.innerText = 'คัดลอก';
        }, 2000); // เปลี่ยนกลับเป็น "คัดลอก" หลังจาก 2 วินาที
    });
}
