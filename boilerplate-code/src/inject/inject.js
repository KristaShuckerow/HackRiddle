
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var body = document.body;
            var tmp = document.createElement("div");
            var bodyClone = body.cloneNode(true);
            tmp.appendChild(bodyClone);
            bodyClone = tmp.innerHTML;

            //html stripping regex
            var scriptRegex = /(<script[^>]*>[^>]+<\/script>)/ig;
            var regex = /(<([^>]+)>)/ig;
            bodyClone = bodyClone.replace(scriptRegex, " ");
            bodyClone = bodyClone.replace(regex, " ");
            bodyClone = bodyClone.replace(/("+)/g, "");
            bodyClone = bodyClone.replace(/(,+)/g, "");
            console.log(bodyClone);
            


            //Tool tip
            var tipTool = document.createElement('div');
            tipTool.id='tipTool';
            tipTool.class='tooltipDiv';
            body.appendChild(tipTool);
	    }
	}, 10);
});


function httpPost(theUrl, text){
    var http = new XMLHttpRequest();//Send the proper header information along with the request

    http.open("POST", theUrl, false); // false for synchronous request
    //http.setRequestHeader('Content-Type', 'application/json');

    http.send(text);

    return http.responseText;

    // $.post("http://localhost:8000/", text);
}

 var highlightCount=-1;
 var TotalWordCount=0;


function countWords(str) 
{
  return str.split(/\s+/).length;
}


function getSelected() 
{

    if (window.getSelection) 
    {
        return window.getSelection();
    }
    else if (document.getSelection) 
    {
        return document.getSelection();
    }
    else 
    {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) 
        {
            return selection.text;
        }
        return false;
    }
    return false;
}

function createTipTool() {
var selectedText = getSelected().toString();

  if(highlightCount==-1)
  {
    TotalWordCount = countWords(selectedText);

    console.log(TotalWordCount);
    highlightCount++;
  }
  else
  {
    if (selectedText!='' && countWords(selectedText)==1) {

      tipTool.innerHTML=''; //Reset div

      var span = document.createElement('span');
      span.id = 'close';
      span.innerHTML+='x';
      tipTool.appendChild(span);

      var term =  document.createElement('h3');
      term.innerHTML = selectedText.toString();
      tipTool.appendChild(term);

      var def = document.createElement('div');
      def.innerHTML = 'Definition'+ httpPost('http://localhost:8000/', selectedText);
      // console.log("Response is " + httpPost('http://localhost:5000/', selectedText));
      tipTool.appendChild(def);

      highlightCount++;

      var count= document.createElement('div');
      count.id='highlightCount';
      count.innerHTML = '<b>Words learned: </b>'+highlightCount;
      tipTool.appendChild(count);

      var totalWordDiv= document.createElement('div');
      totalWordDiv.id='link';
      totalWordDiv.innerHTML = '<b>Total words: </b>'+TotalWordCount;
      tipTool.appendChild(totalWordDiv);

      var perctDiv= document.createElement('div');
      perctDiv.id='link';
      perctDiv.innerHTML = '<b>Perctange of words you needed help with:</b> '+ parseInt((highlightCount/TotalWordCount)*100) +'%';
      tipTool.appendChild(perctDiv);



      var chartDiv = document.createElement('div');
      chartDiv.id = 'chart1';
            
      tipTool.appendChild(chartDiv);

      console.log(chartDiv);

      var gaugeData = {data: highlightCount}; 
      var chart1 = c3.generate({
      bindto: '#chart1',
      data: {
          json: gaugeData,
          type: 'gauge',
        },
        gauge: {
          min: 0,
          max: TotalWordCount
        }
          });


  $('#tipTool').css('display', 'block');
  $('#tipTool').css('position', 'absolute');
  $('#tipTool').css('left', event.clientX + 10);
  $('#tipTool').css('top', event.clientY + 15);
}
 else 
 {
  $('#tipTool').css('display', 'none');
}

  }
};


//Alert when page done loading.  Mouseup function. 
window.onload = function() 
{
    if (window.jQuery) 
    {  
      alert("Loading complete!");

      $('body').mouseup(function() 
      {
            var selection = getSelected();
            if (selection) 
            {
              createTipTool();    
              console.log(selection.toString());
             }
      });
      } 
      else 
      {
        // jQuery is not loaded
        alert("Loading failed!");
      }
}


