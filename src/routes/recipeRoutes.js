import express from "express";
import { degrees, PDFDocument, rgb, StandardFonts  } from 'pdf-lib';
import fetch from "node-fetch";
import download from 'download';

// const download = require('download');
  
// Url of the image
// const file = 'GFG.jpeg';
// // Path at which image will get downloaded
// const filePath = `${__dirname}/files`;
  
// download(file,filePath)
// .then(() => {
//     console.log('Download Completed');
// })
// const { degrees, PDFDocument, rgb, StandardFonts  } = require('pdf-lib');
// // import fetch from 'node-fetch'
// const fetch = require('node-fetch');
// import { protectRoute, userIsLogged } from '../lib/utils/auth';

const router = express.Router();

router.get("/", (req, res, next) => {
 
async function modifyPdf() {
      // Fetch an existing PDF document
      try {const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
      const urlx='https://www.uscis.gov/sites/default/files/document/forms/i-765.pdf'
  		const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true })

      // Embed the Helvetica font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      // Get the first page of the document
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      // Get the width and height of the first page
      const { width, height } = firstPage.getSize()

      // Draw a string of text diagonally across the first page
      firstPage.drawText('This text was added with JavaScript My Boy!', {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
    //   const filePath = `${__dirname}/files`;

      download(pdfBytes,"pdf-lib_modification_example.pdf", "application/pdf")
            .then(() => {
            console.log('Download Completed');
    })
} catch (err){
    return next(err)
}
			// Trigger the browser to download the PDF document
    //   download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    }

    modifyPdf()
    res.send('Hello')
    }  
);



export default router;