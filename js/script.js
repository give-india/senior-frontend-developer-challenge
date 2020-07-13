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
    '  }' + '\n' +
    ']',
    // patch: null, // Input Text of JSON Patch that needs to be executed.
    jsonObj: {},    
    jsonPatch: {},
    newJsonObj: {},
    objectstring: ''   
  },
  methods: {
    formatInput: function(){
      if(this.input && this.patch){
        this.jsonObj = JSON.parse(this.input);   
        this.jsonPatch = JSON.parse(this.patch);
      }
    },
    exec: function(){
      this.formatInput();

      this.jsonPatch.forEach((patch, index) => { 

        switch(patch.op){
          case 'add':
            this.add(patch);
            break;
          case 'remove':
            break;
          case 'replace':
            this.replace(patch);
            break;
          case 'move':
            break;
          case 'copy':
            break;
          case 'test':
            break;
        }
      });
    },

    add: function(patch,index){      
      let path = patch.path.split('/');
      if(path[0]=== ""){
        path.shift();
      }
      console.log(path);      
      this.newJsonObj = this.jsonObj;

      let exec = 'this.newJsonObj.'+this.getPath(path) + 
                 '=' + (typeof(patch.value) === 'object' ? ('JSON.parse(\'' + JSON.stringify(patch.value) + '\')') : ('\'' + patch.value + '\''));
      console.log(exec);        
      eval(exec);
      this.objectstring = JSON.stringify(this.newJsonObj,undefined,2);
    },    

    remove: function(patch){

    },

    replace: function(patch){
      let path = patch.path.split('/');
      if(path[0]=== ""){
        path.shift();
      }
      console.log(path);      
      this.newJsonObj = this.jsonObj;

      let exec = 'this.newJsonObj.'+this.getPath(path) + 
                 '=' + (typeof(patch.value) === 'object' ? ('JSON.parse(\'' + JSON.stringify(patch.value) + '\')') : ('\'' + patch.value + '\''));
      console.log(exec);        
      eval(exec);    
      this.objectstring = JSON.stringify(this.newJsonObj,undefined,2);        
    },

    move: function(patch){

    },

    isJson(string){

    },

    seeDiff(index){
      let value = this.jsonPatch[index].value;
      this.objectstring = this.objectstring.replace(JSON.stringify(value),'<span class="new">' + value + '</span>');
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

    },

    accept(index){

    },


    reject(index){
      
    }

  }
})
