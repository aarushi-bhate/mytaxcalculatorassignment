// Event handler for form submission
function calculateTax(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values and age category
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageCategoryInput = document.getElementById('ageCategory');

    // Retrieve the values
    const income = parseFloat(incomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionsInput.value);
    const ageCategory = ageCategoryInput.value;

    // Validation
    let valid = validateInput(incomeInput, income) &
                validateInput(extraIncomeInput, extraIncome) &
                validateInput(deductionsInput, deductions) &
                validateInput(ageCategoryInput, ageCategory, true);

    if (!valid) {
        return;
    }

    // Calculate overall income after deductions
    const overallIncome = income + extraIncome - deductions;

    // Calculate tax based on age category and overall income
    let tax = 0;
    if (overallIncome > 8) {
        const excessIncome = overallIncome - 8;
        if (ageCategory === '1') { // Below 40
            tax = excessIncome * 0.3;
        } else if (ageCategory === '2') { // 40 & Above, Below 60
            tax = excessIncome * 0.4;
        } else if (ageCategory === '3') { // 60 & Above
            tax = excessIncome * 0.1;
        }
    }

    // Show the result in the modal
    showModal(`The overall income will be: ${tax.toFixed(2)} Lakhs`);
}

// Function to validate input fields
function validateInput(inputElement, value, isSelect = false) {
    const errorIcon = inputElement.nextElementSibling;
    if (isSelect && value === "") {
        showError(inputElement, errorIcon, "This field is mandatory.");
        return false;
    } else if (isNaN(value) || value < 0 || value === "") {
        showError(inputElement, errorIcon, "Invalid input.");
        return false;
    } else {
        hideError(errorIcon);
        return true;
    }
}

// Functions to show and hide error icons
function showError(inputElement, errorIcon, message) {
    errorIcon.style.display = 'inline';
    errorIcon.setAttribute('data-tooltip', message);
}

function hideError(errorIcon) {
    errorIcon.style.display = 'none';
    errorIcon.removeAttribute('data-tooltip');
}

// Function to show the modal with the result
function showModal(message) {
    document.getElementById('resultText').textContent = message;
    document.getElementById('resultModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attach the event handler to the form
document.getElementById('taxForm').addEventListener('submit', calculateTax);
