const fs = require('fs');
const path = require('path');

const filesToConvert = [
    'app/about/page.js',
    'app/contact/page.js',
    'app/login/page.js',
    'app/signup/page.js',
    'app/rates/page.js',
    'app/reviews/page.js',
    'app/order/page.js',
    'app/my-orders/page.js',
    'app/start-today/page.js',
    'app/admin/page.js',
    'app/admin/orders/page.js',
    'app/admin/products/page.js',
    'app/admin/reviews/page.js',
    'components/pages/About.js',
    'components/pages/Contact.js',
    'components/pages/Home.js',
    'components/pages/Login.js',
    'components/pages/MyOrders.js',
    'components/pages/Order.js',
    'components/pages/Rates.js',
    'components/pages/Reviews.js',
    'components/pages/Signup.js',
    'components/pages/StartToday.js',
    'components/admin/AdminLayout.js',
    'components/admin/Dashboard.js',
    'components/admin/OrdersManagement.js',
    'components/admin/ProductsManagement.js',
    'components/admin/ReviewsManagement.js'
];

filesToConvert.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const newPath = filePath.replace('.js', '.tsx');
        fs.writeFileSync(newPath, content);
        fs.unlinkSync(filePath);
        console.log(`Converted ${file} to .tsx`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
