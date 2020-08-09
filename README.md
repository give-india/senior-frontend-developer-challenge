
## Assignment - Senior Front-end Engineer
   This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.
   Please find the Project setup and other details below.

### Installation

    * Install **Angular CLI** globally.
    
    ```bash
    npm install -g @angular/cli
    ```
    
    * Clone the git url to a local folder
    
    ```bash
    cd j-patch
    npm install
    ```
    
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Example Scenario
**Base Object**
```js
{
"slug": "diya-foundation",
"name": "Diya Foundation",
"registration_number": "386/98-99",
"auditor_name": "Das Kumar And Company",
"created_at": "2013-02-08T09:28:51.000Z",
"updated_at": "2020-02-25T06:11:35.814Z",
"external_profiles": [{
"label": "Website",
"uri": "http://www.diyafoundation-india.org/Site/index.html"
}, {
"label": "Youtube",
"uri": "http://www.youtube.com/watch?v=DezbmReWMf0"
}],
"tags": ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"]
}
```

**JSON Patch**
```js
[
    {
        "op": "replace",
        "path": "/tags/5",
        "value": "spbm18"
    },
    {
        "op": "replace",
        "path": "/tags/4",
        "value": "bengaluru10k-18"
    },
    {
        "op": "replace",
        "path": "/tags/3",
        "value": "lfc18-wow2"
    },
    {
        "op": "replace",
        "path": "/tags/2",
        "value": "tcs10k-18"
    },
    {
        "op": "replace",
        "path": "/tags/1",
        "value": "lfc18-cbp"
    },
    {
        "op": "replace",
        "path": "/tags/0",
        "value": "lfc18"
    },
    {
        "op": "add",
        "path": "/tags/6",
        "value": "housie18"
    },
    {
        "op": "add",
        "path": "/tags/7",
        "value": "hoh18"
    },
    {
        "op": "add",
        "path": "/tags/8",
        "value": "lfc19"
    },
    {
        "op": "add",
        "path": "/tags/9",
        "value": "tbpp"
    },
    {
        "op": "add",
        "path": "/tags/10",
        "value": "housie19"
    },
    {
        "op": "add",
        "path": "/tags/11",
        "value": "gfc2020"
    },
    {
        "op": "replace",
        "path": "/external_profiles/1/uri",
        "value": "https://www.facebook.com/pages/DIYA-Foundation/"
    },
    {
        "op": "replace",
        "path": "/external_profiles/1/label",
        "value": "Facebook"
    },
    {
        "op": "add",
        "path": "/external_profiles/2",
        "value": {
            "label": "Youtube",
            "uri": "http://www.youtube.com/watch?v=DezbmReWMf0"
        }
    },
    {
        "op": "add",
        "path": "/official_name",
        "value": "Diya Foundation"
    }
]
```
**Sample UI to show the differences**
Hovering on each of the change should allow the user to accept or reject the change and update the base object and the JSON patch correspondingly.
![UI to enter object and JSON patch](https://i.imgur.com/Gg27RFp.png)
![Sample Output Diff UI](https://i.imgur.com/d0pcseK.png)

### Deliverables
- Create a fork of this repository
- Code your solution in a frontend stack of your choice
- Include instructions on how to set it up and run in the [README.md](README.md)
- Add your resume and other profile / project links
- Submit a pull request (PR)
