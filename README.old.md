
## Assignment - Senior Front-end Engineer

Not just ‘Frontend’, are you a pro at web development with a special liking for JavaScript? How about working with a team that’s full of the creative breed and where food and outings are considered as being equally important to work?

We would love it if you are blessed with prudent design aesthetics but we would also want you to be game about having ‘fun’ while working. Welcome to the world of Give, where we have come together to introduce a culture of giving that aims to change lives for the better.
Stalk us at [our website](https://www.giveindia.org/), [FB](https://www.facebook.com/GiveIndia/), [Twitter](https://twitter.com/giveindia/), [LinkedIn](https://www.linkedin.com/company/giveindia/)

We are looking for determined front-end developers who come with a strong experience in implementing modern web UIs that prove to be are a delight for the user. If you think you have what it takes, build us this simple app in a frontend stack of your choosing.

### Objective
Given a JS object and a JSON-patch, create a UI to
-   show the changes due to each patch operation
-   allow the user to approve / reject one patch operation at a time
-  update the UI to show the remaining operations

### What is JSON Patch?

JSON Patch is a format for describing changes to a JSON document. It can be used to store changes in the form of patch operations. The patch documents are themselves JSON documents. JSON Patch is specified in [RFC 6902](http://tools.ietf.org/html/rfc6902) from the IETF.


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
