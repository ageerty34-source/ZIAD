// وظائف صفحة المنتجات
function openOrderForm(name, price) {
    document.getElementById('productName').value = name;
    document.getElementById('productPrice').value = price;
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// إغلاق الـ Modal عند النقر خارجه
window.onclick = function(event) {
    var modal = document.getElementById('orderModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// معالجة نموذج الطلب
const purchaseForm = document.getElementById('purchaseForm');
if (purchaseForm) {
    purchaseForm.onsubmit = function(e) {
        e.preventDefault();
        
        const order = {
            product: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            customer: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value,
            date: new Date().toLocaleString('ar-EG')
        };

        // حفظ الطلب في localStorage (لأغراض العرض فقط في هذا المثال)
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('تم إرسال طلبك بنجاح! شكراً لتعاملك مع شركة Ziad.');
        closeOrderForm();
        purchaseForm.reset();
    };
}

// وظائف صفحة الموظفين (Admin)
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // تسجيل دخول بسيط جداً للتوضيح
    if (user === 'Z154' && pass === '16112003') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
        loadOrders();
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
}

function loadOrders() {
    const ordersTable = document.getElementById('ordersTable');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    ordersTable.innerHTML = '';
    
    if (orders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="6" style="text-align:center;">لا توجد طلبات حالياً</td></tr>';
        return;
    }
orders.forEach((order, index) => {
    const row = `
        <tr>
            <td>${order.product}</td>
            <td>${order.price} ج.م</td>
            <td>${order.customer}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td>${order.date}</td>
            <td>
                <button onclick="cancelOrder(${index})" style="background:red;color:white;border:none;padding:6px 10px;border-radius:5px;cursor:pointer;">
                إلغاء
                </button>
            </td>
        </tr>
    `;
    ordersTable.innerHTML += row;
});
}

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminSection').style.display = 'none';
}
function cancelOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    if(confirm("هل تريد إلغاء هذا الطلب؟")) {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
    }
}
