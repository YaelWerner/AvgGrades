document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gradesForm').addEventListener('submit', function (e) {
        e.preventDefault();
        calculateAverage();
    });
});

function addGradeRow() {
    const gradeRow = document.createElement('div');
    gradeRow.className = 'grade-row';
    gradeRow.innerHTML = `
        <input type="text" name="courseName" placeholder="שם הקורס" required>
        <input type="number" name="grade" placeholder="ציון" min="0" max="100" required>
        <input type="number" name="weight" placeholder="משקל" min="0" max="100" required>
        <button type="button" class="remove-course" onclick="removeGradeRow(this)">הסר קורס</button>
    `;
    const calculateButton = document.querySelector('.calculate-button');
    document.getElementById('gradesForm').insertBefore(gradeRow, calculateButton);
}

function removeGradeRow(button) {
    button.parentElement.remove();
}

function calculateAverage() {
    const gradeRows = document.getElementsByClassName('grade-row');
    let totalWeightedGrades = 0;
    let totalWeights = 0;

    for (let row of gradeRows) {
        const grade = parseFloat(row.querySelector('input[name="grade"]').value);
        const weight = parseFloat(row.querySelector('input[name="weight"]').value);
        totalWeightedGrades += grade * weight;
        totalWeights += weight;
    }

    const average = totalWeights ? (totalWeightedGrades / totalWeights).toFixed(2) : 0;
    document.getElementById('averageResult').innerText = `ממוצע משוקלל: ${average}`;
}
