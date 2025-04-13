// src/utils/Form16Parser.js
import { PDFDocument } from 'pdf-lib';

export const parseForm16 = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let textContent = '';

    // Extract text from each page
    for (const page of pages) {
      const content = await page.getTextContent();
      textContent += content.items.map(item => item.str).join(' ');
    }

    // Helper functions
    const extractValue = (pattern) => {
      const match = textContent.match(pattern);
      return match ? match[1].trim() : '';
    };

    const parseCurrency = (value) => {
      return value ? parseFloat(value.replace(/,/g, '')) : 0;
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('-');
      return `${year}-${month}-${day}`;
    };

    // Extract key fields from Form 16
    return {
      pan: extractValue(/Permanent Account Number.*?([A-Z]{5}[0-9]{4}[A-Z])/i),
      name: extractValue(/Name of the Employee.*?\n(.*?)\n/i),
      dob: formatDate(extractValue(/Date of Birth.*?(\d{2}-\d{2}-\d{4})/i)),
      employer: extractValue(/Name and Address of the Employer.*?\n(.*?)\n/i),
      tan: extractValue(/Tax Deduction Account Number.*?([A-Z]{4}\d{5}[A-Z])/i),
      salary: {
        basic: parseCurrency(extractValue(/Basic Salary.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)) || 
               parseCurrency(extractValue(/Gross Salary.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)) * 0.8,
        hra: parseCurrency(extractValue(/House Rent Allowance.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)),
        total: parseCurrency(extractValue(/Gross Salary.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i))
      },
      deductions: {
        section80C: parseCurrency(extractValue(/Deduction under section 80C.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)),
        section80D: parseCurrency(extractValue(/Deduction under section 80D.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)),
        total: function() { return this.section80C + this.section80D }
      },
      tax: {
        tds: parseCurrency(extractValue(/Tax Deducted at Source.*?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)),
        totalIncome: function() { 
          return this.salary.total - this.deductions.total() 
        },
        taxPayable: function() {
          // Simplified tax calculation
          const taxableIncome = this.totalIncome();
          if (taxableIncome <= 500000) return 0;
          if (taxableIncome <= 1000000) return (taxableIncome - 500000) * 0.2;
          return 100000 + (taxableIncome - 1000000) * 0.3;
        },
        balanceTax: function() {
          return Math.max(0, this.taxPayable() - this.tds);
        }
      },
      rawText: textContent
    };
  } catch (error) {
    console.error('Form 16 parsing error:', error);
    throw new Error('Failed to parse Form 16. Please ensure the PDF is valid and not password protected.');
  }
};