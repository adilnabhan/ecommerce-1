// Toggle password visibility
document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁️' : '🙈';
    });
  });
  
  // Real-time password strength (signup)
  const strengthMeter = document.getElementById('password-strength-meter');
  const strengthText  = document.getElementById('password-strength-text');
  if (strengthMeter) {
    document.getElementById('signup-password').addEventListener('input', e => {
      const val = e.target.value;
      let score = 0;
      if (/[a-z]/.test(val)) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/\d/.test(val)) score++;
      if (/[\W_]/.test(val)) score++;
      strengthMeter.value = score;
      const strengthNames = ['Weak','Fair','Good','Strong','Very Strong'];
      strengthText.textContent = score ? strengthNames[score] : '';
    });
  }
  
  // Validation helpers
  function showError(field, msg) {
    document.getElementById(field + '-error').textContent = msg;
  }
  function clearError(field) {
    document.getElementById(field + '-error').textContent = '';
  }
  
  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Login form validation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
  
      const email = document.getElementById('login-email').value.trim();
      const pass  = document.getElementById('login-password').value;
  
      if (!emailRegex.test(email)) {
        showError('login-email', 'Invalid email');
        valid = false;
      } else clearError('login-email');
  
      if (pass.length < 8) {
        showError('login-password', 'Password must be 8+ chars');
        valid = false;
      } else clearError('login-password');
  
      if (valid) {
        // TODO: send login request
        alert('Login successful (stub)');
        loginForm.reset();
      }
    });
  }
  
  // Signup form validation
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
  
      const name = document.getElementById('signup-name').value.trim();
      const email= document.getElementById('signup-email').value.trim();
      const pass = document.getElementById('signup-password').value;
      const pass2= document.getElementById('signup-password2').value;
  
      if (name.length < 2) {
        showError('signup-name', 'Enter your name');
        valid = false;
      } else clearError('signup-name');
  
      if (!emailRegex.test(email)) {
        showError('signup-email', 'Invalid email');
        valid = false;
      } else clearError('signup-email');
  
      if (pass.length < 8
        || !/[A-Z]/.test(pass)
        || !/[a-z]/.test(pass)
        || !/\d/.test(pass)
      ) {
        showError('signup-password', '8+ chars, upper, lower, number');
        valid = false;
      } else clearError('signup-password');
  
      if (pass2 !== pass) {
        showError('signup-password2', 'Passwords do not match');
        valid = false;
      } else clearError('signup-password2');
  
      if (valid) {
        // TODO: send signup request
        alert('Signup successful (stub)');
        signupForm.reset();
        strengthMeter.value = 0;
        strengthText.textContent = '';
      }
    });
  }
  