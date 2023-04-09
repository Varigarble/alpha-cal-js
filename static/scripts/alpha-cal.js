/* JavaScript data entry project mock-up*/

// clear fields on reload
window.onload = function () {
    for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
        let elem = document.getElementsByTagName('input')[i];
        elem.value = '';
    }
}

// run addMonths() function w/ 'Enter' key
let enterStartDate = document.getElementById("start-date");
enterStartDate.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addMonths").click();
    }
});

// THE IMPORTANT STUFF
function addMonths() {

    let effectiveDateUTC = new Date(document.getElementById("start-date").valueAsDate);
    let effectiveDate = new Date(effectiveDateUTC.getUTCFullYear(),
        effectiveDateUTC.getUTCMonth(),
        effectiveDateUTC.getUTCDate());
    let fpDate = document.getElementById("future-purchase-end");
    let aCertDate = document.getElementById("certificate-date");
    let e6Date = document.getElementById("certificate-reminder-1");
    let e7Date = document.getElementById("certificate-reminder-2");
    let installYesNo = document.getElementById("installments-yes-no");
    let installments = document.getElementById("installments-count");
    let n2Date = document.getElementById("purchase-reminder-1");
    let n3Date = document.getElementById("purchase-reminder-2");
    let n4Date = document.getElementById("purchase-reminder-3");
    let fpYesNo = document.getElementById("future-purchase-y-n");

    let installs = 0;
    let iInput = prompt("Please enter # of installments");
    if ((iInput != null) && (iInput != 0)) {
        installs = parseInt(iInput);
        installYesNo.value = 'Yes';
        installYesNo.dispatchEvent(new Event("change"));
        installments.value = installs;
        installments.dispatchEvent(new Event("change"));
    } else {
        installYesNo.value = 'No';
        installYesNo.dispatchEvent(new Event("change"));
        installments.value = null;
        installments.dispatchEvent(new Event("change"));
    }

    fpInitial = new Date(effectiveDate);
    aCertDue = new Date(effectiveDate);
    e6Due = new Date(effectiveDate);
    e7Due = new Date(effectiveDate);
    n2Due = new Date(effectiveDate);

    aCertDue.setDate(aCertDue.getDate() + 380);
    aCertDate.value = Intl.DateTimeFormat("en-US").format(aCertDue);
    aCertDate.dispatchEvent(new Event("change"));

    e6Due.setDate(e6Due.getDate() + 394);
    e6Date.value = Intl.DateTimeFormat("en-US").format(e6Due);
    e6Date.dispatchEvent(new Event("change"));

    e7Due.setDate(e7Due.getDate() + 405);
    e7Date.value = Intl.DateTimeFormat("en-US").format(e7Due);
    e7Date.dispatchEvent(new Event("change"));

    let fpMonths = 0;
    let input = prompt("Please enter Purchase Period in months");
    if ((input != null) && (input != 0)) {
        fpYesNo.value = 'Yes';
        fpYesNo.dispatchEvent(new Event("change"));
        fpMonths = parseInt(input);
        fpInitial.setMonth(fpInitial.getMonth() + installs);
        fpEnd = new Date(fpInitial);
        fpEnd.setMonth(fpEnd.getMonth() + fpMonths);
        fpDate.value = Intl.DateTimeFormat("en-US").format(fpEnd);
        fpDate.dispatchEvent(new Event("change"));
    } else {
        fpYesNo.value = 'No';
        fpYesNo.dispatchEvent(new Event("change"));
        n2Date.value = null;
        n2Date.dispatchEvent(new Event("change"));
        n3Date.value = null;
        n3Date.dispatchEvent(new Event("change"));
        n4Date.value = null;
        n4Date.dispatchEvent(new Event("change"));
        fpDate.value = null;
        fpDate.dispatchEvent(new Event("change"));
    }

    function nLtr() {

        // new Date objects to adjust Purchase dates to Cert. Dates if w/in 45 days
        let e6Minus = new Date(e6Due);
        e6Minus.setDate(e6Minus.getDate() - 46);

        let e6Plus = new Date(e6Due);
        e6Plus.setDate(e6Plus.getDate() + 45);

        // Reminder 1 Date:
        if ((6 <= fpMonths) && (fpMonths <= 24)) {
            n2Due.setMonth(n2Due.getMonth() + installs + 3);
        } else if (fpMonths >= 24) {
            n2Due.setMonth(n2Due.getMonth() + installs + 6);
        }
        if ((e6Minus <= n2Due) && (n2Due <= e6Plus)) {
            n2Due = e6Due;
        }
        n2Date.value = Intl.DateTimeFormat("en-US").format(n2Due);
        n2Date.dispatchEvent(new Event("change"));

        // Reminder 2 Date:
        n3Due = new Date(n2Due);
        n3Due.setMonth(n3Due.getMonth() + 6)
        if (n3Due < fpEnd) {
            if ((e6Minus <= n3Due) && (n3Due <= e6Plus)) {
                n3Due = e6Due;
            }
            n3Date.value = Intl.DateTimeFormat("en-US").format(n3Due);
            n3Date.dispatchEvent(new Event("change"));
        }

        // Reminder 3 Date
        n4Due = new Date(n2Due);
        n4Due.setMonth(n4Due.getMonth() + 12)
        if ((n4Due < fpEnd) && (fpMonths >= 24)) {
            n4Date.value = Intl.DateTimeFormat("en-US").format(n4Due);
            n4Date.dispatchEvent(new Event("change"));
        }
    }

    if ((fpYesNo.value == 'Yes') && (5 < fpMonths)) {
        nLtr()
    }
    console.log("Installments: ", installs);
    console.log("Annual Cert. due: ", aCertDate.value);
    console.log("1st Cert. Reminder Due: ", e6Date.value);
    console.log("2nd Cert. Reminder Due: ", e7Date.value);
    console.log("Future Purchase months: ", fpMonths);
    console.log("Future Purchase begin: ", fpInitial);
    console.log("Future Purchase end: ", fpDate.value);
    console.log("Purchase Reminder 1 suggested: ", n2Date.value);
    console.log("Purchase Reminder 2 suggested: ", n3Date.value);
    console.log("Purchase Reminder 3 suggested: ", n4Date.value);

    // Clear variables:
    delete fpInitial
    delete aCertDue
    delete e6Due
    delete e7Due
    delete n2Due
    delete n3Due
    delete n4Due
}
