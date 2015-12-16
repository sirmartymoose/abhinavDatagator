getOriginalData = function() {
    return [
        [100, 20, 12, 13, 15, 16],
        [ 50, 40, 12, 13, 15, 16],
        [ 20, 11, 12, 13, 15, 16],
        [ 4, 11, 12, 13, 15, 16],
        [5, 11, 12, 13, 15, 16],
        [6, 11, 12, 13, 15, 16],
        [ 7, 11, 12, 13, 15, 16],
        [ 8, 11, 12, 13, 15, 16],
        [ 9, 200, 12, 13, 15, 16],
        [10, 11, 12, 13, 15, 16]
    ];
}

workingData = getOriginalData()

function isSelectedSingleColumn(d){
    if(d[1] == d[3]){
        return true
    } else {
        return false
    }
}

function isMultipleSelectedCells(columnData){
    if(columnData.length > 1){
        console.log(columnData.length)
        return true
    } else {
        console.log(columnData.length)
        return false
    }
}

function runColumnCalculations(d){
    cLog("runColumnCalculations initiated")
    if(isSelectedSingleColumn(d) == true){
        cLog("Data selected is from the same column")
        var columnData = hotInstance.getDataAtCol(d[1])
        columnData = convertHOTInputsToNumbers(columnData)
        cLog(columnData)
        if(isMultipleSelectedCells(columnData) == true){
            cLog("more than one cell being factored")
            if(isArrayNumerical(columnData) == true){
                cLog("array is all numbers")
                displayColumnAverage(columnData )
                displayColumnMode(columnData)
                displayColumnMedian(columnData)
                displayStandardDeviation(columnData)
                displayColumnVariance(columnData)
                chartColumn(columnData)
            } else {
                clearMetrics()
            }
        }
    }
}

function isArrayNumerical(columnData) {
    o = true
    $(columnData).each(function(x,y){
        if(isNaN(y) == true){
            o = false
        } else {}
    })
    return o
}

function getColumnAverage(columnData){
    runningTotal = 0
    numItems = columnData.length
    $(columnData).each(function(x,y){
        runningTotal = runningTotal + y
    })
    var a = runningTotal / numItems
    console.log(a)
    return a
}

function displayColumnAverage(columnData){
    var val = getColumnAverage(columnData)
    val = roundTwoDigits(val)
    $("#avgValue").html(val)
}

function displayNA(el){
    $(el).html("N/A")
}

function getColumnMode(columnData){
    var frequency = {};
    var max = 0;
    var result;
    for(var v in columnData) {
        frequency[columnData[v]]=(frequency[columnData[v]] || 0)+1;
        if(frequency[columnData[v]] > max) {
            max = frequency[columnData[v]];
            result = columnData[v];
        }
    }
    return result
}

function displayColumnMode(columnData){
    var val = getColumnMode(columnData)
    val = roundTwoDigits(val)
    $("#modeValue").html(val)
}

function getColumnMedian(columnData){
    columnData.sort( function(a,b) {return a - b;} );
    var half = Math.floor(columnData.length/2);
    if(columnData.length % 2)
        return columnData[half];
    else
        return (columnData[half-1] + columnData[half]) / 2.0;
}

function displayColumnMedian(columnData){
    var val = getColumnMedian(columnData)
    val = roundTwoDigits(val)
    $("#medianValue").html(val)
}

function getStandardDeviation(values){
    var avg = average(values);
    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = average(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);
    var avg = sum / data.length;
    return avg;
}

function displayStandardDeviation(columnData){
    var val = getStandardDeviation(columnData)
    val = roundTwoDigits(val)
    $("#stdevValue").html(val)
}

function getColumnVariance( arr ) {
    {
        var len = 0;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "") {
            }
            else {
                len = len + 1;
                sum = sum + parseFloat(arr[i]);
            }
        }
        var v = 0;
        if (len > 1) {
            var mean = sum / len;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "") {
                }
                else {
                    v = v + (arr[i] - mean) * (arr[i] - mean);
                }
            }
            return v / len;
        }
        else {
            return 0;
        }
    }
}

function displayColumnVariance(columnData){
    var val = getColumnVariance(columnData)
    val = roundTwoDigits(val)
    $("#varianceValue").html(val)
}

function clearMetrics(){
    displayNA('#avgValue')
    displayNA('#modeValue')
    displayNA('#medianValue')
    displayNA('#stdevValue')
    displayNA('#varianceValue')
}

function convertHOTInputsToNumbers(columnData){
    var outputArr = []
    $(columnData).each(function(x,y){
        outputArr.push(Number(y))
    })
    return outputArr
}
function chartColumn(columnData){
    mainChart.series[0].setData(columnData);
}