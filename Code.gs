function doGet(request) {
  let result = {};
  let users = SpreadsheetApp
                .getActiveSpreadsheet()
                .getSheetByName('Users')
                .getDataRange()
                .getValues()

  users.shift()

  result.users = createObject(users)
                    .filter(el => el.Role == request.parameter.role)
  result.params = request.parameters

  return ContentService.createTextOutput(JSON.stringify(result))
          .setMimeType(ContentService.MimeType.JSON)
}

function createObject(dataArr) {
  let obj = []

  obj = dataArr.map(el => ({
    FirstName: el[0], 
    LastName: el[1],	
    Email: el[2],	
    Role: el[3],
  }))

  return obj
}
