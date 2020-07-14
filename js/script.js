let jsonPatchApp = new Vue({
  el: '#jsonPatchApp',
  data: {    
    // input: '{ "foo": "bar"}', // Input Text of JSON Object that needs to be modified.
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
    jsonObj: {},    
    jsonPatch: {},
    newJsonObj: {},
    objectstring: '',
    jsonHTML: ''  
  },

  watch: {
    jsonHTML: function(value){
      document.getElementById('jsonOutput').innerHTML = value;
    }
  },

  methods: {
    formatInput: function(){
      if(this.input && this.patch){
        this.jsonObj = JSON.parse(this.input);   
        this.jsonPatch = JSON.parse(this.patch);
        this.newJsonObj = this.jsonObj;
      }
    },

    exec: function(){
      this.formatInput();
      this.jsonPatch.forEach((patch, index) => { 
        this.executePatch(patch,index)
      });
    },


    executePatch(patch,index){
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

      switch(patch.op){
        case 'add':
          this.setValue(path,patch.value);                
          break;
        case 'remove':
          let currentVal = this.getValue(path);
          this.unsetValue(path);
          break;
        case 'replace':          
          this.jsonPatch[index].previousValue = this.getValue(path);
          this.setValue(path,patch.value);
          break;
        case 'move':
          if(fromPath){
            let currentVal = this.getValue(fromPath);
            this.unsetValue(fromPath);
            this.setValue(path,currentVal)
          }
          break;
        case 'copy':
          if(fromPath){
            let currentVal = this.getValue(fromPath);            
            this.setValue(path,currentVal)
          }
          break;
        case 'test':
          break;
      }

    },

    move: function(patch){

    },

    isJson(string){

    },

    seeDiff(e,index){
      // let element = e;
      // if(element.target.classList.indexOf('operation-item') < 0){
      //   element = element.target.parentElement;
      // }
      // console.log(element.classList);

      let value = this.jsonPatch[index].value;
      // this.objectstring = this.objectstring.replace(JSON.stringify(value),'<span class="old">' + this.jsonPatch[index].previousValue + '</span><span class="new">' + value + '</span>');
      this.updateHTMLOutput();
      this.jsonHTML = this.jsonHTML.replace(
                        JSON.stringify(value),
                        '<span class="old">' + 
                          (this.jsonPatch[index].previousValue !== undefined ? this.jsonPatch[index].previousValue : '')
                        + '</span> <span class="new">' + value + '</span>'
                      );
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

    setValue(path, value){
      let exec = 'this.newJsonObj.' + this.getPath(path) + 
                 '=' + 
                 (typeof(value) === 'object' ? ('JSON.parse(\'' + JSON.stringify(value) + '\')') : ('\'' + value + '\''));
      console.log(exec);        
      eval(exec);
      // this.objectstring = JSON.stringify(this.newJsonObj,null,2);
      this.updateHTMLOutput();
    },

    unsetValue: function(path){
      let exec = 'delete this.newJsonObj.' + this.getPath(path);
      console.log(exec);
      eval(exec);
      // this.objectstring = JSON.stringify(this.newJsonObj,null,2);  
      this.updateHTMLOutput();   
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
        this.updateHTMLOutput();
      }

      this.jsonPatch.splice(index,1);

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
        this.updateHTMLOutput();
      }

      this.jsonPatch.splice(index,1);
    },

    updateHTMLOutput(){
      this.jsonHTML = JSON.stringify(this.newJsonObj, null, 6)
                        .replace(/\n( *)/g, function (match, p1) {
                        return '<br>' + '&nbsp;'.repeat(p1.length);
                      });
    }

  }
})
