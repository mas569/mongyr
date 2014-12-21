function convertSpreadsheetDataToArray() {
  
  //declare variables
  var spredsheetID = PropertiesService.getScriptProperties().getProperty("spreadsheetID");
  var spreadsheet = SpreadsheetApp.openById(spredsheetID);
  var sheet = spreadsheet.getSheetByName().getDataRange();  
  var allSpreadsheetData = sheet.getValues();  //get all spreadsheet data
  var headerRow = allSpreadsheetData[0];  //save the first row of the spreadsheet as header variable
  var data = [];  //create an empty array to hold spreadsheet data
  
  //loop through each row in the spreadsheet
  for (var currentRow = 1; currentRow < allSpreadsheetData.length; currentRow++) {  
    
    //Create an object to hold the data from the current row
    var obj   = {};
   
    //loop through each column in the current row of the spreadshset
    for(var rowColumn=0;rowColumn<headerRow.length;rowColumn++){
      obj[headerRow[rowColumn]]=allSpreadsheetData[currentRow][rowColumn];
    }
    
    data.push(obj);
    
  }
  
  return data;
} 

