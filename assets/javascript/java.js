function getEmployeeData(cb) {
    localforage.getItem("employeeData").then(function(results) {
      cb(results || []);
    });
  }
  function setEmployeeData(newEmployees, cb) {
    localforage.setItem("employeeData", newEmployees).then(function() {
      cb();
    });
  }
  function displayEmployees() {
    getEmployeeData(function(recentEmployees) {
      const mostRecentEmployees = document.getElementById("employee-table");
      mostRecentEmployees.innerHTML = "";
      for (let i = 0; i < recentEmployees.length; i++) {
        const employee = recentEmployees[i];
        const tr = document.createElement("tr");
        const a = moment(employee.startdate);
        const b = moment();
        const c = b.diff(a, 'months');
        tr.innerHTML = "<td>" + employee.name + "</td>"
                      + "<td>" + employee.role + "</td>"
                      + "<td>" + employee.startdate + "</td>"
                      + "<td>" + c + "</td>"
                      + "<td>" + employee.monthlyrate + "</td>"
                      + "<td>" + employee.monthlyrate * c + "</td>"
        mostRecentEmployees.append(tr);
      }
    });
  }
  displayEmployees();
  function handleNewEmployee(newEmployee) {
    getEmployeeData(function(recentEmployee) {
      recentEmployee.unshift(newEmployee);
      //setEmployeeData(recentEmployee, function () {console.log("emplyee added... ")});
      setEmployeeData(recentEmployee, displayEmployees);
    });
  }
  // handleNewEmployee({ name: "test", role: "engineer", startdate: "1/1/2019", monthlyrate: 20 });
  document.getElementById("empsubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("eName").value.trim();
    const role = document.getElementById("role").value.trim();
    const startdate = document.getElementById("startdate").value;
    const monthlyrate = document.getElementById("monthlyrate").value;
    handleNewEmployee({ name:name , role: role, startdate: startdate, monthlyrate: monthlyrate });
  });