// Swap Login/Signup for Logout and enforce protected routes
firebase.auth().onAuthStateChanged(user => {
    const nav = document.getElementById('nav-primary');
    if (!nav) return;
    // Remove existing Logout if any
    const old = document.getElementById('logout-btn');
    if (old) old.remove();
  
    if (user) {
      // Remove Login & Sign Up links
      nav.querySelectorAll('a[href="login.html"], a[href="signup.html"]').forEach(a => a.remove());
      // Add Logout link
      const li = document.createElement('li');
      li.innerHTML = '<a href="#" id="logout-btn">Logout</a>';
      nav.querySelector('ul').append(li);
  
      document.getElementById('logout-btn')
        .addEventListener('click', async () => {
          await firebase.auth().signOut();
          window.location.href = 'login.html';
        });
    }
  });
  