// Khai báo biến products ở phạm vi toàn cục
let products = [
    { id: 1, name: 'Giày DAS Samba', price: 359000 },
    { id: 2, name: 'Áo thun', price: 150000 }
];

// Hàm hiển thị sản phẩm lên bảng
function displayProducts() {
    let productTableBody = document.getElementById('productTable')?.getElementsByTagName('tbody')[0];
    if (productTableBody) {
        productTableBody.innerHTML = '';
        products.forEach((product) => {
            let row = productTableBody.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} đ</td>
                <td>
                    <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            `;
        });
    }
}

// Sửa sản phẩm (Chức năng sửa có thể thêm sau)
function editProduct(productId) {
    let product = products.find(p => p.id === productId);
    alert(`Chức năng sửa sản phẩm cho: ${product.name}`);
}

// Xóa sản phẩm
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    displayProducts();
}

// Chạy khi tài liệu đã tải xong
document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần thiết
    const quantityInput = document.getElementById("quantity");
    const totalPriceCell = document.getElementById("total-price"); // Lấy phần tử hiển thị tổng giá
    const finalPrice = document.getElementById("final-price"); // Lấy phần tử hiển thị giá cuối cùng
    const grandTotal = document.getElementById("grand-total"); // Lấy phần tử hiển thị tổng cộng
    const shippingFee = 20000; // Giả sử phí vận chuyển là 20,000 đ

    // Kiểm tra xem các phần tử có tồn tại hay không trước khi thêm sự kiện
    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            const pricePerItem = 100000; // Giá mỗi sản phẩm, giả sử là 100,000 đ
            const quantity = parseInt(quantityInput.value) || 1; // Lấy số lượng từ input, mặc định là 1 nếu không có giá trị
            const totalPrice = pricePerItem * quantity; // Tính tổng giá trị của sản phẩm
            totalPriceCell.textContent = `${totalPrice.toLocaleString()}đ`; // Hiển thị tổng giá sản phẩm

            // Cập nhật tổng tiền sau khi thêm phí vận chuyển
            const totalWithShipping = totalPrice + shippingFee;
            finalPrice.textContent = `${totalPrice.toLocaleString()}đ`; // Hiển thị tổng tiền sản phẩm
            grandTotal.textContent = `${totalWithShipping.toLocaleString()}đ`; // Hiển thị tổng cộng (bao gồm phí vận chuyển)
        });
    }

    // Các phần tử khác
    const buyButton = document.querySelector('.buy-button');
    const orderStatus = document.querySelector('.order-status');

    if (buyButton) {
        buyButton.addEventListener('click', () => {
            orderStatus.textContent = 'Chờ xác nhận...'; // Hiển thị trạng thái "Chờ xác nhận"
            buyButton.disabled = true; // Vô hiệu hóa nút mua để không bấm lại
        });
    }

    // Mã giảm giá
    const discountButton = document.querySelector('.apply-discount');
    if (discountButton) {
        discountButton.addEventListener('click', () => {
            const discountInput = document.querySelector('#discount-code');
            const discountCode = discountInput.value.trim(); // Lấy mã giảm giá từ input
            if (discountCode === '3TSHOES10') {
                const discount = 0.1 * parseInt(finalPrice.textContent.replace(/\D/g, '')); // Tính toán giảm giá (10%)
                const discountedTotal = parseInt(finalPrice.textContent.replace(/\D/g, '')) - discount + shippingFee; // Tổng sau giảm giá và phí vận chuyển
                grandTotal.textContent = `${discountedTotal.toLocaleString()}đ`; // Hiển thị tổng cộng sau giảm giá
                alert('Mã giảm giá áp dụng thành công!'); // Thông báo thành công
            } else {
                alert('Mã giảm giá không hợp lệ.'); // Thông báo mã giảm giá không hợp lệ
            }
        });
    }

    // Đảm bảo các form và nút không gây lỗi
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const phoneInput = document.getElementById('registerPhoneInput').value;
            const phoneRegex = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại có 10 hoặc 11 chữ số

            if (!phoneRegex.test(phoneInput)) {
                alert('Vui lòng nhập số điện thoại hợp lệ.');
            } else {
                alert('Số điện thoại hợp lệ. Đang chuyển đến trang tiếp theo...');
            }
        });
    }

    // Đăng ký tiếp theo
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            const confirmPassword = document.getElementById('confirmPasswordInput').value;

            if (password !== confirmPassword) {
                alert('Mật khẩu và xác nhận mật khẩu không khớp.');
                return;
            }

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập email hợp lệ.');
                return;
            }

            alert('Đăng ký thành công! Chuyển đến trang đăng nhập...');
            window.location.href = "loginPage.html";
        });
    }

    // Hiển thị sản phẩm lên bảng
    displayProducts();

    // Thêm sản phẩm mới
    document.getElementById('addProductForm')?.addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('product-name').value;
        let price = document.getElementById('product-nrice').value;

        // Thêm sản phẩm mới vào mảng products
        let newProduct = {
            id: products.length + 1, // Tạo id tự động
            name: name,
            price: parseInt(price)
        };

        products.push(newProduct); // Thêm sản phẩm vào mảng
        displayProducts(); // Cập nhật lại danh sách sản phẩm
    });

    // Lấy dữ liệu từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product_name');
    const productPrice = parseInt(urlParams.get('product_price'));
    const productImage = urlParams.get('product_image');
    const productColor = urlParams.get('color');
    const productSize = urlParams.get('size');
    const productQuantity = parseInt(urlParams.get('quantity'));

    // Tính tổng tiền
    const totalPrice = productPrice * productQuantity;

    // Gắn dữ liệu vào trang
    document.getElementById('product-name').innerText = productName;
    document.getElementById('product-price').innerText = productPrice.toLocaleString();
    document.getElementById('product-image').src = productImage;
    document.getElementById('product-color').innerText = productColor;
    document.getElementById('product-size').innerText = productSize;
    document.getElementById('product-quantity').innerText = productQuantity;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();

    // Lưu thông tin khi nhấn Hoàn tất
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn tải lại trang

        // Lưu thông tin giao hàng
        localStorage.setItem('customer-name', document.getElementById('name').value);
        localStorage.setItem('customer-phone', document.getElementById('phone').value);
        localStorage.setItem('customer-address', document.getElementById('address').value);

        // Lưu thông tin sản phẩm
        localStorage.setItem('product-name', productName);
        localStorage.setItem('product-price', productPrice);
        localStorage.setItem('product-image', productImage);
        localStorage.setItem('product-color', productColor);
        localStorage.setItem('product-size', productSize);
        localStorage.setItem('product-quantity', productQuantity);

        // Chuyển đến trang hoàn tất đơn hàng
        window.location.href = "hoantatdonhang.html";
        
    });
});
