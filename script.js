document.getElementById('gradesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateAverage();
});

function addGradeRow() {
    const assignmentsDiv = document.getElementById('assignments');
    const gradeRow = document.createElement('div');
    gradeRow.classList.add('grade-row');
    gradeRow.innerHTML = `
        <input type="number" name="grade" placeholder="ציון" min="0" max="100" required>
        <input type="number" name="weight" placeholder="משקל" min="0" max="100" required>
    `;
    assignmentsDiv.appendChild(gradeRow);
}

function calculateAverage() {
    const grades = document.querySelectorAll('input[name="grade"]');
    const weights = document.querySelectorAll('input[name="weight"]');
    const examGrade = parseFloat(document.getElementById('examGrade').value);
    let totalWeightedSum = 0;
    let totalWeights = 0;

    grades.forEach((grade, index) => {
        const weight = parseFloat(weights[index].value);
        totalWeightedSum += parseFloat(grade.value) * weight;
        totalWeights += weight;
    });

    const remainingWeight = 100 - totalWeights;
    totalWeightedSum += examGrade * remainingWeight;

    const average = totalWeightedSum / 100;
    document.getElementById('averageResult').innerText = `הממוצע המשוקלל הוא: ${average.toFixed(2)}`;
}
