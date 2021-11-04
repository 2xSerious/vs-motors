const inv = require("../models/invoice-components/Index");
const pdf = require("html-pdf-node");
const InvModel = require("../models/Invoice");

exports.saveInvoice = async (req, res, next) => {
  try {
    console.log(req.body);
    const { invoice, parts, details } = req.body;

    let options = {
      format: "A4",
      path: `./data/invoices/${details.inv_no}.pdf`,
    };
    const html = { content: inv(req.body) };

    pdf.generatePdf(html, options).then((pdfBuffer) => {
      console.log(pdfBuffer);
    });

    const newInvoice = new InvModel(
      details.inv_no,
      details.date,
      details.total,
      details.service_id
    );
    newInvoice.add();
    res.send("Success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPdf = async (req, res, next) => {
  try {
    let { id } = req.params;
    res.download(`./data/invoices/${id}.pdf`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
