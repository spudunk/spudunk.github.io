    // Setup API connection
    var token;
    var client = Asana.Client.create()

    tokenInput = document.getElementById("tokenInput");
    contentDiv = document.getElementById("contentDiv");
    taskTable = document.getElementById("taskTable");

    if (token) {
        tokenInput.value = token
        setToken(testApi)
    }

    document.getElementById("setToken").onclick = function () {
        setToken(testApi);
    }

    function setToken(cb) {
        if (tokenInput.value.length > 10) {
            token = tokenInput.value;
            // set token
            client.useAccessToken(token);
            cb();
        } else {
            alert("must input Asana API token");
        }
    }

    function testApi() {
        // Get User Info
        client.users.me()
            .then(function (me) {
                console.log(me);
                document.getElementById("userName").innerHTML = `<h4>${me.name}</h4><p>Email: ${me.email}</p><p>Asana GID: ${me.gid}`;
            });
        // Get User Tasks
        client.tasks.getTasks({
                project: "1181114934981905",
                opt_fields: "name,completed,assignee.(name|email),custom_fields.(enum_value|name)"
            })
            .then(function (tasks) {
                console.log(tasks.data);
                tasks.data.forEach((task) => {
                    addContent(task);
                });
            });
    };

    function addContent(task) {

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
        task.custom_fields.forEach((field) => {
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