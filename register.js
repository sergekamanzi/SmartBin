// Purpose: To provide the functionality for the registration form

document.addEventListener('DOMContentLoaded', function() {
  const provinceCityMap = {
    'Province 1': ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    'Province 2': ['Burera', 'Gicumbi', 'Gakenke', 'Musanze', 'Rulindo'],
    'Province 3': ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango'],
    'Province 4': ['Bugesera', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana'],
    'Province 5': ['Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
};

  const provinceSelect = document.getElementById('province');
  const citySelect = document.getElementById('city');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');
  const form = document.getElementById('registrationForm');

  provinceSelect.addEventListener('change', function() {
      const selectedProvince = provinceSelect.value;
      const cities = provinceCityMap[selectedProvince] || [];

      citySelect.innerHTML = '<option selected disabled value="">Choose...</option>';

      cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
      });

      citySelect.disabled = cities.length === 0;
  });

  form.addEventListener('submit', function(event) {
      if (passwordInput.value !== confirmPasswordInput.value) {
          event.preventDefault();
          passwordError.style.display = 'block';
      } else {
          passwordError.style.display = 'none';
      }
  });

  confirmPasswordInput.addEventListener('input', function() {
      if (passwordInput.value === confirmPasswordInput.value) {
          passwordError.style.display = 'none';
      } else {
          passwordError.style.display = 'block';
      }
  });
});

//menu-icon

document.getElementById('menu-icon').addEventListener('click', function() {
  var navLinks = document.getElementById('nav-links');
  if (navLinks.style.display === 'none' || navLinks.style.display === '') {
    navLinks.style.display = 'block';
  } else {
    navLinks.style.display = 'none';
  }
});