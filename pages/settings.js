import * as ec from "echis";

var app = ec.AppWrapper();
var menu = ec.Menu(app);
var header = ec.Header(menu, "Aluminum Browser Settings", "#303038");

var sidebar = ec.Sidebar(menu);
header.button.addEventListener("click", (event) => {
  sidebar.toggle();
})

var listThemes = ec.ListButton(sidebar.obj, "Personalize");
var listAbout = ec.ListButton(sidebar.obj, "Side Tabs");
var listAbout = ec.ListButton(sidebar.obj, "About");
sidebar.seperator();
var labelCredit = ec.Label(sidebar.obj, "Made by MortCodesWeb.");

var title = ec.Label(menu, "Settings", 32);

var personalize_title = ec.Label(menu, "Personalize", 24);
var personalize_desc = ec.Label(menu, "Customize the Browser by your likings.");
var personalize_dmode = ec.Label(menu, "Toggle between dark and light mode with the following button below.");
var personalize_dmode_toggle = ec.Button(menu, "Toggle\nDark Mode");

var sidetabs_title = ec.Label(menu, "Side Tabs", 24);
var sidetabs_desc = ec.Label(menu, "Have you been bored of tabs being on the top?\nTry this one by clicking one of these.");
var sidetabs_toggle = ec.Button(menu, "Toggle\nSide Tabs");
sidetabs_toggle.style.borderColor = "#40c040";
sidetabs_toggle.style.borderWidth = "2px";
var sidetabs_toggle_btn = ec.Button(menu, "Toggle\nSide Tabs Button");

var about_title = ec.Label(menu, "About", 24);
var about_desc = ec.Label(menu, "Thank you for using our (my) browser. We (I) appretiate that.");
var about_version = ec.Label(menu, `Aluminum Browser 1.0.0 (x64)`);
var about_update = ec.Button(menu, "Check for Updates");
about_update.style.borderColor = "#40c040";
about_update.style.borderWidth = "2px";
