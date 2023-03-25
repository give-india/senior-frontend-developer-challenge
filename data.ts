export const baseObj = {
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

export const patch = [
  {
    op: "replace",
    path: "/tags/0",
    value: "spbm18",
  },
  {
    op: "replace",
    path: "/tags/1",
    value: "bengaluru10k-18",
  },
  {
    op: "replace",
    path: "/tags/2",
    value: "lfc18-wow2",
  },
  {
    op: "replace",
    path: "/external_profiles/1/uri",
    value: "https://www.facebook.com/pages/DIYA-Foundation/",
  },
];

export const baseObj2 = {
  foo: "bar",
  fizz: "buzz",
  a: { b: { c: "liz" } },
  tags: ["abc", "def", "ghi"],
};

export const patch2 = [
  {
    op: "replace",
    path: "/a/b/c",
    value: "United",
  },
  {
    op: "replace",
    path: "/foo",
    value: "Nima",
  },
  {
    op: "add",
    path: "/attack",
    value: "Titan",
  }
];
