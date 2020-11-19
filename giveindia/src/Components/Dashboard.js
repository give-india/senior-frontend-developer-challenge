import React, { Component } from "react";
import { Tile } from "carbon-components-react";
import "./Dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      filterCategoryItems: [
        {
          op: "replace",
          path: "/tags/5",
          value: "spbm18",
          id: "0",
        },
        {
          op: "replace",
          path: "/tags/4",
          value: "bengaluru10k-18",
          id: "1",
        },
        {
          op: "replace",
          path: "/tags/3",
          value: "lfc18-wow2",
          id: "2",
        },
        {
          op: "replace",
          path: "/tags/2",
          value: "tcs10k-18",
          id: "3",
        },
        {
          op: "replace",
          path: "/tags/1",
          value: "lfc18-cbp",
          id: "4",
        },
        {
          op: "replace",
          path: "/tags/0",
          value: "lfc18",
          id: "5",
        },
        {
          op: "add",
          path: "/tags/6",
          value: "housie18",
          id: "6",
        },
        {
          op: "add",
          path: "/tags/7",
          value: "hoh18",
          id: "7",
        },
        {
          op: "add",
          path: "/tags/8",
          value: "lfc19",
          id: "8",
        },
        {
          op: "add",
          path: "/tags/9",
          value: "tbpp",
          id: "9",
        },
        {
          op: "add",
          path: "/tags/10",
          value: "housie19",
          id: "10",
        },
        {
          op: "add",
          path: "/tags/11",
          value: "gfc2020",
          id: "11",
        },
        {
          op: "replace",
          path: "/external_profiles/1/uri",
          value: "https://www.facebook.com/pages/DIYA-Foundation/",
          id: "12",
        },
        {
          op: "replace",
          path: "/external_profiles/1/label",
          value: "Facebook",
          id: "13",
        },
        {
          op: "add",
          path: "/external_profiles/2",
          value: {
            label: "Youtube",
            uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
          },
          id: "14",
        },
        {
          op: "add",
          path: "/official_name",
          value: "Diya Foundation",
          id: "15",
        },
      ],
    };
  }

  componentDidMount() {}

  onMouseClick(event) {
    var txt;
    var category;
    var index = "";
    var value = "";
    this.state.filterCategoryItems.forEach((element) => {
      if (element.id === event.currentTarget.id) {
        txt = element.op;
        category = element.path.split("/");
        value = element.value;
      }
    });
    index = category[2];
    var r = window.confirm(
      "Do you want to " +
        txt +
        " " +
        category[1] +
        " for div" +
        event.currentTarget.id
    );
    if (r == true) {
      if (txt == "replace" && category[1] == "tags") {
        var div = document
          .getElementsByClassName("tags-id")
          .item(event.currentTarget.id);
        div.getElementsByTagName("p").item(index).innerHTML = value;
        div.getElementsByTagName("p").item(index).style.backgroundColor = "red";
        div.getElementsByTagName("p").item(index).style.color = "white";
      } else if (txt == "add" && category[1] == "tags") {
        var node = document.createElement("p");
        var textnode = document.createTextNode(value);
        node.appendChild(textnode);

        node.style.backgroundColor = "red";
        node.style.color = "white";
        document
          .getElementsByClassName("tags-id")
          .item(event.currentTarget.id)
          .appendChild(node);
      } else if (txt == "replace" && category[1] == "external_profiles") {
        var div = document
          .getElementsByClassName("external-profile-id")
          .item(event.currentTarget.id);
        div.getElementsByTagName("p").item(index).innerHTML = value;
        div.getElementsByTagName("p").item(index).style.backgroundColor = "red";
        div.getElementsByTagName("p").item(index).style.color = "white";
      } else if (txt == "add" && category[1] == "external_profiles") {
        var node = document.createElement("p");
        var textnode = document.createTextNode(value.uri);
        node.appendChild(textnode);

        node.style.backgroundColor = "red";
        node.style.color = "white";
        document
          .getElementsByClassName("external-profile-id")
          .item(event.currentTarget.id)
          .appendChild(node);
        var node = document.createElement("p");
        var textnode = document.createTextNode(value);
        node.appendChild(textnode);
      } else {
        var div = document.getElementsByTagName("span").item(event.target.id);
        div.innerHTML = value;
        div.style.backgroundColor = "red";
        div.style.color = "white";
      }
    } else {
      txt = "You pressed Cancel!";
    }
  }

  render() {
    const baseObject = {
      slug: "diya-foundation",
      name: "Diya Foundation",
      registration_number: "386/98-99",
      auditor_name: "Das Kumar And Company",
      created_at: "2013-02-08T09:28:51.000Z",
      updated_at: "2020-02-25T06:11:35.814Z",
      external_profiles: [
        {
          label: "Website",
          uri: "http://www.diyafoundation-india.org/Site/index.html",
        },
        {
          label: "Youtube",
          uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
        },
      ],
      tags: ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"],
    };

    return (
      <div className="card_view_container">
        {this.state.filterCategoryItems.map((value, index) => {
          return (
            <Tile
              className="card-view"
              id={value.id}
              key={value.id}
              onClick={(e) => this.onMouseClick(e)}
            >
              <span className="name_title">{baseObject.slug}</span>
              <div className="registeration">
                Reg No:
                {baseObject.registration_number}
              </div>
              <div className="tags-id" id={value.id} key={value.id}>
                {baseObject.tags.map((value, index) => {
                  return (
                    <p className="id" id={index}>
                      {value}
                    </p>
                  );
                })}
              </div>
              <div className="external-profile-id" id={value.id} key={value.id}>
                {baseObject.external_profiles.map((value, index) => {
                  return (
                    <p className="id" id={index}>
                      <u>{value.uri}</u>
                    </p>
                  );
                })}
              </div>
              <div className="created_box">
                <p className="label_title">Created At</p>
                <p className="label_value">{baseObject.created_at}</p>
              </div>
              <div className="created_box">
                <p className="label_title">Updated At</p>
                <p className="label_value">{baseObject.updated_at}</p>
              </div>
            </Tile>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
