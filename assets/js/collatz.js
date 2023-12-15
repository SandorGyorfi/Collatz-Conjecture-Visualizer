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