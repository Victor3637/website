document.getElementById('add-student').addEventListener('click', function() {
    const table = document.getElementById('students-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const groupCell = newRow.insertCell(0);
    const employeeCell = newRow.insertCell(1);
    const leadershipCell = newRow.insertCell(2);
    const genderCell = newRow.insertCell(3);
    const strategyCell = newRow.insertCell(4);
    const actionCell = newRow.insertCell(5);

    groupCell.textContent = 'Група 1';
    employeeCell.textContent = 'Працівник 1';
    leadershipCell.textContent = 'Лідер';
    genderCell.textContent = 'Чоловік';
    strategyCell.textContent = 'Стратегія 1';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
    });

    actionCell.appendChild(deleteButton);
});

// Додавання нотифікацій
const notificationIcon = document.querySelector('.notification-icon');
notificationIcon.addEventListener('mouseover', function() {
    alert('У вас є нові повідомлення!');
});
