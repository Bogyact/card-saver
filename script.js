const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

// الحصول على العناصر المدخلات
const nameInput = document.getElementById('name');
const companyInput = document.getElementById('company');
const phoneInput = document.getElementById('phone');
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const downloadBtn = document.getElementById('download');
const sendCardBtn = document.getElementById('sendCard');
const userList = document.getElementById('userList');

// تحديث بطاقة العمل بناءً على المدخلات
function updateCard() {
  const name = nameInput.value || 'اسمك هنا';
  const company = companyInput.value || 'اسم الشركة';
  const phone = phoneInput.value || 'رقم الهاتف';

  // مسح محتويات الكانفاس
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم خلفية البطاقة
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // إعداد الخطوط
  ctx.font = '18px Arial';
  ctx.fillStyle = '#333';

  // رسم النصوص على البطاقة
  ctx.fillText(company, 20, 40);  // اسم الشركة
  ctx.font = '16px Arial';
  ctx.fillText(name, 20, 80);      // اسم الشخص
  ctx.fillText(phone, 20, 120);    // رقم الهاتف
}

// تحميل البطاقة كصورة
downloadBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'business-card.png';
  a.click();
});

// إرسال البطاقة للمستخدمين القريبين
sendCardBtn.addEventListener('click', () => {
  const city = cityInput.value;
  const country = countryInput.value;

  if (city && country) {
    // هنا يمكن أن يتم إرسال البطاقة للمستخدمين القريبين في قاعدة البيانات (تحتاج إلى خادم)
    fetchNearbyUsers(city, country);
  } else {
    alert("من فضلك أدخل المدينة والبلد.");
  }
});

// دالة لجلب المستخدمين القريبين من قاعدة البيانات (افتراضيًا)
function fetchNearbyUsers(city, country) {
  // هذا مثال على كيفية جلب البيانات من الخادم، سنستخدم بيانات ثابتة هنا.
  const users = [
    { name: 'أحمد', city: 'القاهرة', country: 'مصر' },
    { name: 'مريم', city: 'القاهرة', country: 'مصر' },
    { name: 'يوسف', city: 'الإسكندرية', country: 'مصر' }
  ];

  // تصفية المستخدمين بناءً على المدينة والبلد
  const nearbyUsers = users.filter(user => user.city === city && user.country === country);

  // عرض المستخدمين القريبين
  userList.innerHTML = '';
  nearbyUsers.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.city}, ${user.country}`;
    userList.appendChild(li);
  });
}

// إضافة أحداث الإدخال لتحديث التصميم
nameInput.addEventListener('input', updateCard);
companyInput.addEventListener('input', updateCard);
phoneInput.addEventListener('input', updateCard);
cityInput.addEventListener('input', updateCard);
countryInput.addEventListener('input', updateCard);

// تحديث البطاقة عند تحميل الصفحة
updateCard();
