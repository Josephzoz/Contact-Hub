var contactNameInput = document.getElementById("fullName");
// console.log(contactNameInput)
var contactNumberInput = document.getElementById("phoneNumber");
// console.log(contactNumberInput)
var contactEmailInput = document.getElementById("emailAddress");
// console.log(contactEmailInput)
var contactAddressInput = document.getElementById("Address");
// console.log(contactAddressInput)
var contactGroupInput = document.getElementById("Group");
// console.log(contactGroupInput)
var contactNotesInput = document.getElementById("Notes");
// console.log(contactNotesInput)
var contactImageInput = document.getElementById("change-photo");
// console.log(contactImageInput)
var contactFavInput = document.getElementById("fav");
// console.log(contactFavInput)
var contactEmargInput = document.getElementById("emarg");
// console.log(contactEmargInput)
var searcInput = document.getElementById("searcInput");

var contacts = document.getElementById("contacts");

var favorite = document.getElementById("favorite");

var emergency = document.getElementById("emarj");
var totalCount = document.getElementById("total");
var favoriteCount = document.getElementById("favorite-count");
var emergencyCount = document.getElementById("Emar-count");

var allContacts = JSON.parse(localStorage.getItem("allContacts")) || [];
displayContacts(allContacts);
displayFavorites();
displayEmergency();
updateCounters();

var currentIndex = 0;
var isUpdate = false;

function createContact() {
  var phoneExist = false;

  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].phoneNumber === contactNumberInput.value) {
      phoneExist = true;
      break;
    }
  }

  if (phoneExist) {
    Swal.fire({
      icon: "error",
      title: "Duplicate Phone Number",
      text: "A contact with this phone number already exists",
    });

    return;
  }
  var contact = {
    fullName: contactNameInput.value,
    phoneNumber: contactNumberInput.value,
    emailAddress: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    photo: contactImageInput.files[0]?.name || "contact.jpg",
    fav: contactFavInput.checked,
    emergency: contactEmargInput.checked,
  };

  allContacts.push(contact);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  displayContacts(allContacts);
  displayFavorites();
  displayEmergency();
  updateCounters();
  clearInputs();

  Swal.fire({
    icon: "success",
    title: "Added",
    text: "Contact has been added successfully",
    timer: 2000,
    showConfirmButton: false,
  });
}

function displayContacts(contactsArr) {
  var temp = "";

  for (var i = 0; i < contactsArr.length; i++) {
    temp += `
        <div class="contact-card col-12 col-sm-6 p-2">
                            <div class="inner p-3 shadow rounded-4">
                                <div>
                                    <div class="d-flex gap-3 align-items-start">
                                        <img src="images/${contactsArr[i].photo}" alt="contact image"
                                            class="rounded-4 col-12">
                                        <div>
                                            <h3 class="fs-5">${contactsArr[i].fullName}</h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                                    <i class="fa-solid fa-phone text-primary small"></i>
                                                </div>
                                                <span class="text-secondary fw-medium">${contactsArr[i].phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                        <span class="text-secondary">${contactsArr[i].emailAddress}</span>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-location-dot text-success small"></i>
                                        </div>
                                        <span class="text-secondary">${contactsArr[i].address}</span>
                                    </div>
                                    <div class="py-3">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <span class="small text-purple">${contactsArr[i].group}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        
                                        <div class="d-flex gap-3">
    <a
        href="tel:${contactsArr[i].phoneNumber}"
        class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content"
        ><i class="fa-solid fa-phone text-success small"></i
      ></a>

      <a
        href="mailto:${contactsArr[i].emailAddress}"
        class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content"
        ><i class="fa-solid fa-envelope text-purple small"></i
      ></a>
     
    </div>
                                        <div class="d-flex gap-3 align-items-center">
                                            <button class="border-0 bg-transparent" onclick="addToFavorite(${i})"><i
                                                    class="fa-regular fa-star text-secondary"></i></button>
                                            <button class="border-0 bg-transparent" onclick="addToEmergency(${i})"><i
                                                    class="fa-regular fa-heart text-secondary"></i></button>
                                            <button class="border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="updateContact(${i})"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>
                                            <button class="border-0 bg-transparent" onclick="deleteContact(${i})"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
  }
  contacts.innerHTML = temp;
}

function displayFavorites() {
  var temp = "";
  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].fav) {
      temp += `
        <div class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3 mb-3">
                                            <img src="images/${allContacts[i].photo}" alt="favorite image" class="rounded-2">
                                            <div class="contact-info me-auto">
                                                <h6 class="small fw-medium m-0">${allContacts[i].fullName}</h6>
                                                <p class="text-secondary m-0">${allContacts[i].phoneNumber}</p>
                                            </div>
                                            <a
  href="tel:${allContacts[i].phoneNumber}"
  class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center text-decoration-none"
  ><i class="fa-solid fa-phone text-success"></i
></a>
                                        </div>
        `;
      //
    }
  }
  favorite.innerHTML = temp;
}

function displayEmergency() {
  var temp = "";
  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].emergency) {
      temp += `
        <div class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3 mb-3">
                                        <img src="images/${allContacts[i].photo}" alt="favorite image" class="rounded-2">
                                        <div class="contact-info me-auto">
                                            <h6 class="small fw-medium m-0">${allContacts[i].fullName}</h6>
                                            <p class="text-secondary m-0">${allContacts[i].phoneNumber}</p>
                                        </div>
                                        <a
  href="tel:${allContacts[i].phoneNumber}"
  class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center text-decoration-none"
  ><i class="fa-solid fa-phone text-success"></i
></a>
                                    </div>
        `;
    }
  }
  emergency.innerHTML = temp;
}

function addToFavorite(index) {
  allContacts[index].fav = !allContacts[index].fav;
  saveToLocalStorage();
  updateCounters();
  displayFavorites();
}

function addToEmergency(index) {
  allContacts[index].emergency = !allContacts[index].emergency;
  saveToLocalStorage();
  updateCounters();
  displayEmergency();
}

function clearInputs() {
  contactNameInput.value = "";
  contactNumberInput.value = "";
  contactEmailInput.value = "";
  contactAddressInput.value = "";
  contactGroupInput.value = "select-group";
  contactNotesInput.value = "";
  contactImageInput.value = "";
  contactFavInput.checked = false;
  contactEmargInput.checked = false;
}

function updateContact(index) {
  contactNameInput.value = allContacts[index].fullName;
  contactNumberInput.value = allContacts[index].phoneNumber;
  contactEmailInput.value = allContacts[index].emailAddress;
  contactAddressInput.value = allContacts[index].address;
  contactGroupInput.value = allContacts[index].group;
  contactNotesInput.value = allContacts[index].notes;
  contactFavInput.checked = allContacts[index].fav;
  contactEmargInput.checked = allContacts[index].emergency;

  currentIndex = index;
  isUpdate = true;
}

function toggleActionBtns(isUpdate) {
  if (isUpdate) {
    onclickupdateContact();
  } else {
    createContact();
  }
}

function onclickupdateContact() {
  var contact = {
    fullName: contactNameInput.value,
    phoneNumber: contactNumberInput.value,
    emailAddress: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    photo: contactImageInput.files[0]?.name || allContacts[currentIndex].photo,
    fav: contactFavInput.checked,
    emergency: contactEmargInput.checked,
  };

  allContacts.splice(currentIndex, 1, contact);
  saveToLocalStorage();
  displayContacts(allContacts);
  displayFavorites();
  displayEmergency();
  updateCounters();
  clearInputs();
  isUpdate = false;
  Swal.fire({
    icon: "success",
    title: "Updated",
    text: "Contact has been updated successfully",
    timer: 2000,
    showConfirmButton: false,
  });
}

function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete this contact? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  })

    .then(function (result) {
      if (result.isConfirmed) {
        allContacts.splice(index, 1);

        saveToLocalStorage();

        displayContacts(allContacts);
        displayFavorites();
        displayEmergency();
        updateCounters();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contact has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
}

function saveToLocalStorage() {
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
}

function filterContacts() {
  var filteredContactsArr = [];
  for (var i = 0; i < allContacts.length; i++) {
    if (
      allContacts[i].fullName
        .toLowerCase()
        .includes(searcInput.value.toLowerCase()) ||
      allContacts[i].phoneNumber.includes(searcInput.value) ||
      allContacts[i].emailAddress
        .toLowerCase()
        .includes(searcInput.value.toLowerCase())
    ) {
      filteredContactsArr.push(allContacts[i]);
    }
  }

  displayContacts(filteredContactsArr);
}

var regex = {
  name: /^[a-zA-Z0-9 ]{2,50}$/,
  phoneNumber: /^01[0125][0-9]{8}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
};

function inputValidation(element, key) {
  var result = regex[key].test(element.value);
  if (result) {
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.nextElementSibling.classList.remove("d-none");
  }
}

function validateContact() {
  if (!regex.name.test(contactNameInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
    return false;
  }

  if (!regex.phoneNumber.test(contactNumberInput.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone Number",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return false;
  }

  if (
    contactEmailInput.value !== "" &&
    !regex.email.test(contactEmailInput.value)
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return false;
  }

  return true;
}

function saveContact() {
  if (validateContact()) {
    toggleActionBtns(isUpdate);
  }
}

function updateCounters() {
  totalCount.innerHTML = allContacts.length;
  var fav = 0;
  var emar = 0;

  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].fav) {
      fav++;
    }

    if (allContacts[i].emergency) {
      emar++;
    }
  }

  favoriteCount.innerHTML = fav;
  emergencyCount.innerHTML = emar;
}
