// Логіка для нотифікацій
const notificationIcon = document.querySelector('.notification-icon');
const notificationPreview = document.getElementById('notification-preview');
const notificationCount = document.getElementById('notif-count');

// Відображення/приховування вікна з повідомленнями
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

// Приховування індикатора нових повідомлень
notificationIcon.addEventListener('click', () => {
    notificationCount.style.display = 'none';
});

// Функції для роботи з модальними вікнами
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Додаткові адаптації для малих екранів
    if (window.innerWidth <= 320) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxHeight = '90vh';
            modalContent.style.overflowY = 'auto';
        }
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
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
    const status = Math.random() > 0.5 ? '🟢' : '⚪';

    if (group && name && surname && sex && birthday) {
        // Додаємо студента до масиву allStudents
        allStudents.push({
            group,
            name,
            surname,
            sex,
            birthday,
            status
        });

        // Оновлюємо відображення
        displayStudents();
        closeModal();
        checkSelectedStudents();
    }
});

// Функція для заміни крапок на індикатори присутності
function replaceStatusIndicators() {
    const statusCells = document.querySelectorAll('#students-table tbody td:nth-child(7)');
    statusCells.forEach(cell => {
        const randomStatus = Math.random() > 0.5 ? '🟢' : '⚪';
        cell.textContent = randomStatus;
    });
}

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
    const studentName = row.cells[2].innerText + ' ' + row.cells[3].innerText;

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

// Функції для роботи з вибраними студентами
function checkSelectedStudents() {
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');
    const deleteButton = document.getElementById('delete-selected');

    let selectedCount = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) selectedCount++;
    });

    if (selectedCount > 0) {
        deleteButton.classList.add('active');
        deleteButton.disabled = false;
    } else {
        deleteButton.classList.remove('active');
        deleteButton.disabled = true;
    }
}

function confirmDeleteSelected() {
    openModal('delete-selected-modal');
}

function deleteSelectedStudents() {
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            row.remove();
        }
    });
    closeModal();
    checkSelectedStudents();
}

// Функція для виділення всіх студентів
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('#students-table tbody input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
}

// Пагінація
let currentPage = 1;
const studentsPerPage = 5;
let allStudents = [];

function displayStudents() {
    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const studentsToDisplay = allStudents.slice(startIndex, endIndex);

    studentsToDisplay.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" 
                       aria-label="Вибрати студента ${student.name} ${student.surname}"
                       onchange="checkSelectedStudents()">
            </td>
            <td>${student.group}</td>
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.sex}</td>
            <td>${student.birthday}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="editStudent(this)" aria-label="Редагувати студента ${student.name} ${student.surname}">✎</button>
                <button onclick="deleteStudent(this)" aria-label="Видалити студента ${student.name} ${student.surname}">✗</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('page-indicator').textContent = currentPage;
    
    const prevButton = document.querySelector('.pagination button:first-child');
    const nextButton = document.querySelector('.pagination button:last-child');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(allStudents.length / studentsPerPage);
}

function changePage(direction) {
    const totalPages = Math.ceil(allStudents.length / studentsPerPage);
    if (direction === 1 && currentPage < totalPages) {
        currentPage++;
    } else if (direction === -1 && currentPage > 1) {
        currentPage--;
    }
    displayStudents();
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    allStudents = [
        { group: 'PZ-21', name: 'Victor', surname: 'Piznak', sex: 'M', birthday: '27.08.2005', status: '🟢' },

    ];

    displayStudents();
    replaceStatusIndicators();
    highlightActiveLink();
    
    // Додаємо обробники подій
    document.getElementById('select-all').addEventListener('click', toggleSelectAll);
    document.querySelectorAll('#students-table tbody input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', checkSelectedStudents);
    });
});

// Підсвічування активного посилання в сайдбарі
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
}

// Закриття модального вікна профілю при кліку поза ним
window.onclick = function(event) {
    const profileMenu = document.getElementById('profile-menu');
    if (event.target !== profileMenu && !event.target.closest('.profile')) {
        profileMenu.style.display = 'none';
    }
};

// Профіль та сайдбар
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function logout() {
    alert("Ви вийшли з системи.");
    window.location.href = 'login.html';
}