document.getElementById('gradesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateAverage();
});

function addGradeRow() {
    const form = document.getElementById('gradesForm');
    const gradeRow = document.createElement('div');
    gradeRow.classList.add('grade-row');
    gradeRow.innerHTML = `
        <input type="text" name="courseName" placeholder="שם הקורס" required>
        <input type="number" name="grade" placeholder="ציון" min="0" max="100" required>
        <input type="number" name="weight" placeholder="משקל" min="0" max="100" required>
    `;
    form.insertBefore(gradeRow, form.children[form.children.length - 2]);
}

function calculateAverage() {
    const grades = document.querySelectorAll('input[name="grade"]');
    const weights = document.querySelectorAll('input[name="weight"]');
    let totalWeightedSum = 0;
    let totalWeights = 0;

    grades.forEach((grade, index) => {
        const weight = parseFloat(weights[index].value);
        totalWeightedSum += parseFloat(grade.value) * weight;
        totalWeights += weight;
    });

    const average = totalWeightedSum / totalWeights;
    document.getElementById('averageResult').innerText = `הממוצע המשוקלל הוא: ${average.toFixed(2)}`;
}
