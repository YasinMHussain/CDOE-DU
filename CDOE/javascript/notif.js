let currentCategory = 'all';
let itemsToShow = 10;
const increment = 10;

function filterCategory(category) {
    currentCategory = category;
    itemsToShow = 10; // Reset limit when switching categories
    
    // Update active button state
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category) btn.classList.add('active');
    });

    filterNotifications();
}

function filterNotifications() {
    const searchText = document.getElementById('notifSearch').value.toLowerCase();
    const items = document.querySelectorAll('.notif-item');
    let visibleCount = 0;
    let totalMatches = 0;

    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const category = item.getAttribute('data-category');
        
        const matchesCategory = (currentCategory === 'all' || category === currentCategory);
        const matchesSearch = text.includes(searchText);

        if (matchesCategory && matchesSearch) {
            totalMatches++;
            if (visibleCount < itemsToShow) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        } else {
            item.style.display = 'none';
        }
    });

    // Handle "No Results" message
    document.getElementById('noResults').style.display = (totalMatches === 0) ? 'block' : 'none';
    
    // Handle "Load More" button visibility
    const loadMoreBtn = document.getElementById('loadMoreContainer');
    loadMoreBtn.style.display = (totalMatches > itemsToShow) ? 'block' : 'none';
}

function loadMore() {
    itemsToShow += increment;
    filterNotifications();
}

// Initial Run
window.onload = filterNotifications;