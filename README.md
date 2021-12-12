
## Assignment - Senior Front-end Engineer

### Objective
Given a JS object and a JSON-patch, create a UI to
-   show the changes due to each patch operation
-   allow the user to approve / reject one patch operation at a time
-  update the UI to show the remaining operations

### What is JSON Patch?

JSON Patch is a format for describing changes to a JSON document. It can be used to store changes in the form of patch operations. The patch documents are themselves JSON documents. JSON Patch is specified in [RFC 6902](http://tools.ietf.org/html/rfc6902) from the IETF.

### Solution

With two textareas each for base object and patch a menu is displayed to:
- Select an operation from list by clicking on a particular one.
- Apply the next(topmost) operation from the list.
- Reject the selected operation.
- Start over the process.
- Developed using:
<a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="20" height="20"/> </a><br>

> Uses `jsonpatch` to conduct patch operations and `react-json-view` to view compiled object and operations.


### Example Scenario
Copy the base object and patch to their respective fields to test.
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

#### Solution by:

[Ananthakrishna](https://drive.google.com/file/d/1r2NigIV7-fBgabcqEkywn0mquSB-AkEA/view?usp=sharing) <br>
<a href="https://linkedin.com/in/ananthakrishna-h-s" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="ananthakrishna-h-s" height="20" width="20" /></a>
&nbsp;&nbsp;
<a href="https://medium.com/@ananthakrishna-h-s" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/medium.svg" alt="@ananthakrishna-h-s" height="20" width="20" /></a>
&nbsp;&nbsp;
<a href="https://github.com/ananthakrishna-hs" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="@ananthakrishna-h-s" height="20" width="20" /></a>