var siteName = document.getElementById("siteName");
var websiteUrl = document.getElementById("websiteUrl");
var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
var bookmarkList = [];
var regex = {
  siteName: {
    value: /.{3,}/,
    isValid: false,
  },
  websiteUrl: {
    value:
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\.-]*)*\/?$/,
    isValid: false,
  },
};
if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark(bookmarkList);
}
function addBookmark() {
  var bookmark = {
    name: siteName.value,
    url: websiteUrl.value,
  };
  var nameNotThere = true;
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmark.name.toLowerCase() == bookmarkList[i].name.toLowerCase()) {
      nameNotThere = false;
      break;
    }
  }
  if (regex.siteName.isValid && regex.websiteUrl.isValid && nameNotThere) {
    bookmarkList.push(bookmark);
    setToStorage();
    displayBookmark(bookmarkList);
    clearFormInputs();
  } else {
    myModal.show();
  }
}
function displayBookmark(list) {
  var cartona = "";
  var link = "";
  for (var i = 0; i < list.length; i++) {
    link =
      list[i].url.includes("http://") || list[i].url.includes("https://")
        ? list[i].url
        : "http://" + list[i].url;

    cartona += `
        <tr class="bg-light my-gray-border">
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>
                <a href="${link}" target="_blank" class="btn btn-visit">
                    <i class="fa-regular fa-eye"></i>
                    Visit
                </a>
            </td>
            <td>
                <button class="btn btn-delete" onclick="deleteBookmark(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>
        `;
  }
  document.getElementById("myBody").innerHTML = cartona;
}
function clearFormInputs() {
  siteName.value = "";
  siteName.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");
  regex.siteName.isValid = false;
  websiteUrl.value = "";
  websiteUrl.classList.remove("is-valid");
  websiteUrl.classList.remove("is-invalid");
  regex.websiteUrl.isValid = false;
}
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  setToStorage();
  displayBookmark(bookmarkList);
}
function setToStorage() {
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}
function validate(obj) {
  if (regex[obj.id].value.test(obj.value)) {
    obj.classList.add("is-valid");
    obj.classList.remove("is-invalid");
    regex[obj.id].isValid = true;
  } else {
    obj.classList.add("is-invalid");
    obj.classList.remove("is-valid");
    regex[obj.id].isValid = false;
  }
}
