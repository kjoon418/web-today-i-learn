// TIL 폼 등록 기능
// document.querySelector()로 DOM 요소를 선택하고, submit 이벤트로 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const dateInput = document.querySelector("#til-date");
  const titleInput = document.querySelector("#til-title");
  const contentInput = document.querySelector("#til-content");

  const dateValue = dateInput.value;
  const titleValue = titleInput.value.trim();
  const contentValue = contentInput.value.trim();

  if (!dateValue || !titleValue || !contentValue) {
    return;
  }

  const newItem = document.createElement("li");
  newItem.className = "til-item";

  const dateSpan = document.createElement("span");
  dateSpan.className = "til-date";
  dateSpan.textContent = dateValue;

  const titleHeading = document.createElement("h3");
  titleHeading.textContent = titleValue;

  const contentParagraph = document.createElement("p");
  contentParagraph.textContent = contentValue;

  newItem.appendChild(dateSpan);
  newItem.appendChild(titleHeading);
  newItem.appendChild(contentParagraph);

  tilList.prepend(newItem);

  tilForm.reset();
});
