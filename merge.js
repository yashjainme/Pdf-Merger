



const PDFMerger = require('pdf-merger-js');

const mergePdfs = async (p1, p2) => {
  try {
    var merger = new PDFMerger();
    
    await merger.add(p1);  // Merge all pages from p1
    await merger.add(p2);  // Merge all pages from p2

    const d = new Date().getTime();
    const outputFilePath = `public/${d}.pdf`;
    
    await merger.save(outputFilePath); // Save the merged PDF

    console.log(`Merged PDF saved to: ${outputFilePath}`);
    return d;
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw error; // Rethrow the error for further debugging if needed
  }
};

module.exports = { mergePdfs };



