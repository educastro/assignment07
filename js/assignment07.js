function MenuSelection() {
	if (document.getElementById("menu").value == "Please Select an Option") {
		document.getElementById("createCustomer").style.display = 'none';
		document.getElementById("changeAddress").style.display = 'none';
		document.getElementById("deleteCustomer").style.display = 'none';
	} 
	else if (document.getElementById("menu").value == "Create a Customer") {
		document.getElementById("createCustomer").style.display = "inline";
		document.getElementById("changeAddress").style.display = 'none';
		document.getElementById("deleteCustomer").style.display = 'none';
	}
	else if(document.getElementById("menu").value == "Change Address") {
		document.getElementById("createCustomer").style.display = 'none';
		document.getElementById("changeAddress").style.display = "inline";
		document.getElementById("deleteCustomer").style.display = 'none';
	} 
	else if(document.getElementById("menu").value == "Delete Customer") {
		document.getElementById("createCustomer").style.display = 'none';
		document.getElementById("changeAddress").style.display = 'none';
		document.getElementById("deleteCustomer").style.display = 'inline';
	}
	else {
		document.getElementById("createCustomer").style.display = 'none';
		document.getElementById("changeAddress").style.display = 'none';
		document.getElementById("deleteCustomer").style.display = 'none';
	}

}

function createCustomer() {
	// Starts the variable required for AJAX
	var objRequest = new XMLHttpRequest();

	// Creates URL and query string
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

	// Gets the values from the input text and stores it in variables
	var customerID = document.getElementById("customerID").value;
	var customerName = document.getElementById("customerName").value;
	var customerCity = document.getElementById("customerCity").value;

	// Creates a variable that will store the new customer data in JSON format
	var newcustomer = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName + '","City":"' + customerCity +'"}';
	//var newcustomer = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName +'"}';

	// Checks if the object objRequest has new values
	objRequest.onreadystatechange = function() {
		if(objRequest.readyState == 4 && objRequest.status == 200) {
			var output = JSON.parse(objRequest.responseText);
			generateOutputForCreateCustomer(output);
		}
	}

	// Initiates the server request
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(newcustomer);
}

function generateOutputForCreateCustomer(output) {
	if(output.WasSuccessful == 1) {
		document.getElementById("result").innerHTML = "The operation was successful!"
	} else if(output.WasSuccessful == 0) {
		document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
	} else {
		document.getElementById("result").innerHTML = "???"
	}
}

function updateOrderAddress() {
	// Starts the variable required for AJAX
	var objRequest = new XMLHttpRequest();

	// Creates URL and query string
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

	// Gets the values from the input text and stores it in variables
	var OrderID = document.getElementById("OrderID").value;
	var ShipAddress = document.getElementById("ShipAddress").value;
	var ShipCity = document.getElementById("ShipCity").value;
	var ShipName = document.getElementById("ShipName").value;
	var ShipPostcode = document.getElementById("ShipPostcode").value;

	// Creates a variable that will store the new customer data in JSON format
	var newaddress = '{"OrderID":"' + OrderID + '","ShipName":"' + ShipName + '","ShipAddress":"' + ShipAddress + '","ShipCity":"' + ShipCity + '","ShipPostcode":"' + ShipPostcode + '"}';

	// Checks if the object objRequest has new values
	objRequest.onreadystatechange = function() {
		if(objRequest.readyState == 4 && objRequest.status == 200) {
			var output = JSON.parse(objRequest.responseText);
			generateOutputForUpdateOrderAddress(output);
		}
	}

	// Initiates the server request
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(newaddress);
}

function generateOutputForUpdateOrderAddress(output) {
	if(parseInt(output) == 1) {
		document.getElementById("result").innerHTML = "The operation was successful!";
	} else if(output == 0) {
		document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
	} else if(output == -2) {
		document.getElementById("result").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object";
	} else if(output == -3) {
		document.getElementById("result").innerHTML = "Operation failed because a record with the supplied Order ID could not be found";
	} else {
		document.getElementById("result").innerHTML = "???";
	}
}

function deleteCustomer() {
	// Starts the variable required for AJAX
	var objRequest = new XMLHttpRequest();

	// Creates URL and query string
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";

	// Gets the values from the input text and stores it in variables
	url += document.getElementById("customerID").value;


	// Creates a variable that will store the new customer data in JSON format
	//var newcustomer = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName + '","City":"' + customerCity +'"}';
	//var newcustomer = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName +'"}';

	// Checks if the object objRequest has new values
	objRequest.onreadystatechange = function() {
		if(objRequest.readyState == 4 && objRequest.status == 200) {
			var output = JSON.parse(objRequest.responseText);
			generateOutputForDeleteCustomer(output);
		}
	}

	// Initiates the server request
	objRequest.open("GET", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send();
}

function generateOutputForDeleteCustomer(output) {
	if(output.DeleteCustomerResult.WasSuccessful == 1) {
		document.getElementById("result").innerHTML = "The operation was successful!"
	} else if(output.DeleteCustomerResult.WasSuccessful == 0) {
		document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.DeleteCustomerResult.Exception;
	} else {
		document.getElementById("result").innerHTML = "???"
	}
}