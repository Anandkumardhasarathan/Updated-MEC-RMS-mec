﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('calibri-italic-normal.ttf', font);
this.addFont('calibri-italic-normal.ttf', 'calibri-italic', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])