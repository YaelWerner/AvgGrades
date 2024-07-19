let courseCount = 0;

function addCourse() {
    courseCount++;
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-inputs';
    courseDiv.innerHTML = `
        <input type="text" placeholder="שם הקורס (אופציונלי)" id="course-name-${courseCount}">
        <input type="number" placeholder="נ״ז" id="course-credits-${courseCount}" min="0" step="0.5" required>
        <input type="number" placeholder="ציון" id="course-grade-${courseCount}" min="0" max="100" required>
        <select id="course-level-${courseCount}">
            <option value="regular">רגיל</option>
            <option value="advanced">מתקדם</option>
        </select>
        <button class="remove-course" onclick="removeCourse(this)">הסר</button>
    `;
    document.getElementById('courses-container').appendChild(courseDiv);
}

function removeCourse(button) {
    button.parentElement.remove();
}

function calculateAverage() {
    let totalWeightedGrade = 0;
    let totalWeightedCredits = 0;
    let courseList = [];

    for (let i = 1; i <= courseCount; i++) {
        const nameInput = document.getElementById(`course-name-${i}`);
        const gradeInput = document.getElementById(`course-grade-${i}`);
        const creditsInput = document.getElementById(`course-credits-${i}`);
        const levelSelect = document.getElementById(`course-level-${i}`);

        if (gradeInput && creditsInput && levelSelect) {
            const name = nameInput ? nameInput.value : `קורס ${i}`;
            const grade = parseFloat(gradeInput.value);
            const credits = parseFloat(creditsInput.value);
            const level = levelSelect.value;

            if (isNaN(grade) || isNaN(credits) || grade < 0 || grade > 100 || credits < 0) {
                alert("נא להזין ערכים תקינים לכל הקורסים.");
                return;
            }

            const weightMultiplier = level === 'advanced' ? 1.5 : 1;
            totalWeightedGrade += grade * credits * weightMultiplier;
            totalWeightedCredits += credits * weightMultiplier;

            courseList.push({ name, grade, credits, level });
        }
    }

    const resultElement = document.getElementById('result');
    const courseListElement = document.getElementById('course-list');

    if (totalWeightedCredits > 0) {
        const average = (totalWeightedGrade / totalWeightedCredits).toFixed(2);
        resultElement.innerHTML = `
            <p>הממוצע המשוקלל שלך הוא:</p>
            <div class="average-result">${average}</div>
        `;
        resultElement.classList.add('show');
        updateCourseList(courseList);
        courseListElement.classList.add('show');
    } else {
        alert("אנא הזן לפחות קורס אחד עם ציון ונקודות זכות תקינים.");
        resultElement.classList.remove('show');
        courseListElement.classList.remove('show');
    }
}

function updateCourseList(courseList) {
    const courseListBody = document.getElementById('course-list');
    let html = '<h2>רשימת הקורסים</h2><table><thead><tr><th>שם הקורס</th><th>ציון</th><th>נ"ז</th><th>רמה</th></tr></thead><tbody>';
    courseList.forEach(course => {
        html += `<tr>
            <td>${course.name}</td>
            <td>${course.grade}</td>
            <td>${course.credits}</td>
            <td>${course.level === 'advanced' ? 'מתקדם' : 'רגיל'}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    courseListBody.innerHTML = html;
}

function resetCalculator() {
    document.getElementById('courses-container').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('course-list').innerHTML = '';
    document.getElementById('result').classList.remove('show');
    document.getElementById('course-list').classList.remove('show');
    courseCount = 0;
    addCourse();
}

addCourse();
