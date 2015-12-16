var sampleStubs = [
    {
        "id": "559deb3dd4c6da20f74e6fc0",
        "name": "Team A 06/03",
        "publicId": "DOC-1",
        "crtBy": null,
        "crtTS": null,
        "version": "12",
        "comments": null,
        "data": null
    },
    {
        "id": "559deb3da4c6da20f74e6fc8",
        "name": "Team 4 - 0001",
        "publicId": "DOC-2",
        "crtBy": null,
        "crtTS": null,
        "version": "2",
        "comments": null,
        "data": null
    }
]

listSheets = function(inputJSON){
    $(inputJSON).each(function(x,y){
        var n = y.name
        var c = y.crtTS
        var s = sheetSnippet(n, c)
        $("#sheetResults").append(s)
    })
}

sheetSnippet = function(sheetName, sheetCreatedDate){
    var sheetString = "<div class='col-md-12'>" +
        "<div class='list-group'>" +
        "<div class='list-group'>	<a href='sheetDetails.html' class='list-group-item'>" +
        "<h4 class='list-group-item-heading'>"+ sheetName +"</h4>" +
        "<p class='list-group-item-text'> " + sheetCreatedDate + " </p>"+
        "</a> </div> </div> </div>"
    return sheetString
}