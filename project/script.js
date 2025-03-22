// Логіка для нотифікацій
const notificationIcon = document.querySelector('.notification-icon');
const notificationPreview = document.getElementById('notification-preview');
const notificationCount = document.getElementById('notif-count');

// Відображення/приховування вікна з повідомленнями при наведенні
notificationIcon.addEventListener('mouseenter', () => {
    notificationPreview.style.display = 'block';
});

notificationIcon.addEventListener('mouseleave', () => {
    notificationPreview.style.display = 'none';
});

// Анімація при подвійному кліку
notificationIcon.addEventListener('dblclick', () => {
    notificationIcon.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        notificationIcon.style.animation = '';
    }, 500);
});

// Приховування індикатора нових повідомлень після одинарного кліку
notificationIcon.addEventListener('click', () => {
    notificationCount.style.display = 'none';
});

// Функції для роботи з модальними вікнами
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Додавання студента
document.getElementById('add-student').addEventListener('click', function() {
    openModal('add-student-modal');
});

document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const group = document.getElementById('group').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const sex = document.getElementById('sex').value;
    const birthday = document.getElementById('birthday').value;
    const status = Math.random() > 0.5 ? '🟢' : '⚪'; // Випадковий статус

    if (group && name && surname && sex && birthday) {
        const table = document.getElementById('students-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${group}</td>
            <td>${name}</td>
            <td>${surname}</td>
            <td>${sex}</td>
            <td>${birthday}</td>
            <td>${status}</td>
            <td>
                <button onclick="editStudent(this)">✎</button>
                <button onclick="deleteStudent(this)">✗</button>
            </td>
        `;

        closeModal();
    }
});

// Функція для заміни крапок на індикатори присутності
function replaceStatusIndicators() {
    const statusCells = document.querySelectorAll('#students-table tbody td:nth-child(7)'); // 7-ма колонка — статус

    statusCells.forEach(cell => {
        const randomStatus = Math.random() > 0.5 ? '🟢' : '⚪'; // Випадковий статус
        cell.textContent = randomStatus; // Замінюємо крапку на індикатор
    });
}

// Викликаємо функцію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', replaceStatusIndicators);

// Редагування студента
function editStudent(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    document.getElementById('edit-group').value = cells[1].innerText;
    document.getElementById('edit-name').value = cells[2].innerText;
    document.getElementById('edit-surname').value = cells[3].innerText;
    document.getElementById('edit-sex').value = cells[4].innerText;
    document.getElementById('edit-birthday').value = cells[5].innerText;

    openModal('edit-student-modal');

    document.getElementById('edit-student-form').onsubmit = function(event) {
        event.preventDefault();

        cells[1].innerText = document.getElementById('edit-group').value;
        cells[2].innerText = document.getElementById('edit-name').value;
        cells[3].innerText = document.getElementById('edit-surname').value;
        cells[4].innerText = document.getElementById('edit-sex').value;
        cells[5].innerText = document.getElementById('edit-birthday').value;

        closeModal();
    };
}

// Видалення студента
let studentRowToDelete = null;

function deleteStudent(button) {
    const row = button.parentNode.parentNode;
    const studentName = row.cells[2].innerText;

    document.getElementById('student-name-to-delete').innerText = studentName;
    openModal('delete-student-modal');
    studentRowToDelete = row;
}

function confirmDelete() {
    if (studentRowToDelete) {
        studentRowToDelete.parentNode.removeChild(studentRowToDelete);
        studentRowToDelete = null;
    }
    closeModal();
}
// Функція для перевірки, чи вибрано студентів
function checkSelectedStudents() {
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');
    const deleteButton = document.getElementById('delete-selected');

    let selectedCount = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) selectedCount++;
    });

    // Активуємо кнопку, якщо вибрано більше одного студента
    if (selectedCount > 0) {
        deleteButton.classList.add('active');
        deleteButton.disabled = false;
    } else {
        deleteButton.classList.remove('active');
        deleteButton.disabled = true;
    }
}

// Функція для підтвердження видалення вибраних студентів
function confirmDeleteSelected() {
    openModal('delete-selected-modal');
}

// Функція для видалення вибраних студентів
function deleteSelectedStudents() {
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            row.remove(); // Видаляємо рядок
        }
    });

    closeModal(); // Закриваємо модальне вікно
    checkSelectedStudents(); // Перевіряємо після видалення
}

// Додаємо обробники подій для чекбоксів
document.querySelectorAll('#students-table tbody input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', checkSelectedStudents);
});

// Додаємо обробник для чекбоксу "Вибрати всіх"
document.getElementById('select-all').addEventListener('click', () => {
    toggleSelectAll();
    checkSelectedStudents(); // Перевіряємо після виділення всіх
});

// Функція для видалення вибраних студентів
function deleteSelectedStudents() {
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            row.remove(); // Видаляємо рядок
        }
    });

    // Після видалення перевіряємо, чи залишилися вибрані студенти
    checkSelectedStudents();
}

// Додаємо обробники подій для чекбоксів
document.querySelectorAll('#students-table tbody input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', checkSelectedStudents);
});

// Додаємо обробник для чекбоксу "Вибрати всіх"
document.getElementById('select-all').addEventListener('click', () => {
    toggleSelectAll();
    checkSelectedStudents(); // Перевіряємо після виділення всіх
});

// Функція для виділення всіх студентів
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

// Додаємо обробник події для чекбоксу "Вибрати всіх"
document.getElementById('select-all').addEventListener('click', toggleSelectAll);

// Функції для профілю
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    alert("You have been logged out.");
    window.location.href = 'login.html';
}

let currentPage = 1; // Поточна сторінка
const studentsPerPage = 5; // Кількість студентів на сторінці
let allStudents = []; // Масив усіх студентів

// Функція для відображення студентів на поточній сторінці
function displayStudents() {
    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = ''; // Очищуємо таблицю

    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const studentsToDisplay = allStudents.slice(startIndex, endIndex);

    studentsToDisplay.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${student.group}</td>
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.sex}</td>
            <td>${student.birthday}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="editStudent(this)">✎</button>
                <button onclick="deleteStudent(this)">✗</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Оновлюємо індикатор сторінки
    document.getElementById('page-indicator').textContent = currentPage;

    // Перевіряємо, чи потрібно активувати кнопки пагінації
    const prevButton = document.querySelector('.pagination button:first-child');
    const nextButton = document.querySelector('.pagination button:last-child');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(allStudents.length / studentsPerPage);
}

// Функція для зміни сторінки
function changePage(direction) {
    const totalPages = Math.ceil(allStudents.length / studentsPerPage);

    if (direction === 1 && currentPage < totalPages) {
        currentPage++;
    } else if (direction === -1 && currentPage > 1) {
        currentPage--;
    }

    displayStudents(); // Оновлюємо відображення студентів
}

// Функція для додавання студента
document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const group = document.getElementById('group').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const sex = document.getElementById('sex').value;
    const birthday = document.getElementById('birthday').value;
    const status = Math.random() > 0.5 ? '🟢' : '⚪';

    if (group && name && surname && sex && birthday) {
        allStudents.push({ group, name, surname, sex, birthday, status }); // Додаємо студента до масиву
        displayStudents(); // Оновлюємо відображення
        closeModal();
    }
});

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Додамо кілька тестових студентів для прикладу
    allStudents = [
        { group: 'PZ-21', name: 'Victor', surname: 'Piznak', sex: 'M', birthday: '27.08.2005', status: '🟢' }
    ];

    displayStudents(); // Відображаємо першу сторінку
});

// Підсвічування активного посилання в сайдбарі
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.sidebar ul li a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightActiveLink);

// Закриття модального вікна профілю при кліку поза ним
window.onclick = function(event) {
    const profileMenu = document.getElementById('profile-menu');
    if (event.target !== profileMenu && !event.target.closest('.profile')) {
        profileMenu.style.display = 'none';
    }
};

// Відкриття/закриття сайдбару
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

