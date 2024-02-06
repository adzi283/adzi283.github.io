
function matrixEffect() {
    const canvas = document.createElement('canvas');
    document.body.insertBefore(canvas, document.body.firstChild);
    canvas.id = 'matrixCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 30);
}


function toggleTheme() {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    if(newTheme === 'dark') {
        matrixEffect();
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;
    if(savedTheme === 'dark') {
        matrixEffect();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    applySavedTheme();
    
    const toggleButton = document.getElementById('toggleMode');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    
    const bodyId = document.body.id; 
    const blogId = bodyId; 

    function updateLikeCounter() {
        const likes = parseInt(localStorage.getItem(`${blogId}-likes`) || 0);
        document.getElementById('like-counter').textContent = likes;
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem(`${blogId}-comments`) || '[]');
        document.getElementById('comments-list').innerHTML = comments.map(comment => `<li>${comment}</li>`).join('');
    }

    const likeButton = document.getElementById('like-btn');
    const commentButton = document.getElementById('comment-btn');

    if(likeButton) {
        likeButton.addEventListener('click', function() {
            const currentLikes = parseInt(localStorage.getItem(`${blogId}-likes`) || 0) + 1;
            localStorage.setItem(`${blogId}-likes`, currentLikes.toString());
            updateLikeCounter();
        });
    }

    if(commentButton) {
        commentButton.addEventListener('click', function() {
            const newCommentInput = document.getElementById('new-comment');
            if (newCommentInput.value.trim() !== '') {
                const comments = JSON.parse(localStorage.getItem(`${blogId}-comments`) || '[]');
                comments.push(newCommentInput.value.trim());
                localStorage.setItem(`${blogId}-comments`, JSON.stringify(comments));
                loadComments();
                newCommentInput.value = '';
            }
        });
    }

    updateLikeCounter();
    loadComments();
});
