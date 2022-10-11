const liItemDiv = document.querySelector(".li-item-div");
const header1 = document.querySelector(".header1");

// const listContainer = document.querySelector(".list-container");
const shoppingListContainer = document.createElement("div");
shoppingListContainer.classList.add("shopping-list-container");

const yourListSpan = document.createElement("span");
yourListSpan.classList.add("your-list");
yourListSpan.textContent = "Your List";
shoppingListContainer.appendChild(yourListSpan);

const shoppingList = document.createElement("ul");
shoppingList.classList.add("shopping-list");

const main = document.querySelector(".main-body");

let arrayOfShoppingLists = [];
let arrayOfShoppingListsItems = [];
let remainingListObject = {};

// Items to Shop
// first off, select the section holding it so you can have different Divs based on the shopping-list-name, you feel me?
const itemsContainer = document.querySelector(".items-container");

const itemsToShop = document.createElement("div");
itemsToShop.classList.add("shopping-list-container");
itemsToShop.classList.add("items-to-shop");

const shoppingListName = document.createElement("p");
shoppingListName.classList.add("shopping-list-name");
itemsToShop.appendChild(shoppingListName);

// Item and Quantity DIV
const itemQuantity = document.createElement("div");
itemQuantity.classList.add("item-quantity");

const itemHeader = document.createElement("p");
itemHeader.classList.add("item-header");
itemHeader.textContent = "Item";

const quantityHeader = document.createElement("p");
quantityHeader.classList.add("quantity-header");
quantityHeader.textContent = "Quantity";

itemQuantity.appendChild(itemHeader);
itemQuantity.appendChild(quantityHeader);

itemsToShop.appendChild(itemQuantity);

const itemsList = document.createElement("ol");
itemsList.classList.add("items-list");

// select API
const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();
// recognition.interimResults = true;

// start the recognition as it ends
recognition.addEventListener("end", () => {
  recognition.start();
});
recognition.start();
recognition.continuous = true;
console.log("hi");

let shoppingListLi;
let shoppingListDiv;
let shoppingListId;

let arrayOfShoppingListsAndTheirItems;
let shoppingListArray;
let listNameObject;
let itemsArray;
let itemQuantityObj;
let id;
let nameOfList;

// when the document loads, call this function to display existing shopping lists, and possibly, their items
document.addEventListener("DOMContentLoaded", getShoppingList);

recognition.addEventListener("result", (e) => {
  // ==================================================================================
  // Create a new List
  const current = e.resultIndex;
  // console.log(e);
  let transcript = e.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(e.results[current][0].transcript);

  if (transcript.includes("create") && transcript.includes("called")) {
    let list = transcript.split(" ");
    if (
      itemsContainer.style.display !== "none" &&
      shoppingListContainer.style.display == "none"
    ) {
      itemsContainer.style.display = "none";
      shoppingListContainer.style.display = "block";
    }
    console.log(list);

    for (i = 0; i < list.length; i++) {
      listNameObject = {};
      if (list[i] == "called") {
        nameOfList;
        nameOfList = list[i + 1].charAt(0).toUpperCase() + list[i + 1].slice(1);

        id = parseInt(("" + Math.random()).substring(2, 5));

        arrayOfShoppingLists.push(nameOfList);
        remainingListObject[nameOfList] = nameOfList;
        // set display of header to none
        header1.style.display = "none";

        // create shoppingListDiv
        shoppingListDiv = document.createElement("div");
        shoppingListDiv.classList.add("shopping-list-div");

        // create shopping List li to house the name of the shopping list
        shoppingListLi = document.createElement("li");
        shoppingListDiv.appendChild(shoppingListLi);

        // create li to house the id of the shopping list
        shoppingListId = document.createElement("li");
        shoppingListId.classList.add("id");
        shoppingListDiv.appendChild(shoppingListId);

        if (list[i + 2]) {
          nameOfList = nameOfList + list[i + 2];
        }

        shoppingListLi.textContent = nameOfList;

        // SAVE TO LOCAL STORAGE
        // ***********************************************************************************************************************
        saveShoppingList(id, nameOfList);
        // ***********************************************************************************************************************

        shoppingListId.textContent = id;

        shoppingList.appendChild(shoppingListDiv);
        shoppingListContainer.appendChild(shoppingList);
        main.appendChild(shoppingListContainer);

        // ITEMS TO SHOP
        // const itemsToShop = document.createElement("div");
        // itemsToShop.classList.add("shopping-list-container");
        // itemsToShop.classList.add("items-to-shop");

        // const shoppingListName = document.createElement("p");
        // shoppingListName.classList.add("shopping-list-name");
        // itemsToShop.appendChild(shoppingListName);

        // Creating the Ordered List- OL and its descendants
        // const itemsList = document.createElement("ol");
        // itemsList.classList.add("items-list");

        console.log(
          arrayOfShoppingLists,
          remainingListObject,
          arrayOfShoppingListsAndTheirItems
        );
      }
    }

    // shoppingList.appendChild(shoppingListDiv);
    console.log(transcript);
    console.log(
      shoppingListLi,
      shoppingListDiv,
      arrayOfShoppingListsAndTheirItems
    );
  }

  // =================================================
  //   Delete list
  if (
    transcript.includes("delete list") ||
    transcript.includes("remove list")
  ) {
    let instruction = transcript.split(" ");
    if (
      itemsContainer.style.display !== "none" &&
      shoppingListContainer.style.display == "none"
    ) {
      itemsContainer.style.display = "none";
      shoppingListContainer.style.display = "block";
    }
    let nameOfShoppingListToDelete = instruction[2];
    for (list = 0; list < shoppingList.children.length; list++) {
      if (
        shoppingList.children[list].children[0].textContent.toLowerCase() ==
        nameOfShoppingListToDelete.toLowerCase()
      ) {
        shoppingList.children[list].remove();
        deleteShoppingList(nameOfShoppingListToDelete);
      }
    }

    // for (i = 0; i < shoppingList.children.length; i++) {
    //   for (j = 0; j < list.length; j++) {
    //     console.log(
    //       shoppingList.children[i].firstChild.textContent.toLowerCase(),
    //       list[j].toLowerCase()
    //     );
    //     if (
    //       shoppingList.children[i].firstChild.textContent.toLowerCase() ==
    //       list[j].toLowerCase()
    //     ) {
    //       arrayOfShoppingLists.splice(
    //         arrayOfShoppingLists.indexOf(shoppingList.children[i].textContent),
    //         1
    //       );
    //       delete remainingListObject[shoppingList.children[i].textContent];
    //       let nameOfShoppingListToDelete =
    //         shoppingList.children[i].children[0].textContent;
    //       shoppingList.children[i].remove();

    //       deleteShoppingList(nameOfShoppingListToDelete);

    //       console.log(nameOfShoppingListToDelete);
    //     }
    //   }
    // }
    console.log(arrayOfShoppingLists, remainingListObject);
  }

  // ===========================================================================
  //   add item to a shopping list
  if (
    // transcript.includes("add") &&
    transcript.includes("item") &&
    transcript.includes("quantity") &&
    (transcript.includes("list") || transcript.includes("into"))
  ) {
    if (itemsContainer.style.display == "none") {
      itemsContainer.style.display = "block";
    }
    let SLSpecified;
    let list = transcript.split(" ");

    // itemHeader.textContent = "item";
    // quantityHeader.textContent = "quantity";

    let item;
    let quantity;
    let identifier;

    for (j = 0; j < list.length; j++) {
      if (list[j] === "item") {
        item = list[j + 1];
        console.log(item);
      }

      if (list[j] === "quantity") {
        quantity = list[j + 2];
        console.log(quantity);
      }

      if (list[j] === "list" || list[j] === "into") {
        // listContainer.style.display = "none";
        SLSpecified =
          list[j + 1].charAt(0).toUpperCase() + list[j + 1].slice(1);
        console.log(SLSpecified);
      }
      /* IF ID WAS SPecified
      -call function to Save item to local storage 
      -call function to display items of the list*/
    }
    if (item && quantity && SLSpecified) {
      // save the item and it's quantity to local storage
      saveItemWithQuantityToLocalStorage(item, quantity, SLSpecified);

      //Remove the current items present in OL, so that, new items added to another shopping list doesn't add to it
      removeItemsPresentInOL();

      //call function to display items of the shopping list specified
      displayItemsOfShoppingList(SLSpecified);
    }
  }
  // delete item 6(bread) from list schooling || Delete item 6(bread) from list with identifier 001
  if (
    transcript.includes("delete item") &&
    // transcript.includes("item")
    transcript.includes("list")
  ) {
    let nameOfShoppingList;
    let words = transcript.split(" ");
    let itemToRemove;
    for (word = 0; word < words.length; word++) {
      if (words[word] == "item") {
        itemToRemove = words[word + 1];
      }
      if (words[word] == "list") {
        nameOfShoppingList = words[word + 1];
        nameOfShoppingList =
          words[word + 1].charAt(0).toUpperCase() + words[word + 1].slice(1);
        // nameOfShoppingList.charAt(0).toUpperCase() +
        // nameOfShoppingList.slice(1);
        console.log(nameOfShoppingList);
      }
    }

    // remove item from the shopping list in local storage
    deleteItemFromLocalStorage(itemToRemove, nameOfShoppingList);
    // if item is (not) a number else...

    // idOfShoppingList

    // loop through the existing ol and delete it
    if (itemsList.parentElement.style.display == "") {
      // remove the item from the ol displayed on the page
      for (i = 0; i < itemsList.children.length; i++) {
        if (itemsList.children[i].children[0].textContent == itemToRemove) {
          itemsList.children[i].remove();
        }
      }
    }

    // name of shopping Lists specified or List ID

    /*if (!itemsList.parentElement.style.display == "") {
      displayItemsOfShoppingList(SLSpecified);
    }*/
  }

  if (transcript.includes("take me back to my list")) {
    // identifier = list[j+1]
    // else{
    //   alert(`${SLSpecified} is not an existing shopping list`);
    // }

    //===============================================================================
    // take me back to my shopping list container
    shoppingListContainer.style.display = "";

    // display of every items-container is set to none...
    itemsContainer.style.display = "none";
  }
  //   incase of unrecognized words
  //   else {
  //     alert("I didn't quite catch that");
  //   }
});

// create function to initiate arrayOfShoppingListsAndTheirItems
function initiateArrayOfShoppingListsAndTheirItems() {
  // if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
  //   arrayOfShoppingListsAndTheirItems = [];
  // } else {
  //   arrayOfShoppingListsAndTheirItems = JSON.parse(
  //     localStorage.getItem("arrayOfShoppingListsAndTheirItems")
  //   );
  // }
}
function saveShoppingList(id, nameOfList) {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }

  //  modify arrayOfShoppingListsAndTheirItems as appropriate and save it back to localStorage
  listNameObject["list_name"] = nameOfList;
  listNameObject["ID"] = id;
  shoppingListArray = [];

  shoppingListArray.push(listNameObject);
  arrayOfShoppingListsAndTheirItems.push(shoppingListArray);

  localStorage.setItem(
    "arrayOfShoppingListsAndTheirItems",
    JSON.stringify(arrayOfShoppingListsAndTheirItems)
  );
}

function getShoppingList() {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    // do we have any? no, okay, create a new one
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    // we have some? alright, get it back
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }

  // CREATE THE SHOPPING LIST SECTION and ol..
  if (arrayOfShoppingListsAndTheirItems.length !== 0) {
    header1.style.display = "none";
    yourListSpan.textContent = "Your List";

    // Create the Div that'd house the Shopping list li, id and their content
    for (let i = 0; i < arrayOfShoppingListsAndTheirItems.length; i++) {
      // create shoppingListDiv
      shoppingListDiv = document.createElement("div");
      shoppingListDiv.classList.add("shopping-list-div");

      // create shopping List li to house the name of the shopping list
      shoppingListLi = document.createElement("li");
      shoppingListDiv.appendChild(shoppingListLi);

      // create li to house the id of the shopping list
      shoppingListId = document.createElement("li");
      shoppingListId.classList.add("id");
      shoppingListDiv.appendChild(shoppingListId);

      shoppingListLi.textContent =
        arrayOfShoppingListsAndTheirItems[i][0]["list_name"];
      shoppingListId.textContent =
        arrayOfShoppingListsAndTheirItems[i][0]["ID"];
      shoppingList.appendChild(shoppingListDiv);
      shoppingListContainer.appendChild(shoppingList);
      main.appendChild(shoppingListContainer);
    }
  }
}

function deleteShoppingList(listName) {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }

  // Capitalize the first letter of the name of the Shopping List specified
  listName = listName.charAt(0).toUpperCase() + listName.slice(1);
  for (k = 0; k < arrayOfShoppingListsAndTheirItems.length; k++) {
    if (arrayOfShoppingListsAndTheirItems[k][0]["list_name"] === listName) {
      arrayOfShoppingListsAndTheirItems.splice(k, 1);
    }
  }
  localStorage.setItem(
    "arrayOfShoppingListsAndTheirItems",
    JSON.stringify(arrayOfShoppingListsAndTheirItems)
  );
}

function saveItemWithQuantityToLocalStorage(
  nameOfItem,
  quantityOfItem,
  nameOfShoppingList
) {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }
  for (li = 0; li < arrayOfShoppingListsAndTheirItems.length; li++) {
    console.log(arrayOfShoppingListsAndTheirItems[li][0]["list_name"]);
    if (
      nameOfShoppingList ==
      arrayOfShoppingListsAndTheirItems[li][0]["list_name"]
    ) {
      // check if itemsArray(the second item in SLArray is empty)
      if (arrayOfShoppingListsAndTheirItems[li].length == 1) {
        itemsArray = [];
        itemQuantityObj = {};
        itemQuantityObj["nameOfItem"] = nameOfItem;
        itemQuantityObj["quantityOfItem"] = quantityOfItem;

        itemsArray.push(itemQuantityObj);
        arrayOfShoppingListsAndTheirItems[li].push(itemsArray);

        console.log(
          arrayOfShoppingListsAndTheirItems,
          itemsArray,
          itemQuantityObj
        );
      } else {
        // if the shopping list has at least one item already
        itemQuantityObj = {};
        itemQuantityObj["nameOfItem"] = nameOfItem;
        itemQuantityObj["quantityOfItem"] = quantityOfItem;
        arrayOfShoppingListsAndTheirItems[li][1].push(itemQuantityObj);
        console.log(
          itemQuantityObj,
          itemsArray,
          arrayOfShoppingListsAndTheirItems
        );
      }
      localStorage.setItem(
        "arrayOfShoppingListsAndTheirItems",
        JSON.stringify(arrayOfShoppingListsAndTheirItems)
      );
    }
  }
}

// Create function to remove existing items from Ordered List
function removeItemsPresentInOL() {
  // loop through every item in ol to remove them
  for (itemLI = 0; itemLI < itemsList.children.length; itemLI) {
    itemsList.children[itemLI].remove();
  }
}

// Create function to display items of shopping list from local storage (after they've been added)
function displayItemsOfShoppingList(specifiedShoppingList) {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }

  for (arr = 0; arr < arrayOfShoppingListsAndTheirItems.length; arr++) {
    if (
      arrayOfShoppingListsAndTheirItems[arr][0]["list_name"] ==
      specifiedShoppingList
    ) {
      for (
        item = 0;
        item < arrayOfShoppingListsAndTheirItems[arr][1].length;
        item++
      ) {
        // set display of container containing shopping lists to none
        shoppingListContainer.style.display = "none";

        //
        shoppingListName.textContent = specifiedShoppingList;

        // create a new list item Div
        // append it to OL
        const itemLiDiv = document.createElement("div");
        itemLiDiv.classList.add("item-li");

        const liItem = document.createElement("li");

        const itemParagraph = document.createElement("p");
        itemParagraph.classList.add("item");
        itemParagraph.textContent =
          arrayOfShoppingListsAndTheirItems[arr][1][item]["nameOfItem"];
        liItem.appendChild(itemParagraph);
        itemLiDiv.appendChild(liItem);

        const quantityParagraph = document.createElement("p");
        quantityParagraph.classList.add("quantity");
        quantityParagraph.textContent =
          arrayOfShoppingListsAndTheirItems[arr][1][item]["quantityOfItem"];
        itemLiDiv.appendChild(quantityParagraph);

        itemsList.appendChild(itemLiDiv);

        itemsToShop.appendChild(itemsList);
        itemsContainer.appendChild(itemsToShop);
      }
    }
  }
}

// Create a fuction to remove the item from Local Storage
function deleteItemFromLocalStorage(item, fromWhichShoppingList) {
  if (localStorage.getItem("arrayOfShoppingListsAndTheirItems") === null) {
    arrayOfShoppingListsAndTheirItems = [];
  } else {
    arrayOfShoppingListsAndTheirItems = JSON.parse(
      localStorage.getItem("arrayOfShoppingListsAndTheirItems")
    );
  }
  for (arr = 0; arr < arrayOfShoppingListsAndTheirItems.length; arr++) {
    console.log("pass 1");

    if (
      arrayOfShoppingListsAndTheirItems[arr][0]["list_name"].toLowerCase() ==
      fromWhichShoppingList.toLowerCase()
    ) {
      console.log("pass 2");
      for (
        itemName = 0;
        itemName < arrayOfShoppingListsAndTheirItems[arr][1].length;
        itemName++
      ) {
        if (
          arrayOfShoppingListsAndTheirItems[arr][1][itemName][
            "nameOfItem"
          ].toLowerCase() == item.toLowerCase()
        ) {
          console.log("pass 3");
          arrayOfShoppingListsAndTheirItems[arr][1].splice(itemName, 1);
        }
      }
    }
  }
  localStorage.setItem(
    "arrayOfShoppingListsAndTheirItems",
    JSON.stringify(arrayOfShoppingListsAndTheirItems)
  );
}
