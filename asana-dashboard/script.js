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

        // Get User Info and add to user element
        client.users.me()
            .then(function (me) {
                console.log(me);
                document.getElementById("user").innerHTML = 
                `<table >
                    <tr><td colspan="2"><strong>${me.name}</strong></td></tr>
                    <tr><td>Email</td><td>${me.email}</td></tr>
                    <tr><td>Asana GID</td><td>${me.gid}</td></tr>
                </table>`;
            });

        // Get User Tasks
        contentDiv.innerHTML =
            `<table id="taskTable">
                <tr><th>Name</th><th>Status</th><th>Flags</th></tr>
            </table>`;
        taskTable = document.getElementById("taskTable");
        client.tasks.getTasks({
                project: projectId,
                opt_fields: "name,completed,assignee.(name|email),custom_fields.(enum_value|name)"
            })
            .then(function (tasks) {
                console.log(tasks.data);
                tasks.data.forEach(task => {
                    addTask(task);
                });
            });
    };

    function addTask(task) {

        var child = document.createElement("tr")
        child.classList = ["item"];
        var contentString = `<td>${task.name}</td>`
        if (task.completed) {
            contentString = contentString.concat(
                `<td style="color:green"><strong>COMPLETE</strong></td>`
            )
        } else {
            contentString = contentString.concat(
                `<td style="color:red"><strong>INCOMPLETE</strong></td>`
            )
        }

        var customFieldString = "<td>";
        task.custom_fields.forEach(field => {
            if (field.enum_value) {
                console.log(field);
                customFieldString = customFieldString.concat(
                    `<span style="color:${field.enum_value.color}"> ${field.enum_value.name} </span>`
                )
            }
        });
        customFieldString = customFieldString.concat('</td>');
        contentString = contentString.concat(customFieldString);

        child.innerHTML = contentString;
        taskTable.appendChild(child);

    };