const weatherform = document.querySelector("form");
const search = document.querySelector("form input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherform.addEventListener("submit", async e => {
	e.preventDefault();
	const location = search.value;
	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch(`/weather?address=${location}`)
		.then(response => {
			response.json().then(data => {
				if (data.error) {
					messageOne.textContent = "";
					messageTwo.textContent = data.error;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			});
		})
		.catch(err => console.log("Error: ", err));
});
