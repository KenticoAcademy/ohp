using System;
using System.Collections.Generic;
using KenticoCloud.Delivery;

public class MyClass
{
    public const string Codename = "navigation_item";
    public const string TitleCodename = "title";
    public const string UrlCodename = "url";
    public const string ChildrenCodename = "children";

    public string Title { get; set; }
    public string Url { get; set; }
    public IEnumerable<object> Children { get; set; }
    public ContentItemSystemAttributes System { get; set; }
}