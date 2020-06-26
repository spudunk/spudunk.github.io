// ======================================
// Assign Variables
// ======================================
var token,
    projectId = "1181114934981905",
    client = Asana.Client.create();

// ======================================
// Get DOM Elements
// ======================================
var tokenInput = document.getElementById("tokenInput"),
    projectIdInput = document.getElementById("projectIdInput"),
    tokenButton = document.getElementById("setToken"),
    contentDiv = document.getElementById("contentDiv");

tokenInfo = document.getElementById("tokenInfo");

// ======================================
// PAGE SETUP
// ======================================
var titleString = "Asana Tasks Test App",
    heading = document.getElementById("header"),
    title = document.getElementById("title");

Array(title, heading).forEach(element => {
    element.textContent = titleString;
});

// Insert project ID to input box
projectIdInput.value = projectId;

// If token is assigned in script add to input field and run API function
if (token) {
    tokenInput.value = token;
    client.useAccessToken(token);
    testApi();
}

// ======================================
// EVENT LISTENERS
// ======================================
tokenButton.onclick = function () {
    setToken(testApi);
}
tokenInput.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        setToken(testApi);
    }
})


// ======================================
// FUNCTIONS
// ======================================

// sets projectId variable to match input field
function setProjectId() {
    projectID = projectIdInput.value;
}

// validates token input and sets to token variable
function setToken(cb = null) {
    if (tokenInput.value.length > 10) {
        token = tokenInput.value;
        // set token
        client.useAccessToken(token);
        if (tokenInfo) {
            tokenInfo.style.display = "none";
        }
        if (cb) {
            cb();
        }
    } else {
        alert("must input Asana API token");
    }
}

// Primary API function
function testApi() {

    setProjectId();

    // Get User Info and add table to user element
    client.users.me()
        .then(function (me) {
            console.log(me);
            document.getElementById("user").innerHTML =
                `<table>
                <tr><td colspan="2"><strong>${me.name}</strong></td></tr>
                <tr><td>Email</td><td>${me.email}</td></tr>
                <tr><td>Asana GID</td><td>${me.gid}</td></tr>
            </table>`;
        });
    
    // Reset contentDiv with empty table
    contentDiv.innerHTML =
        `<table id="taskTable">
            <tr><th>Name</th><th>Status</th><th>Flags</th></tr>
        </table>`;
    
    // re-assign table variable to new table created in DOM
    taskTable = document.getElementById("taskTable");

    // Get User Tasks
    client.tasks.getTasks({
            project: projectId,
            opt_fields: "name,completed,assignee.(name|email),custom_fields.(enum_value|name)"
        })
        // add each task to the table
        .then(function (tasks) {
            console.log(tasks.data);  // for debugging
            tasks.data.forEach(task => {
                addTask(task);
            });
        });
};

// Add task to table
function addTask(task) {
    // create a table row element for the task
    tr = document.createElement("tr")
    // add task name cell to html string for insert to row
    contentString = `<td>${task.name}</td>`
    // conditional to add task status cell to html string
    if (task.completed) {
        contentString +=
            `<td style="color:green"><strong>COMPLETE</strong></td>`
    } else {
        contentString +=
            `<td style="color:red"><strong>INCOMPLETE</strong></td>`
    }
    // create cell with list of Asana "custom fields" values
    customFieldString = "<td>";
    // loop through custom fields and add enum_values
    task.custom_fields.forEach(field => {
        if (field.enum_value) {
            // console.log(field);
            customFieldString +=
                `<span style="color:${field.enum_value.color}"> ${field.enum_value.name} </span>`

        }
    });
    // close custom fields cell
    customFieldString += '</td>';
    // add custom field cell to table content string
    contentString += customFieldString;
    // 
    tr.innerHTML = contentString;
    taskTable.appendChild(tr);

};