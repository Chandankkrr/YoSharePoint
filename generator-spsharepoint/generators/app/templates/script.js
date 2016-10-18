//import * as $ from 'jquery';

// Make sure the SharePoint script file 'sp.js' is loaded before your
// code runs.
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

// Create an instance of the current context.
function sharePointReady() {
    var clientContext = SP.ClientContext.get_current();
    var web = clientContext.get_web();
    var list = web.get_lists().getByTitle("<%= listname %>");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
        '<Value Type=\'Number\'>1</Value></Geq></Where></Query></View>');
    this.collListItem = list.getItems(camlQuery);

    clientContext.load(collListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();
    while (listItemEnumerator.moveNext()) {
        var currentListItem = listItemEnumerator.get_current();
        listItemInfo += "<div class='listItem'>" + currentListItem.get_item('Title') + "</div>";
    }
    $("#listDiv").append(listItemInfo);
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}