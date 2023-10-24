// 假設 data 是一個物件陣列，可以從 API 獲取
// const data = [
//     {
//         id: 1,
//         img_url: 'image1.jpg',
//         name: 'Title 1',
//         store: '2021-01-01',
//         price: 100,
//         product_url: 'http://example.com/deal/1'
//     },
//     {
//         id: 2,
//         img_url: 'image2.jpg',
//         name: 'Title 2',
//         store: '2021-02-01',
//         price: 200,
//         product_url: 'http://example.com/deal/2'
//     },
// ];

// 監聽表單提交事件
document.getElementById("queryForm").addEventListener("submit", function (event) {
    // 阻止表單的默認提交行為
    event.preventDefault();

    // 清空之前的結果
    const container = document.getElementById('fetchCard');
    container.innerHTML = '';

    // 獲取輸入框的值
    const data = document.getElementById("queryInput").value;

    const svgIcon = `
        <svg class="svg-icon" viewBox="0 0 20 20">
            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
        </svg>
        `;

    const baseUrl = 'http://localhost:8000/api/search/';
    const params = {
        keyword: data,
    };
    const query = new URLSearchParams(params).toString();

    // 使用 fetch API 發送數據到 API
    fetch(`${baseUrl}?${query}`)
        .then(response => response.json())
        .then(data => {
            // 迴圈遍歷數據，生成卡片
            if (Array.isArray(data['data'])) {
                data['data'].forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const cardImg = document.createElement('div');
                    cardImg.className = 'card-img';
                    const img = document.createElement('img');
                    img.src = item.img_url;
                    img.alt = '商品圖片';
                    cardImg.appendChild(img);

                    const cardInfo = document.createElement('div');
                    cardInfo.className = 'card-info';
                    const title = document.createElement('p');
                    title.className = 'text-title';
                    title.innerText = item.name;
                    const body = document.createElement('p');
                    body.className = 'text-body';
                    body.innerText = item.store;
                    cardInfo.appendChild(title);
                    cardInfo.appendChild(body);

                    const cardFooter = document.createElement('div');
                    cardFooter.className = 'card-footer';
                    const price = document.createElement('span');
                    price.className = 'text-title';
                    price.innerText = '$ ' + item.price;
                    const link = document.createElement('a');
                    link.className = 'card-button';
                    link.href = item.product_url;
                    link.target = '_blank';

                    cardFooter.appendChild(price);
                    cardFooter.appendChild(link);
                    // 使用 insertAdjacentHTML 在 cardFooter 底部添加 SVG 元素
                    link.insertAdjacentHTML('beforeend', svgIcon);

                    card.appendChild(cardImg);
                    card.appendChild(cardInfo);
                    card.appendChild(cardFooter);

                    container.appendChild(card);

                });
            }
        });

});