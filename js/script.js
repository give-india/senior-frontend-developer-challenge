let jsonPatchApp = new Vue({
  el: '#jsonPatchApp',
  data: {    
    // input: '{ "foo": "bar"}', // Input Text of JSON Object that needs to be modified.
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
    // patch: '[ { "op": "add", "path": "/baz", "value": "qux" }]', // Input Text of JSON Patch that needs to be executed.
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
    '      "op": "copy",' + '\n' +
    '      "from": "/registration_number",' + '\n' +
    '      "path": "/external_profiles/4"' + '\n' +
    '  }' + '\n' +
    ']',
    // patch: null, // Input Text of JSON Patch that needs to be executed.
    jsonObj: {}, // Object to store the parsed JSON Input Value;
    jsonPatch: {}, // Object to store the parsed JSON Input Patch Value;
    newJsonObj: {}, // Object to store the modified JSON Input Value;    
    jsonHTML: '' // String to store the Stingified Object to be displayed in HTML. 
  },

  watch: {
    jsonHTML: function(value){
      document.getElementById('jsonOutput').innerHTML = value;
    },
    // newJsonObj: function(value){
    //   console.log(value);
    // }
    jsonObj: function(value){
      console.log('Updated Now');
    }
  },

  updated: function(){
    console.log('DOM Updated');
  },

  methods: {    
    formatInput: function(){ // Method Called up submitting User Input to format the user input to JSON Object.
      console.log('Called');
      if(this.input && this.patch){
        this.jsonObj = JSON.parse(this.input); // Assigning the JSON Value;
        this.jsonPatch = JSON.parse(this.patch);        
        this.newJsonObj = JSON.parse(this.input); // Assigning a copy of the JSON Value;
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
      let path = patch.path.split('/');

      if(path[0]=== ""){
        path.shift();
      }
      console.log(path);
      
      console.log(patch.from);
      if(patch.from){
        var fromPath = patch.from.split('/');
        if(fromPath[0] === ""){
          fromPath.shift();
        }
      }

      let tempObject = this.newJsonObj;

      switch(patch.op){
        case 'add':
          this.newJsonObj = this.setValue(path,patch.value,this.newJsonObj);           
          break;
        case 'remove':           
          this.jsonPatch[index].previousValue = this.getValue(path);
          this.newJsonObj = this.unsetValue(path);
          break;
        case 'replace':          
          this.jsonPatch[index].previousValue = this.getValue(path);
          this.newJsonObj = this.setValue(path,patch.value,this.newJsonObj);
          break;
        case 'move':
          if(fromPath){
            let currentVal = this.getValue(fromPath);
            if(currentVal !== undefined){
              this.newJsonObj = this.unsetValue(fromPath);
              this.newJsonObj = this.setValue(path,currentVal,this.newJsonObj);
            }
          }
          break;
        case 'copy':
          if(fromPath){
            let currentVal = this.getValue(fromPath);            
            this.newJsonObj = this.setValue(path,currentVal,this.newJsonObj)
            console.log(this.newJsonObj);
          }
          break;
        case 'test':
          break;
      }      
    },

    isJson(string){

    },

    seeDiff(e,index){
      if(index === 0){
        this.newJsonObj = this.copy(this.jsonObj); // Incase change isn't accepted or rejected, load the previous version of the object.
        this.executePatch(this.jsonPatch[index],index);
        let path = this.jsonPatch[index].path.split('/');
        if(path[0]=== ""){
          path.shift();
        }
        let key = path[path.length - 1];
        console.log(key);      
        let value = this.jsonPatch[index].value; 

        this.updateHTMLOutput();
        let matchText;

        switch(this.jsonPatch[index].op){
          case 'add':
            if(isNaN(key)){             
              matchText = JSON.stringify(key) + ': ' + this.getFormattedString(value);
            }
            else{ 
              matchText = this.getFormattedString(value);
            }

            if(typeof(this.jsonPatch[index].value) === 'object'){          
              matchText = matchText.split('<br>');
              matchText.forEach((match,item) => {              
                matchText[item] = '&nbsp;'.repeat(path.length * 6) + match;                
              });
              matchText = matchText.join('<br>');
            }
            

            this.jsonHTML = this.jsonHTML.replace(
              matchText,'<span class="new">' + matchText + '</span>'
            );
            

            console.log(matchText);          
            break;
          case 'remove':                   
            if(isNaN(key)){ matchText = JSON.stringify(key) + ': ' +JSON.stringify(this.jsonPatch[index].previousValue); }
            else{ matchText = JSON.stringify(this.jsonPatch[index].previousValue); }                    
            
            this.updateHTMLOutput(this.jsonObj);                  
            this.jsonHTML = this.jsonHTML.replace(
              matchText,'<span class="old">' + matchText + '</span>'
            );         
            break;
          case 'replace':
            this.jsonHTML = this.jsonHTML.replace(
              JSON.stringify(value),                      
                (this.jsonPatch[index].previousValue !== undefined ? '<span class="old">' + this.jsonPatch[index].previousValue + '</span> ' : '')
              + '<span class="new">' + value + '</span>'
            );        
            break;
          case 'move':
            if(isNaN(key)){ 
              matchText = JSON.stringify(key) + ': ' +JSON.stringify(this.jsonPatch[index].previousValue); 
            }
            else{ 
              matchText = JSON.stringify(this.jsonPatch[index].previousValue); 
            }
            console.log(matchText);          
            this.updateHTMLOutput(this.jsonObj);                  
            this.jsonHTML = this.jsonHTML.replace(
              matchText,'<span class="old">' + matchText + '</span>'
            );
            break;
          case 'copy':          
            if(isNaN(key)){ 
              matchText = JSON.stringify(key) + ': ' +JSON.stringify(this.getValue(path)); 
            }
            else{ 
              matchText = JSON.stringify(this.getValue(path));
            }          
            console.log(matchText);          
            this.updateHTMLOutput(this.newJsonObj);          
            this.jsonHTML = this.jsonHTML.replace(
              matchText,'<span class="new">' + matchText + '</span>'
            );
            break;
          case 'test':
            break;
        }
      }
      else{
        alert('You should execute the patches in order');
      }
      
      // console.log(this.newJsonObj, this.jsonObj);
    },

    getPath(path){
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

    unsetValue: function(path, newObj = null){
      if(!newObj) newObj = this.newJsonObj;
      let exec = 'delete newObj.' + this.getPath(path);
      console.log(exec);
      eval(exec);            
      return newObj;      
    },

    getValue(path){
      let exec = 'this.newJsonObj.' + this.getPath(path);                       
      return eval(exec);
    },

    accept(index){
      let value = this.jsonPatch[index].value;
      let path = this.jsonPatch[index].path.split('/');
      if(path[0]=== ""){
        path.shift();
      }
      
      if(this.getValue(path) !== value){        
        this.setValue(path,value);
      }
      else{        
        this.updateHTMLOutput(this.newJsonObj);
      }
      this.jsonPatch.splice(index,1);
      this.jsonObj = this.copy(this.newJsonObj);
      this.updateHTMLOutput();
    },


    reject(index){      
      let value = this.jsonPatch[index].previousValue;
      let path = this.jsonPatch[index].path.split('/');
      if(path[0]=== ""){
        path.shift();
      }
            
      if(this.getValue(path) !== value){
        console.log('Here');
        if(value === undefined){
          this.unsetValue(path);
        }
        else{
          this.setValue(path,value);
        }
      }
      else{
        console.log('Here roo');
        this.updateHTMLOutput(this.newJsonObj);
      }

      this.jsonPatch.splice(index,1);
      this.newJsonObj = this.copy(this.jsonObj);
      this.updateHTMLOutput();
    },

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

    copy(o){
      return JSON.parse(JSON.stringify(o));
    },
        

    getFormattedString(o){
      return JSON.stringify(o,undefined,6)
              .replace(/\n( *)/g, function (match, p1) {
                return '<br>' +  '&nbsp;'.repeat(p1.length);
              });
    }

  }
})

