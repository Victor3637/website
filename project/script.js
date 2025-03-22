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

// Решта функцій залишаються без змін
document.getElementById('add-student').addEventListener('click', function() {
    openModal('add-student-modal');
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const group = document.getElementById('group').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const sex = document.getElementById('sex').value;
    const birthday = document.getElementById('birthday').value;
    const status = "●";

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

function deleteStudent(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

// Функція для відкриття/закриття модального вікна профілю
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Функція для виходу з акаунта
function logout() {
    alert("You have been logged out.");
    window.location.href = 'login.html';
}


// Виділення активного посилання в сайдбарі
const currentPage = window.location.pathname.split('/').pop(); // Отримуємо поточну сторінку
const links = document.querySelectorAll('.sidebar ul li a');

links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Функціонал для dashboard.html та tasks.html
// Наприклад, можна додати обробку кліків на посилання в сайдбарі
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        window.location.href = page;
    });
});

// Закриття модального вікна профілю при кліку поза ним
window.onclick = function(event) {
    const profileMenu = document.getElementById('profile-menu');
    if (event.target !== profileMenu && !event.target.closest('.profile')) {
        profileMenu.style.display = 'none';
    }
};

document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Забороняємо стандартну поведінку посилання
        const page = this.getAttribute('href'); // Отримуємо сторінку, на яку потрібно перейти
        window.location.href = page; // Переходимо на сторінку
    });
});

// Змінна для зберігання рядка, який потрібно видалити
let studentRowToDelete = null;

// Функція для відкриття модального вікна підтвердження видалення
function deleteStudent(button) {
    const row = button.parentNode.parentNode;
    const studentName = row.cells[2].innerText; // Отримуємо ім'я студента

    // Заповнюємо текст у модальному вікні
    document.getElementById('student-name-to-delete').innerText = studentName;

    // Відкриваємо модальне вікно
    openModal('delete-student-modal');

    // Зберігаємо рядок для видалення
    studentRowToDelete = row;
}

// Функція для відкриття/закриття сайдбару
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Функція для підтвердження видалення
function confirmDelete() {
    if (studentRowToDelete) {
        studentRowToDelete.parentNode.removeChild(studentRowToDelete); // Видаляємо рядок
        studentRowToDelete = null; // Очищуємо змінну
    }
    closeModal(); // Закриваємо модальне вікно
}

document.getElementById('add-student').addEventListener('click', function() {
    openModal('add-student-modal');
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const group = document.getElementById('group').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const sex = document.getElementById('sex').value;
    const birthday = document.getElementById('birthday').value;
    const status = "●";

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

function toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

// Функція для відкриття/закриття модального вікна профілю
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Функція для виходу з акаунта
function logout() {
    alert("You have been logged out.");
    window.location.href = 'login.html';
}

// Закриття модального вікна профілю при кліку поза ним
window.onclick = function(event) {
    const profileMenu = document.getElementById('profile-menu');
    if (event.target !== profileMenu && !event.target.closest('.profile')) {
        profileMenu.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', highlightActiveLink);
// Функція для підсвічування активного посилання в сайдбарі
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop(); // Отримуємо поточну сторінку
    const links = document.querySelectorAll('.sidebar ul li a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Видаляємо клас active з інших посилань
        }
    });
};