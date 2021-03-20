let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

//LV1
//抓取ul
const elTicketCardArea = document.querySelector('.ticketCard-area');
//搜尋有幾筆資料的部分
const elSearchResultText = document.querySelector('#searchResult-text');
//多少筆資料
let elSearchNum = document.querySelector('.searchNum');

//宣告成函式 讓LV3也可呼叫
function render() {
  //forEach外宣告空字串儲存
  let str = "";
  //儲存查詢幾筆資料用
  let filterArray = [];
  //用forEach帶入每次物件的資料
  data.forEach(function (item) {
    //每次迴圈 push一次物件資料
    filterArray.push(item);
    //console.log(filterArray);
    //str累加
    str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img
              src="${item.imgUrl}"
              alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  })
  //ul 塞入 str
  elTicketCardArea.innerHTML = str;
  //渲染查詢資料的陣列長度
  elSearchNum.textContent = `${filterArray.length}`
}
//Lv1執行
render();

//新增按鈕部分
//add名稱
const elTicketName = document.querySelector('#ticketName');
//add圖片網址
const elTicketImgUrl = document.querySelector('#ticketImgUrl');
//add地區
const elTicketRegion = document.querySelector('#ticketRegion');
//add金額
const elTicketPrice = document.querySelector('#ticketPrice');
//add數量
const elTicketNum = document.querySelector('#ticketNum');
//add星級
const elTicketRate = document.querySelector('#ticketRate');
//add描述
const elTicketDescription = document.querySelector('#ticketDescription');
//add按鈕
const elAddTicketBtn = document.querySelector('.addTicket-btn');
//form 用來 讀取完value做reset 
const elForm = document.querySelector('.addTicket-form');
//監聽elAddTicketBtn 當click就執行函式
elAddTicketBtn.addEventListener('click', function (e) {
  //console.log('123');
  //console.log(elTicketName.value);
  data.push({
    //由於id不可寫死,且不可重複 使用Date.now()可以產生目前電腦時間亂數
    id: Date.now(),
    name: elTicketName.value,
    imgUrl: elTicketImgUrl.value,
    area: elTicketRegion.value,
    description: elTicketDescription.value,
    group: Number(elTicketNum.value),
    price: Number(elTicketPrice.value),
    rate: Number(elTicketRate.value),
  });
  console.log(data);
  //判斷填入數字未超過10才執行畫面渲染render();
  ifTenRate();
})

//Rate推薦星級 不超過10判斷式
function ifTenRate() {
  if (Number(elTicketRate.value) <= 1 || Number(elTicketRate.value) > 10) {
    //彈出視窗
    alert(`推薦星數不可超過10或小於1,請重新填寫`)
    //刪除最後一筆陣列資料
    data.pop()
  } else {
    //呼叫reset函式 按下按鈕後讓表單清空
    elForm.reset();
    //呼叫render函式 判斷填入數字未超過10才執行畫面渲染
    render();
  }

}

//幾筆資料

//下拉選單篩選地區部分
const elRegionSearch = document.querySelector('.regionSearch')
//監聽
elRegionSearch.addEventListener('change', function (e) {
  //console.log('123');
  let str = "";
  let filterArray = [];
  data.forEach(function (item) {
    if (elRegionSearch.value === "") {
      //每次迴圈 push一次物件資料
      filterArray.push(item);
      //str累加
      str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img
              src="${item.imgUrl}"
              alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`
    } else if (elRegionSearch.value === item.area) {
      //每次迴圈 push一次物件資料
      filterArray.push(item);
      //str累加
      str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img
              src="${item.imgUrl}"
              alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`
    }

  })
  //ul 塞入 str
  elTicketCardArea.innerHTML = str;
  //渲染查詢資料的陣列長度
  elSearchNum.textContent = `${filterArray.length}`;
})
