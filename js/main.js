const loadPhones = async (phonesList = "13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phonesList}`);
    const data = await res.json();
    const phones = data.data;
    displayData(phones, isShowAll);
}


const displayData = (phones, isShowAll) => {
    console.log(phones);
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";
    const showAllBtnContainer = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAllBtnContainer.classList.remove("hidden");
    } else {
        showAllBtnContainer.classList.add("hidden");
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList = `card bg-gray-100 shadow-xl p-5`;
        div.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center mt-5">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);

    });
    toggleLoadingSpinner(false);

}
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const inputField = document.getElementById("input-field");
    const inputFieldValue = inputField.value;
    loadPhones(inputFieldValue, isShowAll);
}
// Loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
}
// handle show all
const handleShowAll = () => {
    handleSearch(true);
}
// handle so details modal
const handleShowDetails = async phoneId => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    const data = await response.json();
    const phone = data.data;
    showPhoneDetails(phone);

}
// showPhoneDetails
const showPhoneDetails = (phoneDetails) => {
    showDetails.showModal();
    console.log(phoneDetails);
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
    <img class="w-2/4 mx-auto" src="${phoneDetails.image}" alt="">
    <h3 class="font-bold text-2xl mt-5">${phoneDetails.name}</h3>
    <h5 class="text-lg">Storage : ${phoneDetails.mainFeatures.storage}</h5>
    <h5 class="text-lg">Display Size : ${phoneDetails.mainFeatures.displaySize}</h5>
    <h5 class="text-lg">Chipset : ${phoneDetails.mainFeatures.chipSet}</h5>
    <h5 class="text-lg">Memory : ${phoneDetails.mainFeatures.memory}</h5>
    <h5 class="text-lg">Brand : ${phoneDetails.brand}</h5>
    <h5 class="text-lg">GPS : ${phoneDetails.others?.GPS? phoneDetails.others.GPS:"No information of GPS"}</h5>
    <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
    </div>
    `
}
loadPhones();