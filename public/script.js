var dataList = new Map();
var likeCounterList = new Map();

var cardList = [];

var tileId = 0;
var tileOneId = 0;
var tileTwoOneId = 0;
var tileThreeId = 0;

var panel =
  '<textarea id="myText" ></textarea> <div class="actions"> <div id="like"><img src="assets/heart.svg"/></div> <div id="counter"></div> <div id="del"><img src="assets/delete.svg"/></div> </div>';

//onfocusout = "save(tileId)"
// var card =
//   '<div class="actions" onclick="updateCard(event)"> <div id="save">SAVE</div> <div id="del">DEL</div> </div>';
//--------------------------------------------------------------------------------------------------------------------

function displayPanel(id, data) {
  tileId = id;
  if (document.getElementsByClassName("panel").length == 0) {
    document.getElementById("addPanel").style.display = "block";
    var newDiv = document.createElement("div");
    newDiv.className = "panel";
    newDiv.id = "panel-body";
    newDiv.innerHTML = panel;

    document.getElementById("addPanel").appendChild(newDiv);
    document.getElementById("myText").value = data;
    counter(id);
    save(id);
    del(id);
  }
}

function save(id) {
  document.getElementById("addPanel").onclick = function (e) {
    if (e.target == document.getElementById("addPanel")) {
      var data = document.getElementById("myText").value;
      saveData(id, data);
      clearPanel();
    }
  };
}

function saveData(id, data) {
  if (isNaN(id) == false && data) {
    insertNewCard(id, data);
  } else if (isNaN(id)) {
    dataList.set(id, data);
    document.getElementById(id).innerText = "" + data + "";
  }
}

function insertNewCard(id, data) {
  var newDiv = document.createElement("div");
  newDiv.className = "card" + id;
  newDiv.id = "tile" + id + "-card" + getTileId(id);
  var newId = newDiv.id;
  newDiv.innerText = "" + data + "";

  document.getElementById("t" + id).appendChild(newDiv);
  dataList.set(newId, data);
  document.getElementById(newId).onclick = () => {
    displayPanel(newId, dataList.get(newId));
  };
}

function updateCard(event) {
  var id = event.target.id;
  var data = event.target.innerText;
  var tileName = event.target.className;
  var tileId = tileName.charAt(tileName.length - 1);
  updatePanel(tileId, data);
}

function counter(id) {
  document.getElementById("like").onclick = function () {
    var counter = likeCounterList.get(id);
    if (counter) {
      likeCounterList.set(id, counter + 1);
    } else {
      likeCounterList.set(id, 1);
    }
    document.getElementById("counter").innerText = counter + 1;
  };
}

function getTileId(id) {
  if (id == 1) {
    return (tileOneId += 1);
  } else if (id == 2) {
    return (tileTwoOneId += 1);
  } else if (id == 3) {
    return (tileThreeId += 1);
  }
}

function del(id) {
  document.getElementById("del").onclick = function () {
    if (isNaN(id)) {
      dataList.delete(id);
      document.getElementById(id).remove();
    }
    clearPanel();
  };
}

function clearPanel() {
  document.getElementById("addPanel").innerHTML = "";
  document.getElementById("addPanel").style.display = "none";
}



//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-------------TEST AREA------------------------------
//----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------

function test() {
  document.getElementById("addPanel").onclick = function (e) {
    console.log(e.target);
    if (e.target == document.getElementById("addPanel")) {
      console.log("You clicked targeted area");
    } else {
      console.log("wrong area");
    }
  };
}
