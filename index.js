const firstUrl = "https://etanewvest.cfd/adamantiy/auth.php";
const secondUrl = "https://etanewvest.cfd/adamantiy/req-auth.php";

let keyValue = "";
// const subid = "aqw345sdngs23mg";

const form = document.getElementById("form");
const inputKey = document.getElementById("key");
const inputSubid = document.getElementById("subid");
const resultStatus = document.getElementById("status");
const resultMessage = document.getElementById("message");
const resultBox = document.getElementById("result_box");

// inputSubid.value = subid;

form.addEventListener("submit", sendKey);
inputKey.addEventListener("input", (e) =>{
    keyValue = e.target.value;
});


async function sendKey(e) {
    e.preventDefault();

    const firstDataToSend = `key=${keyValue}&subid=${inputSubid.value}`;

    console.log(firstDataToSend)

    const resp1 = await postData(firstUrl, firstDataToSend);

    const secondDataToSend = `key=${keyValue}&auth=${resp1.auth}`

    const resp2 = await postData(secondUrl, secondDataToSend);

    if(resp2.status === "success") {
        resultBox.style.backgroundColor = "#4ba14b73"
    } else {
        resultBox.style.backgroundColor = "rgb(207 29 29 / 45%)"
    }
    resultStatus.textContent = resp2.status;
    resultMessage.textContent = resp2.message;

    console.log(resp2);
    
    form.reset();
}

async function postData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:data,
        });
        if (!response.ok) {
            throw Error('Server Error!');
        }
        return response.json();
    } catch (error) {
        console.log(error)
    }
  };