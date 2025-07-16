function generatePDF() {
  html2pdf().from(document.body).save('myDocument.pdf')
}

//generatePDF();
