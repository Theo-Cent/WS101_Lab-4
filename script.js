let trips = [];

document.getElementById("tripForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let destination = document.getElementById("destination").value;
  let duration = Number(document.getElementById("duration").value);
  let cost = Number(document.getElementById("cost").value);
  let type = document.getElementById("type").value;

  trips.push({ destination, duration, cost, type });
  showTrips();
  console.log(`Added Trip: ${destination} - ${duration} days - ₱${cost} - ${type}`);
  this.reset();
});

function showTrips(list = trips) {
  let tripList = document.getElementById("tripList");
  tripList.innerHTML = "";
  list.forEach(trip => {
    let li = document.createElement("li");
    li.textContent = `${trip.destination} - ${trip.duration} days - ₱${trip.cost} - ${trip.type}`;
    tripList.appendChild(li);
  });
  console.log("Displaying trips:", list);
}

function calculateTotalCost() {
  let total = trips.reduce((sum, trip) => sum + trip.cost, 0);
  let message = `Total Cost: ₱${total}`;
  document.getElementById("results").textContent = message;
  alert(message);
  console.log(message);
}

function filterByType(type) {
  let filtered = trips.filter(trip => trip.type === type);
  showTrips(filtered);
  let message = `Showing only ${type} trips.`;
  document.getElementById("results").textContent = message;
  alert(message);
  console.log(message, filtered);
}

function findLongestTrip() {
  if (trips.length === 0) return;
  let longest = trips.reduce((max, trip) => trip.duration > max.duration ? trip : max, trips[0]);
  let message = `Longest Trip: ${longest.destination} - ${longest.duration} days`;
  document.getElementById("results").textContent = message;
  alert(message);
  console.log(message, longest);
}

function groupByCost() {
  let budget = 0, midrange = 0, luxury = 0;
  trips.forEach(trip => {
    if (trip.cost < 500) budget++;
    else if (trip.cost < 2000) midrange++;
    else luxury++;
  });

  let message = `Grouped by Cost:\nBudget: ${budget} trips\nMidrange: ${midrange} trips\nLuxury: ${luxury} trips`;
  document.getElementById("results").innerHTML = message.replace(/\n/g, "<br>");
  alert(message);
  console.log("Cost Grouping:", { budget, midrange, luxury });
}

function fetchSuggestedTrips() {
  document.getElementById("results").textContent = "Fetching suggested trips...";
  alert("Fetching suggested trips...");
  console.log("Fetching suggested trips...");

  setTimeout(() => {
    let suggested = [
      { destination: "Baguio", duration: 3, cost: 1200, type: "leisure" },
      { destination: "Palawan", duration: 5, cost: 3500, type: "adventure" },
      { destination: "Cebu", duration: 4, cost: 1800, type: "cultural" }
    ];
    trips = trips.concat(suggested);
    showTrips();
    document.getElementById("results").textContent = "Suggested trips added!";
    alert("Suggested trips added!");
    console.log("Suggested trips added:", suggested);
  }, 1500);
}
