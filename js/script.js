let jsonPatchApp = new Vue({
  el: '#jsonPatchApp',
  data: {    
    // input: null, // Input Text of JSON Object that needs to be modified.

    // Sample JSON Text Input for Input Object
    input: '{' + '\n' + 
      '"slug": "diya-foundation",' + '\n' + 
      '"name": "Diya Foundation",' + '\n' + 
      '"registration_number": "386/98-99",' + '\n' + 
      '"auditor_name": "Das Kumar And Company",' + '\n' + 
      '"created_at": "2013-02-08T09:28:51.000Z",' + '\n' + 
      '"updated_at": "2020-02-25T06:11:35.814Z",' + '\n' + 
      '"external_profiles": [{' + '\n' + 
      '"label": "Website",' + '\n' + 
      '"uri": "http://www.diyafoundation-india.org/Site/index.html"' + '\n' + 
      '}, {' + '\n' + 
      '"label": "Youtube",' + '\n' + 
      '"uri": "http://www.youtube.com/watch?v=DezbmReWMf0"' + '\n' + 
      '}],' + '\n' + 
      '"tags": ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"]' + '\n' + 
    '}',            
    
    // patch: null, // Input Text of JSON Patch that needs to be executed.

    // Sample JSON Text Input for Patch
    patch: '[' + '\n' +  
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/5",' + '\n' +
    '      "value": "spbm18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/4",' + '\n' +
    '      "value": "bengaluru10k-18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/3",' + '\n' +
    '      "value": "lfc18-wow2"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/2",' + '\n' +
    '      "value": "tcs10k-18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/1",' + '\n' +
    '      "value": "lfc18-cbp"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/tags/0",' + '\n' +
    '      "value": "lfc18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/6",' + '\n' +
    '      "value": "housie18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/7",' + '\n' +
    '      "value": "hoh18"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/8",' + '\n' +
    '      "value": "lfc19"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/9",' + '\n' +
    '      "value": "tbpp"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/10",' + '\n' +
    '      "value": "housie19"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/tags/11",' + '\n' +
    '      "value": "gfc2020"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/external_profiles/1/uri",' + '\n' +
    '      "value": "https://www.facebook.com/pages/DIYA-Foundation/"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "replace",' + '\n' +
    '      "path": "/external_profiles/1/label",' + '\n' +
    '      "value": "Facebook"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/external_profiles/2",' + '\n' +
    '      "value": {' + '\n' +
    '          "label": "Youtube",' + '\n' +
    '          "uri": "http://www.youtube.com/watch?v=DezbmReWMf0"' + '\n' +
    '      }' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "add",' + '\n' +
    '      "path": "/official_name",' + '\n' +
    '      "value": "Diya Foundation"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "remove",' + '\n' +
    '      "path": "/slug"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "move",' + '\n' +
    '      "from": "/auditor_name",' + '\n' +
    '      "path": "/external_profiles/3"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "test",' + '\n' +
    '      "path": "/official_name",' + '\n' +
    '      "value": "Diya Foundations"' + '\n' +
    '  },' + '\n' +
    '  {' + '\n' +
    '      "op": "copy",' + '\n' +
    '      "from": "/registration_number",' + '\n' +
    '      "path": "/external_profiles/4"' + '\n' +
    '  }' + '\n' +    
    ']',   

    jsonObj: {}, // Object to store the parsed JSON Input Value;
    jsonPatch: {}, // Object to store the parsed JSON Input Patch Value;
    newJsonObj: {}, // Object to store the modified JSON Input Value;    
    jsonHTML: '', // String to store the Stingified Object to be displayed in HTML. 
    testMessage: '', // String to store the success message.  
    test: null,
  },

  watch: {
    jsonHTML: function(value){
      document.getElementById('jsonOutput').innerHTML = value;
    }        
  },

  methods: {    
    formatInput: function(){ // Method Called up submitting User Input to format the user input to JSON Object.
      console.log('Called');
      if(this.input && this.patch){

        this.jsonObj = this.isJson(this.input); // Checking if the Input Text is a valid JSON or not.
        this.jsonPatch = this.isJson(this.patch); // Checking if the Input Text is a valid JSON or not.
        
        if(this.jsonObj && this.jsonPatch){          
          this.newJsonObj = JSON.parse(this.input);
        }      
        else{
          alert('Input Base Object and/or Patch is not a valid JSON');
        }
      }
    },

    exec: function(){ // Method Called at the time of User Submission.
      this.formatInput();
      // this.jsonPatch.forEach((patch, index) => { 
      //   this.executePatch(patch,index)
      // });
      this.updateHTMLOutput(this.jsonObj);
    },

    executePatch(patch,index){ // Method Called to Execute the patches one by one.
      if(!patch){
        return;
      }
      let path = patch.path.split('/');
      if(path[0]=== ""){
        path.shift();
      }

      if(patch.from){
        var fromPath = patch.from.split('/');
        if(fromPath[0] === ""){
          fromPath.shift();
        }
      }

      switch(patch.op){ // Checking for the Operation that needs to be executed
        case 'add':
          this.newJsonObj = this.setValue(path,patch.value,this.newJsonObj);         
          break;
        case 'remove':           
          this.jsonPatch[index].previousValue = this.getValue(path); // Storing Previous Value of before the Patch.
          this.newJsonObj = this.unsetValue(path);
          break;
        case 'replace':          
          this.jsonPatch[index].previousValue = this.getValue(path);
          this.newJsonObj = this.setValue(path,patch.value,this.newJsonObj); // Storing Previous Value of before the Patch.
          break;
        case 'move':
          if(fromPath){
            let currentVal = this.getValue(fromPath);
            console.log(currentVal);
            if(currentVal !== undefined){              
              this.newJsonObj = this.setValue(path,currentVal,this.newJsonObj);
              this.newJsonObj = this.unsetValue(fromPath,this.newJsonObj);
            }
          }
          break;
        case 'copy':
          if(fromPath){
            let currentVal = this.getValue(fromPath);
            if(currentVal!== undefined)       
              this.newJsonObj = this.setValue(path,currentVal,this.newJsonObj)            
          }
          break;
        case 'test':
          let currentVal = this.getValue(path);
          if(currentVal === patch.value){
            this.showSuccess();
          }
          else{
            this.showFailure();
          }
          break;
      }      
    },

    isJson(string){ // Method to Check if the string passed is a valid JSON
      try{
        return JSON.parse(string);                
      }
      catch(e){  
        return false;      
      }      
    },

    // Method to See the Difference in the HTML Output.
    seeDiff(e,index){
      if(!this.jsonPatch.length){
        return;
      }

      // if(index === 0){
      this.newJsonObj = this.copy(this.jsonObj); // Incase change isn't accepted or rejected, load the previous version of the object.
      this.executePatch(this.jsonPatch[index],index); // Execute the Patch.
      
      // Get Path from the Patch 
      let path = this.jsonPatch[index].path.split('/');
      if(path[0]=== ""){
        path.shift();
      }


      // Get From-Path from the Patch (for Copy and Move Opeartions);
      if(this.jsonPatch[index].from){
        var fromPath = this.jsonPatch[index].from.split('/');
        if(fromPath[0] === ""){
          fromPath.shift();
        }
      }
      
      let key = path[path.length - 1]; // Fetching the last key of the object where changes have been made.
      let fromKey;
      let value = this.jsonPatch[index].value; 

      this.updateHTMLOutput(); // Update code with the patched output;
      let matchText; // Initialising text to match.

      switch(this.jsonPatch[index].op){
        case 'add':

          if(isNaN(key)){
            matchText = JSON.stringify(key) + ': ' + this.getFormattedString(value); // Compare string for a non-array value
          }
          else{ 
            matchText = this.getFormattedString(value); // Compare string for a array value
          }

          if(typeof(this.jsonPatch[index].value) === 'object'){ 
            // If the value added is an Object, formatting the string that could be searched 
            matchText = matchText.split('<br>');
            matchText.forEach((match,item) => {              
              matchText[item] = '&nbsp;'.repeat(path.length * 6) + match;                
            });
            matchText = matchText.join('<br>');
          }
          
          this.jsonHTML = this.jsonHTML.replace( // Displaying the change using CSS
            matchText,'<span class="new">' + matchText + '</span>'
          );
                            
          break;

        case 'remove':             
          if(isNaN(key)){ 
            matchText = JSON.stringify(key) + ': ' +JSON.stringify(this.jsonPatch[index].previousValue); 
          }
          else{ 
            matchText = JSON.stringify(this.jsonPatch[index].previousValue); 
          }                    
          
          this.updateHTMLOutput(this.jsonObj); // Temporarily updating the DOM with formatted Object before change to display the change.
          this.jsonHTML = this.jsonHTML.replace( // Displaying the change using CSS
            matchText,'<span class="old">' + matchText + '</span>'
          );         
          break;
        case 'replace':
          this.jsonHTML = this.jsonHTML.replace( // Displaying the change using CSS showing old and updated Value.
            JSON.stringify(value),             
              (this.jsonPatch[index].previousValue !== undefined ? '<span class="old">' + this.jsonPatch[index].previousValue + '</span> ' : '')
            + '<span class="new">' + value + '</span>'
          );        
          break;
        case 'move':
          fromKey = fromPath[fromPath.length - 1];  
          let tempObj = this.copy(this.jsonObj);

          tempObj = this.setValue(path,this.getValue(fromPath,tempObj),tempObj);      
          this.updateHTMLOutput(tempObj);                  

          if(isNaN(key)){
            matchText = JSON.stringify(fromKey) + ': ' +JSON.stringify(this.getValue(fromPath,this.jsonObj)); 
          }
          else{ 
            matchText = JSON.stringify(this.getValue(fromPath,this.jsonObj)); 
          }

          console.log(matchText);

          this.jsonHTML = this.jsonHTML.replace(
            matchText,'<span class="old">' + matchText + '</span>'
          );
          break;
        case 'copy':      
          fromKey = fromPath[fromPath.length - 1];   
          if(isNaN(fromKey)){ 
            matchText = JSON.stringify(fromKey) + ': ' +JSON.stringify(this.getValue(fromPath,this.newJsonObj)); 
          }
          else{ 
            matchText = JSON.stringify(this.getValue(fromPath,this.newJsonObj)); 
          }          

          this.updateHTMLOutput(this.newJsonObj);                   
          this.jsonHTML = this.jsonHTML.replace(
            matchText,'<span class="new">' + matchText + '</span>'
          );
          break;
        case 'test':
          break;
      }
      // }
      // else{
      //   alert('You should execute the patches in order');
      // }
    },

    getPath(path){ // Get the JSON patch string from the array of Path. eg [a,b,c,1] should return a.b.c[1];
      let pathString = path[0];
      for(let i=1;i< path.length;i++){
        if(isNaN(path[i])){
          pathString += '.' + path[i];
        }
        else{
          pathString += '[' + path[i] + ']';
        }
      }
      return pathString;
    },    

    // Method to add proprerty to the Object 
    setValue(path, value, newObj){  
      if(!newObj) newObj = this.newJsonObj; 

      let exec = 'newObj.' + this.getPath(path) + 
                  '=' + 
                  (typeof(value) === 'object' ? ('JSON.parse(\'' + JSON.stringify(value) + '\')') : ('\'' + value + '\''));                           
      eval(exec); 
      // The Eval function will execute the string command eg. if exec = 'delete Object.value', if will execute the statement.            
      return newObj;
    },

    // setValue(path, value, newObj){  
    //   if(!newObj) newObj = this.newJsonObj; 
    //   if(path.length === 1){
    //     newObj.pa
    //   }
      
    //   newObj[path.length-1] = value;      
    // },

    // Method to delete propery from the object.
    unsetValue: function(path, newObj = null){ 
      if(!newObj) newObj = this.newJsonObj;
      let exec = 'delete newObj.' + this.getPath(path);      
      eval(exec);       
      // The Eval function will execute the string command eg. if exec = 'delete Object.value', if will execute the statement.                 
      return newObj;      
    },

    // Method to get value from a path and object that's passed.
    // getValue(path,obj = null){ 
    //   if(!obj) obj = this.newJsonObj;     
    //   let exec = 'obj.' + this.getPath(path);
    //   return eval(exec);
    // },

    getValue(path,obj = null){ 
      if(!obj) obj = this.newJsonObj;
      var current = obj;
      for(let i = 0;i < path.length; i++){
        current = current[path[i]];
      }  
      return current;
    },

    // Method to Accept the Change 
    accept(index){
      let value = this.jsonPatch[index].value;
      let path = this.jsonPatch[index].path.split('/');
      if(path[0]=== ""){
        path.shift();
      }            
      this.jsonPatch.splice(index,1);
      this.jsonObj = this.copy(this.newJsonObj); // If Accepted the Updated Copy is stored in the base value.
      this.updateHTMLOutput();
    },

    // Method to Reject the Change     
    reject(index){      
      let value = this.jsonPatch[index].previousValue;
      let path = this.jsonPatch[index].path.split('/');
      if(path[0]=== ""){
        path.shift();
      }                
      this.jsonPatch.splice(index,1);
      this.newJsonObj = this.copy(this.jsonObj); // If Rejected the base Copy is stored in the temporary value.
      this.updateHTMLOutput();
    },
    
    // Method to Format and Update the JSON Object to HTML.
    updateHTMLOutput(obj = null){ 
      if(!obj) obj = this.newJsonObj;

      function replacer(key, value) { 
        // console.log(key,isNaN(key),value);                
        if(isNaN(key)){                  
          return value;
        }
        else{
          if(key === ''){
            return value;
          }
          else{
            if(typeof value === 'object'){
              return value;
            }
            else{              
              return value;
            }
          }
        }
      }

      this.jsonHTML = JSON.stringify(obj, replacer, 6)
                        .replace(/\n( *)/g, function (match, p1) {
                          return '<br>' + '&nbsp;'.repeat(p1.length);
                        });
    },

    // Method to Copy Objects
    copy(o){
      return JSON.parse(JSON.stringify(o));
    },
        

    // Method to Format a JSON Object to HTML Value.
    getFormattedString(o){
      return JSON.stringify(o,undefined,6)
              .replace(/\n( *)/g, function (match, p1) {
                return '<br>' +  '&nbsp;'.repeat(p1.length);
              });
    },

    showFailure(){      
      this.testMessage = 'Test Failed';
      this.test = false;
    },

    showSuccess(){      
      this.testMessage = 'Test Succeeded';
      this.test = true;
    },

    showNothing(){      
      this.testMessage = '';
      this.test = null;
    }
  }
});

