


var TempData = [{
    Date: "",
    Start_Reading: " ",
    Stop_Reading: " ",
    Km: "",
    Diesel_Required: "",
    Diesel_Reading: "",
    Average: '',
    Operator: '',
    Rail: '',
    Slipper: '',
    Loading: '',
    Unloading: "",
    Purpose: ''
}];

function displayTableData() {
    var html = "<table border='1|1' class='table'>";
    setTimeout(() => {
        html += "<thead>";
        html += "<tr>";
        html += "<td>" + 'SNo.' + "</td>";
        html += "<td>" + 'Date' + "</td>";
        html += "<td>" + 'Start Reading' + "</td>";
        html += "<td>" + 'Stop Reading' + "</td>";
        html += "<td>" + 'Km' + "</td>";
        html += "<td>" + 'Diesel Required' + "</td>";
        html += "<td>" + 'Diesel Reading' + "</td>";
        html += "<td>" + 'Average' + "</td>";
        html += "<td>" + 'Operator' + "</td>";
        html += "<td>" + 'Rail' + "</td>";
        html += "<td>" + 'Slipper' + "</td>";
        html += "<td>" + 'Loading' + "</td>";
        html += "<td>" + 'Unloading' + "</td>";
        html += "<td>" + 'Purpose' + "</td>";
        html += "<td>" + 'Remove' + "</td>";
        html += '</tr>';
        html += "</thead>";
        for (var i = 0; i < TempData.length; i++) {
            var sno = i+1 ;
            html += "<tr>";
            html += "<td>" + sno + "</td>";
            html += "<td>" + TempData[i].Date + "</td>";
            html += "<td>" + TempData[i].Start_Reading + "</td>";
            html += "<td>" + TempData[i].Stop_Reading + "</td>";
            html += "<td>" + TempData[i].Km + "</td>";
            html += "<td>" + TempData[i].Diesel_Required + "</td>";
            html += "<td>" + TempData[i].Diesel_Reading + "</td>";
            html += "<td>" + TempData[i].Average + "</td>";
            html += "<td>" + TempData[i].Operator + "</td>";
            html += "<td>" + TempData[i].Rail + "</td>";
            html += "<td>" + TempData[i].Slipper + "</td>";
            html += "<td>" + TempData[i].Loading + "</td>";
            html += "<td>" + TempData[i].Unloading + "</td>";
            html += "<td>" + TempData[i].Purpose + "</td>";
            html += "<td>" + `<button type="button" class="btn btn-danger" onclick='removeItem(${TempData[i].id})'>Remove</button>` + "</td>";
            // html+="</tr>";
        }
        html += '</table>';
        document.getElementById("table").innerHTML = html;
    }, 200);
}

displayTableData();

function addOnClick() {
    var Date= document.getElementById('date').value;
    var Start_Reading = document.getElementById('startread').value;
    var Stop_Reading = document.getElementById('stopread').value;
    var Km = document.getElementById('km').value;
    var Diesel_Reading = document.getElementById('Dread').value;
    var Diesel_Required = document.getElementById('Drequired').value;
    var Average = document.getElementById('avg').value;
    var Operator = document.getElementById('operator').value;
    var Rail = document.getElementById('rail').value;
    var Slipper = document.getElementById('slipper').value;
    var Loading = document.getElementById('load').value;
    var Unloading = document.getElementById('unload').value;
    var Purpose = document.getElementById('purpose').value;

    if (Date && Start_Reading && Stop_Reading && Km && Diesel_Reading && Average && Operator) {
        let id = TempData.length;
        TempData.push({
            Date: Date,
            Start_Reading: Start_Reading,
            Stop_Reading: Stop_Reading,
            Km: Km,
            Diesel_Required: Diesel_Required,
            Diesel_Reading: Diesel_Reading,
            Average: Average,
            Operator: Operator,
            Rail: Rail,
            Slipper: Slipper,
            Loading: Loading,
            Unloading: Unloading,
            Purpose: Purpose,
            id: id
        });
        displayTableData();
        clearItems();
    }
}

function clearItems() {
    document.getElementById('date').value = ""
    document.getElementById('startread').value = ""
    document.getElementById('stopread').value = ""
    document.getElementById('km').value = ""
    document.getElementById('Dread').value = ""
    document.getElementById('Drequired').value = ""
    document.getElementById('avg').value = ""
    document.getElementById('operator').value = ""
    document.getElementById('rail').value = ""
    document.getElementById('slipper').value = ""
    document.getElementById('load').value = ""
    document.getElementById('unload').value = ""
    document.getElementById('purpose').value = ""
}

function removeItem(id) {
    TempData = TempData.filter(item => item.id !== id);
    displayTableData();
}

let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});
