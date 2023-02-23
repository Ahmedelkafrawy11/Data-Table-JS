let student = [
    { 'id': '1', 'name': 'Ahmed el kafrawy', 'age': '26' },
    { 'id': '2', 'name': 'Ahmed Asal', 'age': '27' },
    { 'id': '3', 'name': 'Ahmed Gamal', 'age': '26' },
    { 'id': '4', 'name': 'Ahmed Reda', 'age': '25' },
]

let tableBody = document.getElementsByClassName('table-body');

function setDataInTable(element, i) {
    return ` <tr>
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td><button onClick="deleteRow(event,${element.id})">delete</button>|<button class="change" id="edit"data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="editRow(event,${element.id},${i})">edit</button></td>
            </tr>`
}
let mode = document.getElementsByClassName("mode");
let addId = document.getElementById("addId");
let addName = document.getElementById("addName");
let addAge = document.getElementById("addAge");


//add student
let StudentModel = document.getElementById("exampleModal");
let modal_backdrop = document.getElementsByClassName("modal-backdrop");
function adding(event) {
    console.log(event.target)


    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));




    console.log("this is mode", mode.value != undefined && mode.value !== "");
    let table = document.getElementById("myTable");


    let newObj = {};
    newObj.id = addId.value;
    newObj.name = addName.value;
    newObj.age = addAge.value;

    // console.log(student);
    if (addId.value == "" || addName.value == "" || addAge.value == "") {
        alert("please enter something")
    } else {
        //check first if mode has value (index) so if mode has value it means that request is come to edit array
        //else if mode is empty ,it means that request is come to add new student
        if (mode.value != undefined && mode.value !== "") {
            student[mode.value] = newObj;

        } else {
            student.push(newObj);
        }


        AddDataIntoTable(student);
        //steps to close modal after save changes
        //1. reset inputs to empty values
        clearForm();
        //2. to hide modal first 
        StudentModel.classList.remove("show");
        //3. to make the model display none
        StudentModel.style.display = "none";
        //4. to remove backdrop which appear behind the modal to activate the page again 
        modal_backdrop[0].remove();

    }
    // console.log(StudentModel)





}
//clear form

function clearForm() {
    mode.value = "";
    addId.value = "";
    addName.value = "";
    addAge.value = "";
}





//edit
function editRow(event, element, i) {
    console.log(student[i], i);
    addId.value = student[i].id;
    addName.value = student[i].name;
    addAge.value = student[i].age;
    mode.value = i;

}





// delete row of data table
function deleteRow(event, id) {
    console.log(id, event.target);
    student = student.filter((ele) => ele.id != id);
    console.log(student);
    event.target.parentElement.parentElement.remove();;
}

//search/filter
var search_input = document.getElementById("data");

search_input.addEventListener('keyup', function () {

    var item = this.value.toLowerCase();
    console.log('value', item);

    var info = searchTable(item, student);
    console.log(info)
    AddDataIntoTable(info);


});
AddDataIntoTable(student);

function searchTable(item, info) {

    let filteredData = [];
    for (var i = 0; i < info.length; i++) {
        var filterId = info[i].id;
        var filterName = info[i].name.toLowerCase();
        var filterAge = info[i].age;
        if (filterName.includes(item) || filterAge.includes(item) || filterId.includes(item)) {
            filteredData.push(info[i]);
        };
    };
    return filteredData;
};











// refactor this fucking method 
function sortModel(model, strategy, mode) {
    if (mode == 'dsc') {
        switch (strategy) {
            case "id":
                model.sort(function (a, b) {
                    var keyA = Number(a.id),
                        keyB = Number(b.id);
                    return (keyB - keyA);
                });
                AddDataIntoTable(model)
                break;
            case "name":
                model.sort(function (a, b) {
                    return b.name.localeCompare(a.name);
                });
                AddDataIntoTable(model)
                break;
            case "age":
                model.sort(function (a, b) {
                    var keyA = a.age,
                        keyB = b.age;
                    return (keyB - keyA);
                });
                AddDataIntoTable(model)
                break;

            default:
                break;
        }
    } else {
        switch (strategy) {
            case "id":
                model.sort(function (a, b) {
                    var keyA = Number(a.id),
                        keyB = Number(b.id);
                    return (keyA - keyB);
                });
                AddDataIntoTable(model)
                break;
            case "name":
                model.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                AddDataIntoTable(model)
                break;
            case "age":
                model.sort(function (a, b) {
                    var keyA = a.age,
                        keyB = b.age;
                    return (keyA - keyB);
                });
                AddDataIntoTable(model)
                break;

            default:
                break;
        }
    }
}
function sort(event, sortStrategy) {
    console.log(event.target.classList.contains('dsc'))
    if (event.target.classList.contains('dsc')) {
        event.target.classList.add('asc');
        event.target.classList.remove('dsc');
        event.target.innerText = 'ASC';
        sortModel(student, sortStrategy, 'dsc');
    } else {
        event.target.classList.add('dsc');
        event.target.classList.remove('asc');
        event.target.innerText = 'DSC';
        sortModel(student, sortStrategy, 'asc');
    }
    if (event.target.inc)
        event.target.addClass = 'assending';
}

//THIS function is taking model and rerender the table ( use this function on search/ filter)
function AddDataIntoTable(model) {
    tableBody[0].innerHTML = "";
    model.forEach((element, i) => {
        console.log(element, i);
        let data = setDataInTable(element, i);
        tableBody[0].innerHTML += data;
    })
}
AddDataIntoTable(student);