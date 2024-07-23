let courses = [];
let editIndex = -1;

function addCourse() {
    const name = document.getElementById('courseName').value;
    const credits = parseFloat(document.getElementById('courseCredits').value);
    const grade = parseFloat(document.getElementById('courseGrade').value);
    const level = document.getElementById('courseLevel').value;

    // Validate inputs
    if (isNaN(credits) || isNaN(grade) || credits <= 0 || grade < 0 || grade > 100) {
        alert("נא להזין ציון ונ"ז תקינים");
        return;
    }

    // Check if editing an existing course
    if (editIndex > -1) {
        courses[editIndex] = { name, credits, grade, level };
        editIndex = -1;
    } else {
        courses.push({ name, credits, grade, level });
    }
    updateCourseList();
    resetForm();
}

function updateCourseList() {
    const courseListElement = document.getElementById('courseList');
    let html = '<h3>רשימת הקורסים</h3><table><tr><th>שם הקורס</th><th>נ"ז</th><th>ציון</th><th>רמה</th><th>פעולות</th></tr>';
    courses.forEach((course, index) => {
        html += `<tr>
            <td>${course.name || 'לא צוין'}</td>
            <td>${course.credits}</td>
            <td>${course.grade}</td>
            <td>${course.level === 'advanced' ? 'מתקדם' : 'רגיל'}</td>
            <td>
                <button class="edit-button" onclick="editCourse(${index})">ערוך</button>
                <button class="remove-button" onclick="removeCourse(${index})">הסר</button>
            </td>
        </tr>`;
    });
    html += '</table>';
    courseListElement.innerHTML = html;

    // Trigger reanimation of the header
    const headerElement = courseListElement.querySelector('h3');
    if (headerElement) {
        headerElement.style.animation = 'none';
        headerElement.offsetHeight; // trigger reflow
        headerElement.style.animation = null;
    }
}

function resetForm() {
    document.getElementById('courseName').value = '';
    document.getElementById('courseCredits').value = '';
    document.getElementById('courseGrade').value = '';
    document.getElementById('courseLevel').value = 'regular';
}

function editCourse(index) {
    const course = courses[index];
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseCredits').value = course.credits;
    document.getElementById('courseGrade').value = course.grade;
    document.getElementById('courseLevel').value = course.level;
    editIndex = index;
}

function removeCourse(index) {
    courses.splice(index, 1);
    updateCourseList();
    calculateAverage();
}

function calculateAverage() {
    if (courses.length === 0) {
        alert("אנא הוסף לפחות קורס אחד");
        return;
    }

    let totalWeightedGrade = 0;
    let totalCredits = 0;

    courses.forEach(course => {
        const weight = course.level === 'advanced' ? 1.5 : 1;
        totalWeightedGrade += course.grade * course.credits * weight;
        totalCredits += course.credits * weight;
    });

    const average = (totalWeightedGrade / totalCredits).toFixed(2);
    
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div class="average-result">הממוצע המשוקלל: ${average}</div>`;
    
    // Trigger animation for result
    resultElement.firstChild.style.animation = 'none';
    resultElement.offsetHeight; // trigger reflow
    resultElement.firstChild.style.animation = null;
}

function resetCalculator() {
    courses = [];
    document.getElementById('courseList').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    resetForm();
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
