function getTrainData(cb) {
    localforage.getItem("trainData").then(function(results) {
      cb(results || []);
    });
  }
  function setTrainData(newTrains, cb) {
    localforage.setItem("trainData", newTrains).then(function() {
      cb();
    });
  }
  function displayTrains() {
    getTrainData(function(recentTrains) {
      const mostRecentTrains = document.getElementById("train-table");
      mostRecentTrains.innerHTML = "";
      for (let i = 0; i < recentTrains.length; i++) {
        const train = recentTrains[i];
        console.log(train);
        const tr = document.createElement("tr");
        const starttime = moment(train.firsttraintime, "HH:mm").subtract(1,"years");
        console.log(starttime);
        const difference = moment().diff(moment(starttime), "minutes");
        console.log(difference);
        const timeremaining = difference % parseInt(train.frequency);
        console.log(timeremaining);
        const nexttime = moment().add(timeremaining,"minutes").format("HH:mm");
        console.log(nexttime);
        tr.innerHTML = "<td>" + train.name + "</td>"
                      + "<td>" + train.destination + "</td>"
                      + "<td>" + train.frequency + "</td>"
                      + "<td>" + nexttime + "</td>"
                      + "<td>" + timeremaining + "</td>"
                      
        mostRecentTrains.append(tr);
      }
    });
  }
  displayTrains();
  function handleNewTrain(newTrain) {
    getTrainData(function(recentTrain) {
      recentTrain.unshift(newTrain);
      //setEmployeeData(recentEmployee, function () {console.log("emplyee added... ")});
      setTrainData(recentTrain, displayTrains);
    });
  }
  // handleNewEmployee({ name: "test", role: "engineer", startdate: "1/1/2019", monthlyrate: 20 });
  document.getElementById("trainsubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("trainname").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const firsttraintime = document.getElementById("firsttraintime").value;
    const frequency = document.getElementById("frequency").value;
    handleNewTrain({ name:name , destination: destination, firsttraintime: firsttraintime, frequency: frequency });
  });