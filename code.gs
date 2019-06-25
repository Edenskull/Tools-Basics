function onOpen(e){
    SpreadsheetApp.getUi().createAddonMenu()
        .addItem('Tools Basics', 'showSidebar')
        .addToUi();
}

function onInstall(e){
    onOpen(e);
}

function showSidebar(){
    var ui = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('Tools Basics');
    SpreadsheetApp.getUi().showSidebar(ui);
}

function activeCells(mode){
    var range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
    var numRows = range.getNumRows();
    var numCols = range.getNumColumns();
    if (numRows === 0 || numCols === 0) throw new Error('Please select some cells.');
    for (var i = 1; i <= numRows; i++) {
        for (var j = 1; j <= numCols; j++) {
            var currentValue = range.getCell(i,j).getValue();
            range.getCell(i,j).setValue(convertCase(mode, currentValue));
        }
    }
    return true;
}

function convertCase(mode, text){
    var textResult;
    var textBuffer;
    switch(mode){
        case 'lower':
            textResult = text.toLowerCase();
            break;
        case 'upper':
            textResult = text.toUpperCase();
            break;
        case 'title':
            var textSplit = text.split(" ");
            var arrayBuffer = [];
            for(var index = 0; index < textSplit.length; index ++){
                textBuffer = textSplit[index].toLowerCase();
                arrayBuffer.push(textBuffer.charAt(0).toUpperCase() + textBuffer.slice(1));
            }
            textResult = arrayBuffer.join(" ");
            break;
        case 'first':
            textBuffer = text.toLowerCase();
            textResult = textBuffer.charAt(0).toUpperCase() + textBuffer.slice(1);
            break;
    }
    return textResult;
}
