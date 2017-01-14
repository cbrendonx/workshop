$(document).ready(function() {
	// When the html page has been loaded, start here:
	//alert("hello!");

	// Make a GET request to our backend
	getPosts();

	$("form").submit(function(event) {

		// Will prevent default HTML form interaction
		event.preventDefault();

		// Gather and form data
		var titleText = $("#title").val();
		var postText = $("#post").val();

		if (titleText === "" || postText === "") {
			alert("not good input");
			return false;
		}

		var data = {
			title: titleText,
			post: postText
		};

		// Fire off that data
		$.post("/posts/", data, function() {
			console.log("posted!");
			getPosts();
		});
	});
});

function getPosts() {

	// Reset content inside #content
	$("#content").text("");

	$.get("/posts", function(data) {
		console.log(data);
		var rows = data["rows"];
		for (var i=0; i<rows.length; i++) {

			// console.log(rows[i]["doc"]["title"]);
			// console.log(rows[i]["doc"]["post"]);

			// Find the important stuff inside data
			var title = rows[i]["doc"]["title"];
			var post = rows[i]["doc"]["post"];

			// Generate the html we want to insert
			var card = '<div class="card"><h3 class="class--header">' +
				title + '</h3>' +
				'<p class="card--content">' + post + '</p>' +
				'</div>';

			// Insert the card HTML
			$('#content').append(card);
		}
	});
}