// content is the data you'll write to file<br/>
// filename is the filename<br/>
// what I did is use iFrame as a buffer, fill it up with text
function save_content_to_file(content, filename)
{
    var dlg = false;
    with(document){
     ir=createElement('iframe');
     ir.id='ifr';
     ir.location='about.blank';
     ir.style.display='none';
     body.appendChild(ir);
      with(getElementById('ifr').contentWindow.document){
           open("text/plain", "replace");
           charset = "utf-8";
           write(content);
           close();
           document.charset = "utf-8";
           dlg = execCommand('SaveAs', false, filename+'.txt');
	 console.log("dlg executed");
       }
       body.removeChild(ir);
     }
    return dlg;
}
