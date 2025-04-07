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

// Функції для форматування дати
function formatBirthday(dateString) {
    if (!dateString) return '';
    
    if (dateString.includes('.')) return dateString;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}

function formatBirthdayForStorage(dateString) {
    if (!dateString) return '';
    
    if (dateString.includes('.')) {
        const [day, month, year] = dateString.split('.');
        return `${day}.${month}.${year}`;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}

function isAtLeast17YearsOld(birthday) {
    if (!birthday) return false;
    
    const [day, month, year] = birthday.split('.');
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const minBirthDate = new Date(
        currentDate.getFullYear() - 17,
        currentDate.getMonth(),
        currentDate.getDate()
    );
    
    return birthDate <= minBirthDate;
}

// Функції для повідомлень
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.style.position = 'fixed';
    errorMessage.style.bottom = '20px';
    errorMessage.style.right = '20px';
    errorMessage.style.backgroundColor = '#e74c3c';
    errorMessage.style.color = 'white';
    errorMessage.style.padding = '10px 20px';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.zIndex = '10000';
    errorMessage.id = 'error-message';
    
    const existingError = document.getElementById('error-message');
    if (existingError) existingError.remove();
    
    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.style.position = 'fixed';
    successMessage.style.bottom = '20px';
    successMessage.style.right = '20px';
    successMessage.style.backgroundColor = '#0B604F';
    successMessage.style.color = 'white';
    successMessage.style.padding = '10px 20px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.zIndex = '10000';
    successMessage.id = 'success-message';
    
    const existingSuccess = document.getElementById('success-message');
    if (existingSuccess) existingSuccess.remove();
    
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Функція для встановлення максимальної дати народження (17 років тому)
function setMaxBirthdayDate() {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    document.getElementById('birthday').max = minAgeDate.toISOString().split('T')[0];
}

// Валідація за допомогою HTML5 та регулярних виразів
function validateFormWithRegex() {
    let isValid = true;
    
    // Валідація групи
    const group = document.getElementById('group').value;
    if (!group) {
        document.getElementById('group-error').textContent = 'Please select a group';
        document.getElementById('group-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('group-error').style.display = 'none';
    }
    
    // Валідація імені
    const name = document.getElementById('name').value;
    const nameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ' -]{2,30}$/;
    if (!nameRegex.test(name)) {
        document.getElementById('name-error').textContent = 'Name should contain only letters (2-30 characters)';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }
    
    // Валідація прізвища
    const surname = document.getElementById('surname').value;
    const surnameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ' -]{2,50}$/;
    if (!surnameRegex.test(surname)) {
        document.getElementById('surname-error').textContent = 'Surname should contain only letters (2-50 characters)';
        document.getElementById('surname-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('surname-error').style.display = 'none';
    }
    
    // Валідація статі
    const sex = document.getElementById('sex').value;
    if (!sex) {
        document.getElementById('sex-error').textContent = 'Please select sex';
        document.getElementById('sex-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('sex-error').style.display = 'none';
    }
    
    // Валідація дати народження
    const birthday = document.getElementById('birthday').value;
    if (!birthday) {
        document.getElementById('birthday-error').textContent = 'Please enter date of birth';
        document.getElementById('birthday-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('birthday-error').style.display = 'none';
    }
    
    return isValid;
}   

// Альтернативна валідація без регулярних виразів
function validateFormWithoutRegex() {
    let isValid = true;
    
    // Валідація групи
    const group = document.getElementById('group').value;
    if (!group) {
        document.getElementById('group-error').textContent = 'Please select a group';
        document.getElementById('group-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('group-error').style.display = 'none';
    }
    
    // Валідація імені
    const name = document.getElementById('name').value;
    if (name.length < 2 || name.length > 30) {
        document.getElementById('name-error').textContent = 'Name should be 2-30 characters long';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }
    
    // Валідація прізвища
    const surname = document.getElementById('surname').value;
    if (surname.length < 2 || surname.length > 50) {
        document.getElementById('surname-error').textContent = 'Surname should be 2-50 characters long';
        document.getElementById('surname-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('surname-error').style.display = 'none';
    }
    
    // Валідація статі
    const sex = document.getElementById('sex').value;
    if (!sex) {
        document.getElementById('sex-error').textContent = 'Please select sex';
        document.getElementById('sex-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('sex-error').style.display = 'none';
    }
    
    // Валідація дати народження
    const birthday = document.getElementById('birthday').value;
    if (!birthday) {
        document.getElementById('birthday-error').textContent = 'Please enter date of birth';
        document.getElementById('birthday-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('birthday-error').style.display = 'none';
    }
    
    return isValid;
}

// Додавання студента
document.getElementById('add-student').addEventListener('click', function() {
    openModal('add-student-modal');
});

document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Використовуємо валідацію з регулярними виразами (можна замінити на validateFormWithoutRegex)
    const isValid = validateFormWithRegex();
    
    if (!isValid) {
        showErrorMessage('Please correct the errors in the form');
        return;
    }

    const group = document.getElementById('group').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const sex = document.getElementById('sex').value;
    const birthdayInput = document.getElementById('birthday').value;
    const birthday = formatBirthdayForStorage(birthdayInput);
    const status = Math.random() > 0.5 ? '🟢' : '⚪';

    if (!isAtLeast17YearsOld(birthday)) {
        showErrorMessage('Student must be at least 17 years old');
        return;
    }

    const newStudent = {
        group,
        name,
        surname,
        sex,
        birthday,
        status
    };
    
    allStudents.push(newStudent);
    
    // Виводимо дані у консоль у форматі JSON
    console.log('New student added:', JSON.stringify(newStudent, null, 2));

    // Перевіряємо чи потрібно перейти на нову сторінку
    const totalPages = Math.ceil(allStudents.length / studentsPerPage);
    if (allStudents.length > currentPage * studentsPerPage) {
        currentPage = totalPages;
    }

    displayStudents();
    this.reset();
    showSuccessMessage('Student added successfully!');
    closeModal();
    checkSelectedStudents();
});


// Редагування студента
function editStudent(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    const globalIndex = (currentPage - 1) * studentsPerPage + rowIndex;

    const birthdayParts = cells[5].innerText.split('.');
    const formattedBirthday = `${birthdayParts[2]}-${birthdayParts[1]}-${birthdayParts[0]}`;

    // Заповнюємо приховане поле id
    document.getElementById('edit-id').value = globalIndex;
    
    document.getElementById('edit-group').value = cells[1].innerText;
    document.getElementById('edit-name').value = cells[2].innerText;
    document.getElementById('edit-surname').value = cells[3].innerText;
    document.getElementById('edit-sex').value = cells[4].innerText;
    document.getElementById('edit-birthday').value = formattedBirthday;

    openModal('edit-student-modal');

    document.getElementById('edit-student-form').onsubmit = function(event) {
        event.preventDefault();

        // Отримуємо id з прихованого поля
        const id = document.getElementById('edit-id').value;
        const newBirthday = formatBirthdayForStorage(document.getElementById('edit-birthday').value);
        
        // Оновлюємо дані в таблиці
        cells[1].innerText = document.getElementById('edit-group').value;
        cells[2].innerText = document.getElementById('edit-name').value;
        cells[3].innerText = document.getElementById('edit-surname').value;
        cells[4].innerText = document.getElementById('edit-sex').value;
        cells[5].innerText = newBirthday;

        // Оновлюємо дані в масиві allStudents за допомогою id
        allStudents[id] = {
            group: document.getElementById('edit-group').value,
            name: document.getElementById('edit-name').value,
            surname: document.getElementById('edit-surname').value,
            sex: document.getElementById('edit-sex').value,
            birthday: newBirthday,
            status: allStudents[id].status // Зберігаємо поточний статус
        };

        // Виводимо оновлені дані у консоль у форматі JSON
        console.log('Updated student data:', JSON.stringify(allStudents[id], null, 2));
        
        // Показуємо повідомлення про успішне оновлення
        showSuccessMessage('Student updated successfully!');
        
        closeModal();
    };
}

// Робота з вибраними студентами
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
    const indexesToRemove = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const globalIndex = (currentPage - 1) * studentsPerPage + index;
            indexesToRemove.push(globalIndex);
        }
    });
    
    // Видаляємо у зворотньому порядку
    indexesToRemove.sort((a, b) => b - a).forEach(index => {
        allStudents.splice(index, 1);
    });
    
    // Коректуємо поточну сторінку
    const totalPages = Math.ceil(allStudents.length / studentsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    
    displayStudents();
    closeModal();
    checkSelectedStudents();
}

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

    // Коректуємо поточну сторінку, якщо вона більше не існує
    const totalPages = Math.ceil(allStudents.length / studentsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (totalPages === 0) {
        currentPage = 1;
    }

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
            <td>${formatBirthday(student.birthday)}</td>
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
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
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
    
    setMaxBirthdayDate();
    displayStudents();
    highlightActiveLink();
    
    document.getElementById('select-all').addEventListener('click', toggleSelectAll);
    document.querySelectorAll('#students-table tbody input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', checkSelectedStudents);
    });

    // Додамо обробники подій для валідації при введенні даних
    document.getElementById('name').addEventListener('input', function() {
        validateFormWithRegex(); // або validateFormWithoutRegex()
    });

    document.getElementById('surname').addEventListener('input', function() {
        validateFormWithRegex(); // або validateFormWithoutRegex()
    });

    // Реєстрація Service Worker для кешування
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/project/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                    
                    // Перевірка оновлень
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // Нова версія доступна
                                    console.log('New content is available; please refresh.');
                                    showSuccessMessage('New version available! Page will refresh.');
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 3000);
                                }
                            }
                        };
                    };
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
});

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
}

window.onclick = function(event) {
    const profileMenu = document.getElementById('profile-menu');
    if (event.target !== profileMenu && !event.target.closest('.profile')) {
        profileMenu.style.display = 'none';
    }
};

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

// Обробник події beforeinstallprompt для PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Запобігаємо автоматичному показу підказки
    e.preventDefault();
    // Зберігаємо подію, щоб викликати її пізніше
    deferredPrompt = e;
    // Показуємо кнопку встановлення
    const installContainer = document.getElementById('installContainer');
    installContainer.style.display = 'block';
    
    // Обробник кнопки встановлення
    document.getElementById('installButton').addEventListener('click', () => {
        // Приховуємо наш інтерфейс
        installContainer.style.display = 'none';
        // Показуємо підказку
        deferredPrompt.prompt();
        // Чекаємо на відповідь користувача
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
    
    // Обробник кнопки скасування
    document.getElementById('cancelInstall').addEventListener('click', () => {
        installContainer.style.display = 'none';
    });
});