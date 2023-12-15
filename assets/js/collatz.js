const startNumberInput = document.getElementById('startNumber');
const startButton = document.getElementById('startButton');
const stepCountSpan = document.getElementById('stepCount');
const chartCanvas = document.getElementById('chart');
const sequenceList = document.getElementById('sequenceList');
const ctx = chartCanvas.getContext('2d');
let myChart = createChart(ctx);
let maxValue = 0; 

function createChart(context) {
    return new Chart(context, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Collatz Sequence',
                data: [],
                borderColor: '#2675A6',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 200
            },
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'linear'
                }
            }
        }
    });
}

function collatzConjecture(number) {
    let currentNumber = number;
    maxValue = number; 
    let stepCount = 1;
    sequenceList.innerHTML = '';

    function animateStep() {
        if (currentNumber === 1 || stepCount > 5000000) {
            return;
        }

        currentNumber = currentNumber % 2 === 0 ? currentNumber / 2 : 3 * currentNumber + 1;
        myChart.data.labels.push(stepCount - 1 .toString());
        myChart.data.datasets[0].data.push(currentNumber);
        myChart.update({
            duration: 2000
        });

        const listItem = document.createElement('li');
        listItem.textContent = `Step ${stepCount}: ${currentNumber}`;
        sequenceList.appendChild(listItem);

        listItem.scrollIntoView({ behavior: 'smooth' });

        maxValue = Math.max(maxValue, currentNumber); 
        stepCount++;
        stepCountSpan.textContent = stepCount - 1;
        requestAnimationFrame(animateStep);
    }

    animateStep();
}

startButton.addEventListener('click', () => {
    const startNumber = parseInt(startNumberInput.value);
    if (!isNaN(startNumber) && startNumber > 0) {
        myChart.destroy();
        myChart = createChart(ctx);
        collatzConjecture(startNumber);
    }
});

function downloadSequence(filename, text, startNumber) {
    const timestamp = new Date().toISOString();
    const thankYouMessage = "\n\nThank you for using the Collatz Conjecture Visualizer!";
    const header = `Collatz Sequence Analysis\nStart Number: ${startNumber}\nTotal Steps: ${text.split('\n').length - 1}\nMax Value Reached: ${maxValue}\nGenerated On: ${timestamp}\n\nSequence:\n`;
    const fullText = header + text + thankYouMessage;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fullText));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById('downloadSequence').addEventListener('click', function() {
    var sequenceData = [];
    sequenceList.querySelectorAll('li').forEach(item => {
        sequenceData.push(item.textContent);
    });

    var textToSave = sequenceData.join('\n');
    var startNumber = startNumberInput.value;
    downloadSequence("collatz_sequence.txt", textToSave, startNumber);
});