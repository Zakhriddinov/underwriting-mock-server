var data = [];

var tableRows = document.querySelectorAll('.list-row-item');

tableRows.forEach(function(row) {
    var attributeInput = row.querySelector('input[name="attribute"]').value;
    var selectValue = row.querySelector('select[name="result"]').value;
    var inputValue = row.querySelector('.input-block input').value;
    
    var rowData = {
        attribute: attributeInput,
        result: selectValue,
        input: inputValue
    };
    
    data.push(rowData);
});

console.log(data);
