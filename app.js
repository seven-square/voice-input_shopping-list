// ***BUILD the shopping list based on the instances/examples given in the question.***
// Toggle a class for the complete
const liItemDiv = document.querySelector(".li-item-div");
const header1 = document.querySelector(".header1");

const listContainer = document.querySelector(".list-container");
const shoppingListContainer = document.createElement("div");
shoppingListContainer.classList.add("shopping-list-container");

const yourListSpan = document.createElement("span");
yourListSpan.classList.add("your-list");
// yourListSpan.textContent = "Your List";

const shoppingList = document.createElement("ul");
shoppingList.classList.add("shopping-list");
shoppingListContainer.appendChild(yourListSpan);
shoppingListContainer.appendChild(shoppingList);
const main = document.querySelector(".main-body");
let arrayOfShoppingLists = [];
let arrayOfShoppingListsItems = [];
let remainingListObject = {};

// Items to Shop
// first off, select the section holding it so you can have different Divs based on the shopping-list-name, you feel me?
const itemsContainer = document.querySelector(".items-container");

// const itemsToShop = document.createElement("div");
// itemsToShop.classList.add("shopping-list-container");
// itemsToShop.classList.add("items-to-shop");

// const shoppingListName = document.createElement("p");
// shoppingListName.classList.add("shopping-list-name");
// itemsToShop.appendChild(shoppingListName);

//Item and Quantity DIV
// const itemQuantity = document.createElement("div");
// itemQuantity.classList.add("item-quantity");

// const itemHeader = document.createElement("p");
// itemHeader.classList.add("item-header");

// const quantityHeader = document.createElement("p");
// quantityHeader.classList.add("quantity-header");

// itemQuantity.appendChild(itemHeader);
// itemQuantity.appendChild(quantityHeader);

// Creating the Ordered List- OL and its descendants
// const itemsList = document.createElement("ol");
// itemsList.classList.add("items-list");

// const shoppingListInDiv = document
//   .querySelector(".shopping-list-div")
//   .querySelector("li");

// select API
const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();
// recognition.interimResults = true;

let itemsContainerChildrenObject = {};
// start the recognition as it ends
recognition.addEventListener("end", () => {
  recognition.start();
});
recognition.start();
recognition.continuous = true;
console.log("hi");
recognition.addEventListener("result", (e) => {
  // ==================================================================================
  // Create a new List
  let shoppingListLi;
  let shoppingListDiv;
  const current = e.resultIndex;
  // console.log(e);
  let transcript = e.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(e.results[current][0].transcript);
  // transcript = "add a record for bread quantity is 5 into list";
  if (transcript.includes("create") && transcript.includes("called")) {
    // create a new list called schooling
    header1.style.display = "none";
    yourListSpan.textContent = "Your List";

    let list = transcript.split(" ");

    console.log(list);

    shoppingListDiv = document.createElement("div");
    shoppingListDiv.classList.add("shopping-list-div");
    shoppingListLi = document.createElement("li");
    shoppingListDiv.appendChild(shoppingListLi);
    for (i = 0; i < list.length; i++) {
      if (list[i] == "called") {
        let nameOfList;
        nameOfList = list[i + 1].charAt(0).toUpperCase() + list[i + 1].slice(1);
        shoppingListLi.textContent = nameOfList;

        arrayOfShoppingLists.push(nameOfList);
        remainingListObject[nameOfList] = nameOfList;

        if (list[i + 2]) {
          shoppingListLi.textContent = nameOfList + list[i + 2];
        }
        shoppingList.appendChild(shoppingListDiv);
        main.appendChild(shoppingListContainer);
      }
    }

    console.log(arrayOfShoppingLists, remainingListObject);

    // shoppingList.appendChild(shoppingListDiv);
    console.log(transcript);
    console.log(shoppingListLi, shoppingListDiv);
  }

  // ===================================================================================
  //   Delete list
  if (transcript.includes("delete")) {
    let list = transcript.split(" ");
    for (i = 0; i < shoppingList.children.length; i++) {
      for (j = 0; j < list.length; j++) {
        console.log(
          shoppingList.children[i].firstChild.textContent.toLowerCase(),
          list[j].toLowerCase()
        );
        if (
          shoppingList.children[i].firstChild.textContent.toLowerCase() ==
          list[j].toLowerCase()
        ) {
          arrayOfShoppingLists.splice(
            arrayOfShoppingLists.indexOf(shoppingList.children[i].textContent),
            1
          );
          delete remainingListObject[shoppingList.children[i].textContent];
          shoppingList.children[i].remove();

          console.log(arrayOfShoppingLists);
        }
      }
    }
    console.log(arrayOfShoppingLists, remainingListObject);
  }

  // ===========================================================================
  //   add item to a shopping list
  /*if (
    transcript.includes("add") &&
    transcript.includes("item") &&
    transcript.includes("quantity") &&
    (transcript.includes("list") || transcript.includes("into"))
  ) {
    let SLSpecified;
    let list = transcript.split(" ");*/

  // itemHeader.textContent = "item";
  // quantityHeader.textContent = "quantity";

  /* let item;
    let quantity;*/

  // let list = transcript.split(" ");

  /*for (j = 0; j < list.length; j++) {
      if (list[j] === "item") {
        item = list[j + 1];
      }
      if (list[j] === "quantity") {
        quantity = list[j + 2];
      }
      if (list[j] === "list" || list[j] === "into") {*/

  // listContainer.style.display = "none";

  /*SLSpecified = list[j + 1];*/

  // for (let i = 0; i < arrayOfShoppingLists.length; i++) {

  /*for (let i = 0; i < arrayOfShoppingLists.length; i++) {
          if (
            arrayOfShoppingLists[i].toLowerCase() === SLSpecified.toLowerCase()
          ) {*/

  // shoppingListName.textContent = arrayOfShoppingLists[i];
  // arrayOfShoppingListsItems.push(arrayOfShoppingLists[i]);

  /* console.log(arrayOfShoppingLists, remainingListObject);*/

  // place element creation here
  /*if (item && quantity / 1 == quantity) {
              listContainer.style.display = "none";

              if (arrayOfShoppingLists[i] in remainingListObject) {*/

  // if (itemsContainer.children[i]) {
  //   itemsContainer.children[i].style.display = "block";
  // }
  // ****
  // create a new Div

  /*const itemsToShop = document.createElement("div");
                itemsToShop.classList.add("shopping-list-container");
                itemsToShop.classList.add("items-to-shop");*/

  // create a new paragraph

  /*const shoppingListName = document.createElement("p");
                shoppingListName.classList.add("shopping-list-name");
                itemsToShop.appendChild(shoppingListName);
                shoppingListName.textContent = arrayOfShoppingLists[i];*/

  // create a new quantityItemDiv

  /*const itemQuantity = document.createElement("div");
                itemQuantity.classList.add("item-quantity");

                const itemHeader = document.createElement("p");
                itemHeader.classList.add("item-header");
                itemHeader.textContent = "item";

                const quantityHeader = document.createElement("p");
                quantityHeader.classList.add("quantity-header");
                quantityHeader.textContent = "quantity";

                itemQuantity.appendChild(itemHeader);
                itemQuantity.appendChild(quantityHeader);*/

  // CREATE A NEW OL-

  /*const itemsList = document.createElement("ol");
                itemsList.classList.add("items-list");*/

  // You can get a Function here, with the item and quantity parameters
  // create a new li-item-div

  // add it to items list

  /*const itemLiDiv = document.createElement("div");
                itemLiDiv.classList.add("item-li");

                const liItem = document.createElement("li");

                const itemParagraph = document.createElement("p");
                itemParagraph.classList.add("item");
                itemParagraph.textContent = item;
                liItem.appendChild(itemParagraph);
                itemLiDiv.appendChild(liItem);

                const quantityParagraph = document.createElement("p");
                quantityParagraph.classList.add("quantity");
                quantityParagraph.textContent = quantity;
                itemLiDiv.appendChild(quantityParagraph);

                itemsList.appendChild(itemLiDiv);
                itemsToShop.appendChild(itemQuantity);
                itemsToShop.appendChild(itemsList);
                itemsContainer.appendChild(itemsToShop);
                delete remainingListObject[arrayOfShoppingLists[i]];
                console.log(arrayOfShoppingLists, remainingListObject);
              } else {
                for (m = 0; m < itemsContainer.children.length; m++) {
                  if (
                    SLSpecified.toLowerCase() ==
                    itemsContainer.children[
                      m
                    ].children[0].textContent.toLowerCase()
                  ) {
                    //   itemsContainer.children[i].style.display = "block";
                    const itemLiDiv = document.createElement("div");
                    itemLiDiv.classList.add("item-li");

                    const liItem = document.createElement("li");

                    const itemParagraph = document.createElement("p");
                    itemParagraph.classList.add("item");
                    itemParagraph.textContent = item;
                    liItem.appendChild(itemParagraph);
                    itemLiDiv.appendChild(liItem);

                    const quantityParagraph = document.createElement("p");
                    quantityParagraph.classList.add("quantity");
                    quantityParagraph.textContent = quantity;
                    itemLiDiv.appendChild(quantityParagraph);

                    itemsContainer.children[m].children[2].appendChild(
                      itemLiDiv
                    );

                    console.log(
                      itemsContainer.children[m].children[0].textContent
                    );
                  }
                }
              }
            }

            // use this while cleaning
            // itemsToShop = itemsContainer.children[i];
            // itemsList = itemsContainer.children[i].children[2];
            // itemsContainer.children[k].children[2].appendChild(itemLiDiv);

            // You can get a Function here, with the item and quantity parameters
            // create a new li-item-div
            // add it to items list
            // else {
            //     alert(`${SLSpecified} is not an existing shopping list`);
            //   }
          }

          /*else {
            if (
              arrayOfShoppingLists[i].toLowerCase() !==
              SLSpecified.toLowerCase()
            ) {
              if (itemsContainer.children[i]) {
                itemsContainer.children[i].style.display = "none";
                console.log(itemsContainer.children[i]);
              }
            }
          }*/
  // }
  // else {
  //   for (i = 0; i < itemsContainer.children.length; i++) {
  //     if (
  //       itemsContainer.children[
  //         i
  //       ].children[0].textContent.toLowerCase() !==
  //       SLSpecified.toLowerCase()
  //     ) {
  //       itemsContainer.children[i].style.display = "none";
  //     }
  //   }
  // }
  // else{
  //   alert(`${SLSpecified} is not an existing shopping list`);
  // }

  //   }
  // }
  // console.log(transcript);
  // console.log(list);
  // console.log(item);
  // console.log(quantity);
  // }

  //===============================================================================
  // take me back to my shopping list container
  if (transcript.includes("take me back to my list")) {
    listContainer.style.display = "flex";

    // display of every items-container is set to none...
    itemsContainer.style.display = "none";
  }
  //   incase of unrecognized words
  //   else {
  //     alert("I didn't quite catch that");
  //   }
});
/* getShoppingListcreateShoppingList()
biggestContainer.insertBefore(shoppingList, addShoppingList)
*/

// FUNCTIONS

// Create a new shopping List
// function createNewShoppingList(e) {

// }
/* When I say "Create a new list called schooling"
-create shopping list Div with name "Schooling" and an ID
-add it to the bigger Div
-add it to Local Storage*/
// Save Shopping List to Local Storage

// Delete a shopping List

/* when I say "Delete list Foodstuff" 
-remove it(being a child) from the Bigger Div
-remove it's dictionary from Local Storage using it's id*/
// Delete Shopping List from Local Storage

// Add item & respective quantity to a shopping List

// Add item & respective quantity to a shopping List in Local Storage

// Delete item from shopping List
/*when I say "Delete item 6 from list Schooling"
-remove item 6 from Schooling shopping list
-remove it from local storage */
// Delete item from shopping List in local storage

// Get Shopping List from Local Storage so I can recreate them on the page
/*when the page loads.., create the existing shopping lists and their items
maybe call the 
 */

/*LOCAL STORAGE
A list of dictionaries(twice)
variable names
-content
-id: (Math.floor(Math.random() * 100))
-items
-
-quantity
*/
/*
let shoppingListLS = [
  {
    content: "Schooling",
    id: 344,
    items: [
      { item: "Books", quantity: 12 },
      { quantity: "Pencils", quantity: 12 },
    ],
  },
  {
    content: "Foodstuffs",
    id: 667,
    items: [
      { item: "Fish", quantity: 2 },
      { item: "Bread", quantity: 3 },
    ],
  },
];

function saveLocalShoppingList(content, id, items) {
  let shoppingLists;
  if (localStorage.getItem(shoppingLists === null)) {
    shoppingLists = [];
  } else {
    shoppingLists = JSON.parse(getItem("shoppingLists"));
  }
  // this should be in the create part up there
  let items = [];
  let currentShoppingList = { content: SL.innerText, id: SL.id, items: items };
  //
  shoppingLists.push(currentShoppingList);
  localStorage.set("shoppingLists", JSON.stringify(shoppingLists));

  //this should be in the add item part up there
  let currentItem = { item: item, quantity: quantity };
  items.push(currentItem);
  // so as to not overwrite the order
  for (i = 0; i < shoppingLists.length; i++) {
    if (shoppingLists[i].content == SLSpecified) {
      shoppingLists[i].item = items;
    }
  }
  // items = [
  //   { item: "Books", quantity: 12 },
  //   { item: "Pencils", quantity: 12 },
  // ];
  // currentShoppingList = { content: SL.innerText, id: SL.id, items: items };
  //
  // shoppingLists.push(currentShoppingList);
  localStorage.set("shoppingLists", JSON.stringify(shoppingLists));
}
function getLocalShoppingList(content, id, items) {}
function removeLocalShoppingList(content, id, items) {}
*/
