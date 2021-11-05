// const moment = require("moment");

module.exports = ({ invoice, parts, details }) => {
  let count = 1;
  const work = parseFloat(invoice.work).toFixed(2);
  const total = parseFloat(invoice.total_vat) + parseFloat(work);
  const vat = parseFloat(total * 0.2).toFixed(2);
  const beforeVat = (total - vat).toFixed(2);
  //   const d = details.date;
  //   const date = moment(d).format("DD/MM/YYYY");

  const invoice_parts = parts.map((e) => {
    return `<tr>
		<td>${count++}</td>
		<td>${e.p_name}</td>
		<td>${e.quantity}</td>
		<td>£${(e.cost_vat / e.quantity).toFixed(2)}
		<td>£${e.cost_vat}</td>
		</tr>`;
  });

  return `
  
<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<title>Invoice No:</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
	</head>
	<body>
		<div class="container-fluid px-5">
			<div class="mt-5 text-center">
		  		<img src="https://i.ibb.co/tJ1PmMH/logo2.png" width="400" height="auto"/>
			</div>
			<div class="text-center my-5">
				<h1 class="fs-1">INVOICE</h1>
			</div>

		  <div>
			<div class="d-flex justify-content-between">
				<div class="text-start">
  					<div>Bill to</div>
					<div>${invoice.c_name}</div>
					<div>${invoice.street_address}</div>
					<div>${invoice.city} ${invoice.postcode}</div>
				</div>
				<div class="text-start">
					<div>Invoice No: ${details.inv_no}</div>
					<div>Invoice Date: ${details.date}</div>
				</div>
			</div>
		  </div>

		<table class="table mt-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Description</th>
					<th scope="col">Quantity</th>
					<th scope="col">Unit Price</th>
					<th scope="col">Total</th>
				</tr>
			</thead>
			<tbody>
				${invoice_parts}
				<tr>
					<td>${count++}</td>
					<td>Work</td>
					<td>1</td>
					<td>£${work}</td>
					<td>£${work}</td>
				</tr>
			</tbody>
		</table>
		  
		<div class="position-absolute bottom-0 end-0 md-5 mb-5" style="width: 300px; height: auto;">
			<table class="table">
				<tr>
					<td>Total:</td>
					<td>£${beforeVat}</td>
				</tr>
				<tr>
					<td>Vat:</td>
					<td>£${vat}</td>
				</tr>
				<tr>
					<td>Total inc Vat:</td>
					<td>£${total.toFixed(2)}</td>
				</tr>
			</table>
		</div>
		  
		</div>
	</body>
</html>
    `;
};
