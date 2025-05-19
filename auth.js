/**
 * نظام المصادقة لنظام إدارة المخزون - اسكندويتش
 * Authentication System for Eskandawitch Inventory Management
 */

// تهيئة نظام المصادقة عند تحميل الصفحة
// Initialize authentication system on page load
(function() {
    // التحقق من حالة تسجيل الدخول عند تحميل أي صفحة
    // Check login status when any page loads
    checkAuthStatus();
})();

/**
 * التحقق من حالة تسجيل الدخول
 * Check authentication status
 */
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentPage = window.location.pathname.split('/').pop();
    
    // صفحات لا تتطلب تسجيل الدخول
    // Pages that don't require authentication
    const publicPages = ['login.html', 'signup.html'];
    
    // إذا كانت الصفحة الحالية ليست صفحة عامة وليس هناك تسجيل دخول، قم بالتوجيه إلى صفحة تسجيل الدخول
    // If current page is not public and user is not authenticated, redirect to login
    if (!publicPages.includes(currentPage) && !isAuthenticated) {
        // حفظ الصفحة الحالية للعودة إليها بعد تسجيل الدخول
        // Save current page to return after login
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
        return;
    }
    
    // إذا كان المستخدم مسجل الدخول وهو على صفحة تسجيل الدخول أو التسجيل، قم بالتوجيه إلى الصفحة الرئيسية
    // If user is authenticated and on login or signup page, redirect to home
    if (publicPages.includes(currentPage) && isAuthenticated) {
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'index.html';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
        return;
    }
    
    // إذا كان المستخدم مسجل الدخول، قم بتحديث واجهة المستخدم
    // If user is authenticated, update UI
    if (isAuthenticated) {
        updateAuthenticatedUI();
    }
}

/**
 * تحديث واجهة المستخدم للمستخدمين المسجلين
 * Update UI for authenticated users
 */
function updateAuthenticatedUI() {
    const username = localStorage.getItem('username');
    
    // إضافة عناصر واجهة المستخدم المسجل
    // Add authenticated user UI elements
    
    // إضافة قائمة المستخدم إلى شريط التنقل
    // Add user menu to navbar
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
        // التحقق من عدم وجود قائمة المستخدم مسبقًا
        // Check if user menu doesn't already exist
        if (!document.getElementById('userDropdown')) {
            const userMenu = document.createElement('ul');
            userMenu.className = 'navbar-nav ms-auto';
            userMenu.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-user-circle me-1"></i> ${username}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="#"><i class="fas fa-user-cog me-2"></i>الإعدادات</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>تسجيل الخروج</a></li>
                    </ul>
                </li>
            `;
            navbarNav.appendChild(userMenu);
        }
    }
}

/**
 * تسجيل الدخول
 * Login function
 * @param {string} username - اسم المستخدم
 * @param {string} password - كلمة المرور
 * @param {boolean} rememberMe - تذكرني
 * @returns {boolean} - نجاح تسجيل الدخول
 */
function login(username, password, rememberMe = false) {
    // في تطبيق حقيقي، سيتم إرسال بيانات الاعتماد إلى الخادم للتحقق
    // In a real application, credentials would be sent to server for verification
    
    // للتبسيط، سنقوم بمحاكاة نجاح تسجيل الدخول
    // For simplicity, we'll simulate successful login
    
    // التحقق من صحة بيانات الاعتماد (في تطبيق حقيقي، سيتم ذلك على الخادم)
    // Validate credentials (in a real app, this would be done on the server)
    if (username && password) {
        // تخزين حالة المصادقة في localStorage (في تطبيق حقيقي، سيكون هذا رمزًا)
        // Store authentication state in localStorage (in a real app, this would be a token)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        
        // إذا تم تحديد "تذكرني"، قم بتعيين تاريخ انتهاء الصلاحية لمدة أطول
        // If "remember me" is checked, set a longer expiration
        if (rememberMe) {
            // في تطبيق حقيقي، سيتم التعامل مع هذا بشكل مختلف
            // In a real app, this would be handled differently
            localStorage.setItem('authExpiration', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
        } else {
            // انتهاء الصلاحية بعد 24 ساعة
            // Expire after 24 hours
            localStorage.setItem('authExpiration', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
        }
        
        return true;
    }
    
    return false;
}

/**
 * إنشاء حساب جديد
 * Signup function
 * @param {object} userData - بيانات المستخدم
 * @returns {boolean} - نجاح إنشاء الحساب
 */
function signup(userData) {
    // في تطبيق حقيقي، سيتم إرسال بيانات المستخدم إلى الخادم لإنشاء حساب جديد
    // In a real application, user data would be sent to server to create a new account
    
    // للتبسيط، سنقوم بمحاكاة نجاح إنشاء الحساب
    // For simplicity, we'll simulate successful signup
    
    if (userData && userData.username && userData.password) {
        // تخزين بيانات المستخدم (في تطبيق حقيقي، سيتم ذلك على الخادم)
        // Store user data (in a real app, this would be done on the server)
        const userDataToStore = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            // في تطبيق حقيقي، سيتم تشفير كلمة المرور على الخادم
            // In a real app, the password would be hashed on the server
            // لا تقم أبدًا بتخزين كلمات المرور كنص عادي
            // Never store plain text passwords
        };
        
        // تخزين حالة المصادقة في localStorage (في تطبيق حقيقي، سيكون هذا رمزًا)
        // Store authentication state in localStorage (in a real app, this would be a token)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', userData.username);
        localStorage.setItem('userData', JSON.stringify(userDataToStore));
        
        // انتهاء الصلاحية بعد 24 ساعة
        // Expire after 24 hours
        localStorage.setItem('authExpiration', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
        
        return true;
    }
    
    return false;
}

/**
 * تسجيل الخروج
 * Logout function
 */
function logout() {
    // إزالة بيانات المصادقة من localStorage
    // Remove authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
    localStorage.removeItem('authExpiration');
    
    // إعادة التوجيه إلى صفحة تسجيل الدخول
    // Redirect to login page
    window.location.href = 'login.html';
}

/**
 * التحقق من صلاحية كلمة المرور
 * Validate password strength
 * @param {string} password - كلمة المرور للتحقق
 * @returns {boolean} - ما إذا كانت كلمة المرور قوية بما فيه الكفاية
 */
function validatePassword(password) {
    // على الأقل 8 أحرف
    // At least 8 characters
    const minLength = password.length >= 8;
    // على الأقل حرف كبير واحد
    // At least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
    // على الأقل حرف صغير واحد
    // At least one lowercase letter
    const hasLowercase = /[a-z]/.test(password);
    // على الأقل رقم واحد
    // At least one number
    const hasNumber = /\d/.test(password);
    // على الأقل رمز خاص واحد
    // At least one special character
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
}

/**
 * التحقق من انتهاء صلاحية المصادقة
 * Check if authentication has expired
 * @returns {boolean} - ما إذا كانت المصادقة منتهية الصلاحية
 */
function isAuthExpired() {
    const expirationDate = localStorage.getItem('authExpiration');
    if (!expirationDate) {
        return true;
    }
    
    return new Date() > new Date(expirationDate);
}

// التحقق من انتهاء صلاحية المصادقة بشكل دوري
// Periodically check if authentication has expired
setInterval(() => {
    if (localStorage.getItem('isAuthenticated') === 'true' && isAuthExpired()) {
        // تسجيل الخروج إذا انتهت صلاحية المصادقة
        // Logout if authentication has expired
        logout();
        alert('انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.');
    }
}, 60000); // التحقق كل دقيقة - Check every minute
