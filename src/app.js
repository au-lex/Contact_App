const addContact = document.querySelector(".addContact-container")
const openContacticon = document.querySelector(".add")
 const closeaddContact = document.querySelector(".closeAddContact-container")

 const inputContainer = document.querySelector(".inputContainer")

openContacticon.addEventListener("click", () => {

    addContact.classList.add("open")
   
})
closeaddContact.addEventListener("click", () => {

    addContact.classList.remove("open")
   
})


let contacts = []


inputContainer.removeEventListener("submit", handleForm)
inputContainer.addEventListener("submit", handleForm)


function handleForm(e) {
    e.preventDefault();
    const firstName = document.querySelector(".firstname").value;
    const lastName = document.querySelector(".lastname").value;
    const emailName = document.querySelector(".email").value;
    const tele = document.querySelector(".tele").value;
    const profile = document.querySelector(".picture").files[0]


    if (firstName && lastName && emailName && tele && profile) {
        const reader = new FileReader();
        reader.onload = () => {
            const contact = {
                firstName,
                lastName,
                emailName,
                tele,
                profile: reader.result,
                date: new Date().toLocaleString()
            };
            contacts.push(contact)
            ShowContacts();
            inputContainer.reset();
            addContact.classList.remove("open")

        };
        reader.readAsDataURL(profile);
    }


}





function ShowContacts() {
    const contactList = document.querySelector(".contactList");
    contactList.innerHTML = '';
  
    contacts.forEach((contact, index) => {
      const contactElement = document.createElement("div");
      contactElement.classList.add("contact");
      contactElement.innerHTML = `
        <img src="${contact.profile}" alt="${contact.firstName}">
        <div class="c">
          <span>${contact.firstName}</span>
          <span class="date">${contact.date}</span>
        </div>
        <div class="conName">
          <button class="deleteBtn"><i class="ri-delete-bin-5-line"></i></button>
          <button class="editBtn"><i class="ri-edit-box-line"></i></button>
        </div>
      `;
  
      contactElement.addEventListener("click", () => {
        showcontactDetails(index);
      });
  
      contactList.appendChild(contactElement);
    });
  }
  
  function showcontactDetails(index) {
    const contact = contacts[index];
    const viewmcontactDetails = document.querySelector(".viewcontactsDetails");
    const viewmodalDetails = document.querySelector(".viewContactModal");
    viewmodalDetails.classList.add("active");
  
    const closeview = document.querySelector(".closeview");
    closeview.addEventListener('click', () => {
      viewmodalDetails.classList.remove("active");
    });
  
    viewmcontactDetails.innerHTML = `
    <div class="flex justify-center mt-[4rem]">
    <div">
    <div class="detailImage">
      <img src="${contact.profile}" alt="${contact.firstName}">
      </div>
      <div class ="details">
        <h2>${contact.firstName} ${contact.lastName}</h2>
        <p>Email: ${contact.emailName}</p>
        <p>Phone Number: ${contact.tele}</p>
        <p>Date: ${contact.date}</p>
        </div>
        </div>
        </div>
    `;
  }
  
  
  ShowContacts();
  



ShowContacts();