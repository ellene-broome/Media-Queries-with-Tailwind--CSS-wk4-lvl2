const gallery = document.getElementById("gallery");

// Fetch 12 random images from Lorem Picsum
async function fetchImages() {
  try {
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=12");
    const data = await res.json();

    gallery.innerHTML = data
      .map((image) => {
        return `
          <div class="relative group rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img 
              class="w-full h-60 object-cover" 
              src="${image.download_url}" 
              alt="Photo by ${image.author} from Lorem Picsum"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition">
              ${image.author}
            </div>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
}

fetchImages();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  // Load saved theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    toggle.textContent = '☀️Light Mode';
  } else {
    html.classList.remove('dark');
    toggle.textContent = '🌑Dark Mode';
  }

  // Toggle dark mode on button click and save preference
  toggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    toggle.textContent = isDark ? '☀️Light Mode' : '🌑Dark Mode';
    
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
});
