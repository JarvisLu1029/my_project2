// 監聽表單提交事件
document.getElementById("queryForm").addEventListener("submit", function (event) {
    // 阻止表單的默認提交行為
    event.preventDefault();

    // 獲取輸入框的值
    const data = document.getElementById("queryInput").value;

    const baseUrl = 'http://localhost:8000/api/search/';
    const params = {
        keyword: data,
    };
    const query = new URLSearchParams(params).toString();

    // 使用 fetch API 發送數據到 API
    fetch(`${baseUrl}?${query}`)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');

            // 從API取得數據
            const products = data['data'];

            for (const product of products) {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productImage = document.createElement('img');
                productImage.src = product.image;

                const productName = document.createElement('p');
                productName.innerText = product.name;

                const productPrice = document.createElement('p');
                productPrice.innerText = product.price;

                const productLink = document.createElement('a');
                productLink.href = product.url;
                productLink.innerText = '查看詳情';

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productLink);

                productList.appendChild(productDiv);
            }
        })

        .catch((error) => {
            console.error("Error:", error);
        });
});
