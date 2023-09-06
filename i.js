// ...existing code...
// Search input event listener
document.getElementById('searchInput').addEventListener('keyup', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
        const { name, number } = contact;
        return name.toLowerCase().includes(searchInput) || number.toLowerCase().includes(searchInput);
    });
    displayContacts(filteredContacts);
});

// ...existing code...




// Contact data
let contacts = [];

// Add Contact button event listener
document.getElementById('addContactBtn').addEventListener('click', () => {
    const addContactModal = document.getElementById('addContactModal');
    addContactModal.style.display = 'block';

    const closeBtns = document.querySelectorAll('#addContactModal .close');
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
            addContactModal.style.display = 'none';
        });
    });

    const addContactForm = document.getElementById('addContactForm');
    addContactForm.removeEventListener('submit', handleAddContact);
    addContactForm.addEventListener('submit', handleAddContact);
});

// Handle Add Contact form submission
function handleAddContact(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const number = document.getElementById('numberInput').value;
    const picture = document.getElementById('pictureInput').files[0];

    if (name && email && number && picture) {
        const reader = new FileReader();
        reader.onload = () => {
            const contact = {
                name,
                email,
                number,
                picture: reader.result,
                date: new Date().toLocaleString()
            };
            contacts.push(contact);
            displayContacts();
            const addContactModal = document.getElementById('addContactModal');
            addContactModal.style.display = 'none';
            addContactForm.reset();
        };
        reader.readAsDataURL(picture);
    }
}

// Display contacts
function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.innerHTML = `
            <img src="${contact.picture}" alt="${contact.name}">
            <span>${contact.name}</span>
            <span class="date">${contact.date}</span>
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
        `;
        contactElement.querySelector('.deleteBtn').addEventListener('click', () => {
            deleteContact(index);
        });
        contactElement.querySelector('.editBtn').addEventListener('click', () => {
            editContact(index);
        });
        contactElement.addEventListener('click', () => {
            displayContactDetails(index);
        });

        contactList.appendChild(contactElement);
    });
}

// Delete contact
function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}

// Edit contact
function editContact(index) {
    const contact = contacts[index];
    const editContactModal = document.getElementById('addContactModal');
    editContactModal.style.display = 'block';

    const closeBtns = document.querySelectorAll('#addContactModal .close');
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
            editContactModal.style.display = 'none';
        });
    });

    const editContactForm = document.getElementById('addContactForm');
    editContactForm.removeEventListener('submit', handleAddContact);
    editContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const number = document.getElementById('numberInput').value;
        const picture = document.getElementById('pictureInput').files[0];

        if (name && email && number && picture) {
            const reader = new FileReader();
            reader.onload = () => {
                contact.name = name;
                contact.email = email;
                contact.number = number;
                contact.picture = reader.result;
                contact.date = new Date().toLocaleString();
                displayContacts();
                editContactModal.style.display = 'none';
                editContactForm.reset();
            };
            reader.readAsDataURL(picture);
        }
    });

    // Set the existing contact details in the edit form
    document.getElementById('nameInput').value = contact.name;
    document.getElementById('emailInput').value = contact.email;
    document.getElementById('numberInput').value = contact.number;
}

// Display contact details in modal
function displayContactDetails(index) {
    const contact = contacts[index];
    const modalContactDetails = document.getElementById('modalContactDetails');
    modalContactDetails.innerHTML = `
        <img src="${contact.picture}" alt="${contact.name}">
        <h2>${contact.name}</h2>
        <p>Email: ${contact.email}</p>
        <p>Phone Number: ${contact.number}</p>
        <p>Date: ${contact.date}</p>
    `;

    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}


// Initialize the app
displayContacts();



